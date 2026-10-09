import { BlogPost, LocalArea } from './types';
import { BLOG_POSTS_DATA, LOCAL_AREAS_DATA } from './content';

/**
 * Editorial Content Schema Definition
 * Designed for headless CMS integrations (Keystatic, Decap, or Headless WordPress REST API)
 */

export interface CMSContentResponse<T> {
  data: T[];
  total: number;
  draftsCount: number;
  publishedCount: number;
}

export interface PublishStatusPayload {
  id: string;
  type: 'blog' | 'localArea';
  status: 'draft' | 'published';
}

/**
 * In-memory / Static CMS repository with preview & publishing capabilities.
 * In production, this can also proxy to WordPress REST API (https://bcta.edu.au/wp-json/wp/v2/)
 * or Decap / Keystatic Git-based CMS.
 */
class EditorialManager {
  private blogs: BlogPost[] = [...BLOG_POSTS_DATA];
  private localAreas: LocalArea[] = [...LOCAL_AREAS_DATA];

  // Blog Queries
  getPublishedBlogs(): BlogPost[] {
    return this.blogs.filter((b) => b.status === 'published');
  }

  getAllBlogs(includeDrafts = false): BlogPost[] {
    return includeDrafts ? this.blogs : this.getPublishedBlogs();
  }

  getBlogBySlug(slug: string, isPreview = false): BlogPost | undefined {
    return this.blogs.find(
      (b) => b.slug === slug && (isPreview || b.status === 'published')
    );
  }

  // Local Area Queries
  getPublishedLocalAreas(): LocalArea[] {
    return this.localAreas.filter((l) => l.status === 'published');
  }

  getAllLocalAreas(includeDrafts = false): LocalArea[] {
    return includeDrafts ? this.localAreas : this.getPublishedLocalAreas();
  }

  getLocalAreaBySlug(slug: string, isPreview = false): LocalArea | undefined {
    return this.localAreas.find(
      (l) => l.slug === slug && (isPreview || l.status === 'published')
    );
  }

  // Publishing State Management
  updateStatus(payload: PublishStatusPayload): boolean {
    if (payload.type === 'blog') {
      const item = this.blogs.find((b) => b.id === payload.id);
      if (item) {
        item.status = payload.status;
        return true;
      }
    } else if (payload.type === 'localArea') {
      const item = this.localAreas.find((l) => l.id === payload.id);
      if (item) {
        item.status = payload.status;
        return true;
      }
    }
    return false;
  }

  // Headless WordPress API Fallback / Sync
  async syncFromWordPress(endpoint = process.env.WORDPRESS_API_URL): Promise<{ synced: number; error?: string }> {
    if (!endpoint) {
      return { synced: 0, error: 'WORDPRESS_API_URL not configured' };
    }
    try {
      const res = await fetch(`${endpoint}/posts?per_page=20&_embed`, {
        next: { tags: ['wordpress-posts'], revalidate: 3600 },
      });
      if (!res.ok) {
        return { synced: 0, error: `WordPress API returned status ${res.status}` };
      }
      const data = await res.json();
      return { synced: Array.isArray(data) ? data.length : 0 };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      return { synced: 0, error: message };
    }
  }
}

export const cms = new EditorialManager();
