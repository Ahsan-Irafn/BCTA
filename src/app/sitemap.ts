import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/south-australia',
    '/western-australia',
    '/courses/diploma-of-building-and-construction-south-australia',
    '/courses/certificate-iv-in-building-construction-building-south-australia',
    '/courses/sit40721-certificate-iv-in-patisserie-south-australia',
    '/courses/certificate-iii-in-civil-construction-plant-operations-south-australia',
    '/courses/certificate-iii-in-carpentry-south-australia',
    '/courses/diploma-of-building-and-construction-western-australia',
    '/enrol-south-australia',
    '/enrol-western-australia',
    '/contact-us-south-australia',
    '/contact-us-western-australia',
    '/government-funding-for-your-building-construction-course',
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/courses') ? 0.9 : 0.8,
  }));
}
