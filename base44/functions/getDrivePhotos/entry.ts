import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('googledrive');

    // Search for image files across the entire Drive
    const query = encodeURIComponent("mimeType contains 'image/' and trashed = false");
    const fields = encodeURIComponent("files(id,name,mimeType,thumbnailLink,webContentLink)");
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
      // thumbnailLink gives a direct image preview URL
      url: f.thumbnailLink ? f.thumbnailLink.replace('=s220', '=s1200') : null,
      thumbUrl: f.thumbnailLink || null,
    })).filter(f => f.url);

    return Response.json({ photos: files });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});