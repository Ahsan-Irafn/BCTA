import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/seo';
import { cms } from '@/lib/cms-schema';

export default function sitemap(): MetadataRoute.Sitemap {
  const publishedBlogs = cms.getPublishedBlogs();
  const publishedAreas = cms.getPublishedLocalAreas();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = publishedBlogs.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const areaRoutes: MetadataRoute.Sitemap = publishedAreas.map((area) => ({
    url: `${BASE_URL}/locations/${area.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes, ...areaRoutes];
}
