import React, { Suspense } from "react";
import { getXataClient } from "@/xata";
import Upload from "@/components/ui/Upload";
import Image from "next/image";
import { XataFile } from "@xata.io/client";
const xata = getXataClient();
export const dynamic = "force-dynamic";
const Page = async () => {
  const posts = await xata.db.Posts.sort("pubDate", "desc").getAll();
  return (
    <div className="container mt-16 w-full max-w-5xl">
      <Upload />
      {posts.length === 0 && <p>No blog posts found</p>}
      <Suspense fallback={<p>Loading...</p>}>
        {posts.map((post) => (
          <div key={post.id} className="mb-16 flex flex-col gap-2 lg:flex-row">
            <div className="flex flex-1 flex-col gap-3">
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
            {post.imageUrl?.map((item) => (
              <div key={item.id}>
                <Image
                  src={item.url ?? ""}
                  alt={post.title ?? ""}
                  width={300}
                  height={400}
                  placeholder="blur"
                  blurDataURL={XataFile.fromString(item.url ?? "").toBase64()}
                  className="h-[400px] w-[300px] rounded-lg object-cover"
                />
              </div>
            ))}
          </div>
        ))}
      </Suspense>
    </div>
  );
};

export default Page;
