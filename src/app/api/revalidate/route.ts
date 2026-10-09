import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const { secret, path, tag } = await request.json();

    const expectedSecret = process.env.REVALIDATION_SECRET || 'bcta_cms_secret_token';

    if (secret !== expectedSecret) {
      return NextResponse.json({ message: 'Invalid authentication secret' }, { status: 401 });
    }

    if (tag) {
      revalidateTag(tag, 'max-age=0');
      return NextResponse.json({
        revalidated: true,
        tag,
        timestamp: new Date().toISOString(),
      });
    }

    if (path) {
      revalidatePath(path);
      return NextResponse.json({
        revalidated: true,
        path,
        timestamp: new Date().toISOString(),
      });
    }

    // Default revalidate homepage
    revalidatePath('/');
    return NextResponse.json({
      revalidated: true,
      path: '/',
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown revalidation error';
    return NextResponse.json({ message }, { status: 500 });
  }
}
