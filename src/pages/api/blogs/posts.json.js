import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog');
  const data = posts.map(post => ({
    title: post.data.title,
    slug: post.id,
    date: post.data.pubDate?.toISOString().slice(0, 10),
    author: post.data.author || '',
    tags: post.data.tags || [],
    summary: post.data.summary || post.data.description || '',
    coverImage: post.data.heroImage?.src || post.data.coverImage || '',
  }));
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
} 