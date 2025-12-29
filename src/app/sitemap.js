// src/app/sitemap.js

export default function sitemap() {
  const baseUrl = 'https://tools.gokhanyildan.com/qr-generator';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    // Eğer ileride başka sayfalar eklerseniz (örn: /about), buraya ekleyebilirsiniz.
  ];
}