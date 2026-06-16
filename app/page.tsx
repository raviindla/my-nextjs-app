// app/page.tsx
import { client } from '@/utils/sanity';
import { PortableText } from '@portabletext/react';

// 1. Define a precise type for Sanity's block content to satisfy ESLint
interface SanityBlock {
  _key: string;
  _type: string;
  children?: Array<{
    _key: string;
    _type: string;
    text: string;
    marks?: string[];
  }>;
  markDefs?: string[];
  style?: string;
}

interface Post {
  title: string;
  slug: string;
  content: SanityBlock[];
}

async function getPosts(): Promise<Post[]> {
  const query = `*[_type == "post"]{ title, "slug": slug.current, content }`;
  return await client.fetch(query);
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main className="max-w-4xl mx-auto p-8 font-sans">
      <h1 className="text-4xl font-bold mb-8 border-b-2 pb-4 border-gray-800">
        Sanity + Next.js Blog Production
      </h1>
      
      <div className="flex flex-col gap-8">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <article key={post.slug} className="border border-gray-200 p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-3 text-blue-600">
                {post.title}
              </h2>
              <div className="prose max-w-none text-gray-700">
                <PortableText value={post.content} />
              </div>
            </article>
          ))
        ) : (
          <p className="text-gray-500">No published posts found. Ensure documents are published in Sanity Studio!</p>
        )}
      </div>
    </main>
  );
}