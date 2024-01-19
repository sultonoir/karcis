"use server";

import { XataClient } from "@/xata";
import { revalidatePath } from "next/cache";

const xata = new XataClient();
export type Images = {
  name: string;
  mediaType: string;
  base64Content: string;
};
type Props = {
  title: string;
  file: Images[];
  path: string;
};

export async function createPosts({ title, file, path }: Props) {
  await xata.db.Posts.create({
    title,
    pubDate: new Date(),
    imageUrl: file.map((item) => ({
      name: item.name,
      mediaType: item.mediaType,
      base64Content: item.base64Content,
    })),
  });
  revalidatePath(path);
}
