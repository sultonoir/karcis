/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use server";
import { XataClient } from "@/xata";
const xata = new XataClient();

const createImage = async (mediaType: string) => {
  // Create an empty image record with no base64 content
  const record = await xata.db.imageBucket.create(
    { image: { mediaType, base64Content: "" } },
    // Request an uploadUrl from the created record. We can use it to upload a file to replace the empty one
    ["*", "image.uploadUrl"],
  );

  return { id: record.id, uploadUrl: record.image?.uploadUrl };
};

const deleteImage = async (id: string) => {
  await xata.db.imageBucket.delete(id);
};

const getImage = async (id: string) => {
  const image = await xata.db.imageBucket.read(id);
  return image?.toSerializable();
};

export { createImage, deleteImage, getImage };
