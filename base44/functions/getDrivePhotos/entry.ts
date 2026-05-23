import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Read cached photos from entity (service role — no user auth needed)
    const photos = await base44.asServiceRole.entities.GalleryPhoto.list('order', 50);

    if (photos.length > 0) {
      // Return cached Base44-hosted URLs
      return Response.json({
        photos: photos.map(p => ({
          id: p.drive_id,
          name: p.name || '',
          url: p.base44_url,
          thumbUrl: p.base44_url,
        }))
      });
    }

    // Fallback: fetch directly from Drive (may not work for unauthenticated users)
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('googledrive');

    const query = encodeURIComponent("mimeType contains 'image/' and trashed = false");
    const fields = encodeURIComponent("files(id,name,mimeType)");
    const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=${fields}&pageSize=50&orderBy=createdTime desc`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!res.ok) {
      const err = await res.text();
      return Response.json({ error: err }, { status: res.status });
    }

    const data = await res.json();
    const files = (data.files || []).map(f => ({
      id: f.id,
      name: f.name,
      url: `https://drive.google.com/thumbnail?id=${f.id}&sz=w1200`,
      thumbUrl: `https://drive.google.com/thumbnail?id=${f.id}&sz=w400`,
    }));

    return Response.json({ photos: files });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});