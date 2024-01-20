import React, { Suspense } from "react";
import Upload from "@/components/ui/Upload";
import { api } from "@/trpc/server";
import { getPlaiceholder } from "plaiceholder";
import Image from "next/image";
import ImageBlur from "@/components/ui/ImageBlur";
export const dynamic = "force-dynamic";

const Page = async () => {
  const posts = await api.post.getAllPosts.query();
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
            {post.imageUrl?.map(async (item) => {
              const res = await fetch(item.url ?? "");
              const buffer = Buffer.from(await res.arrayBuffer());
              const { base64 } = await getPlaiceholder(buffer);

              return (
                <div key={item.id} className="flex flex-col gap-2 lg:flex-row">
                  <Image
                    src={item.url ?? ""}
                    alt={post.title ?? ""}
                    width={300}
                    height={400}
                    placeholder="blur"
                    blurDataURL={base64}
                    className="h-[400px] w-[300px] rounded-lg object-cover"
                  />
                  <ImageBlur image={item.url ?? ""} />
                </div>
              );
            })}
          </div>
        ))}
      </Suspense>
    </div>
  );
};

export default Page;
