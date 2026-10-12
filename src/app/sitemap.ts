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

  return staticRoutes;
}
