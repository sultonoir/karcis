import { api } from "@/trpc/server";
import React from "react";
export const dynamic = "force-dynamic";
const Page = async () => {
  const posts = await api.post.getAllPosts.query();
  return (
    <div className="container mt-16 w-full max-w-5xl">
      {posts.length === 0 && <p>No blog posts found</p>}
      {posts.map((post) => (
        <div key={post.id} className="mb-16">
          <p className="mb-2 text-xs text-purple-950 dark:text-purple-200">
            {post.pubDate?.toDateString()}
          </p>
          <h2 className="mb-2 text-2xl">
            <a href={`posts/${post.slug}`}>{post.title}</a>
          </h2>
          <p className="mb-5 text-purple-950 dark:text-purple-200">
            {post.description}
          </p>
          <a
            href={`posts/${post.slug}`}
            className="w-fit rounded-lg bg-purple-700 px-4 py-2 text-sm font-semibold text-white shadow-sm"
          >
            Read more &rarr;
          </a>
        </div>
      ))}
    </div>
  );
};

export default Page;
