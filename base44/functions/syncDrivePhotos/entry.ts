import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Get Drive access token via service role
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('googledrive');

    // Fetch image files from Drive
    const query = encodeURIComponent("mimeType contains 'image/' and trashed = false");
    const fields = encodeURIComponent("files(id,name,mimeType)");
    const driveUrl = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=${fields}&pageSize=50&orderBy=createdTime desc`;

    const driveRes = await fetch(driveUrl, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!driveRes.ok) {
      const err = await driveRes.text();
      return Response.json({ error: err }, { status: driveRes.status });
    }

    const driveData = await driveRes.json();
    const driveFiles = driveData.files || [];

    // Get already-cached photos from entity
    const cached = await base44.asServiceRole.entities.GalleryPhoto.list();
    const cachedIds = new Set(cached.map(p => p.drive_id));

    const results = [];
    let uploadedCount = 0;

    for (let i = 0; i < driveFiles.length; i++) {
      const file = driveFiles[i];

      if (cachedIds.has(file.id)) {
        const existing = cached.find(p => p.drive_id === file.id);
        results.push({ id: file.id, url: existing.base44_url, cached: true });
        continue;
      }

      // Download the file from Drive
      const downloadRes = await fetch(
        `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (!downloadRes.ok) {
        console.error(`Failed to download ${file.id}: ${downloadRes.status}`);
        continue;
      }

      const arrayBuffer = await downloadRes.arrayBuffer();
      const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
      const mimeType = file.mimeType || 'image/jpeg';
      const fileObj = new File([arrayBuffer], `${file.id}.${ext}`, { type: mimeType });

      // Upload to Base44 public storage via integration
      const uploadResult = await base44.asServiceRole.integrations.Core.UploadFile({ file: fileObj });
      const base44Url = uploadResult.file_url;

      if (!base44Url) {
        console.error(`No URL returned for ${file.id}`);
        continue;
      }

      // Save to entity cache
      await base44.asServiceRole.entities.GalleryPhoto.create({
        drive_id: file.id,
        name: file.name,
        base44_url: base44Url,
        order: i,
      });

      results.push({ id: file.id, url: base44Url, cached: false });
      uploadedCount++;
    }

    return Response.json({
      total: driveFiles.length,
      uploaded: uploadedCount,
      skipped: results.filter(r => r.cached).length,
      photos: results,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});