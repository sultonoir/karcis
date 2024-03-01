import { Buffer } from "node:buffer";

export async function createBlurHash(src: string) {
  const photoBlurFetch = await fetch(src);
  const photoBlurBuffer = Buffer.from(await photoBlurFetch.arrayBuffer());
  return `data:image/jpeg;base64,${photoBlurBuffer.toString("base64")}`;
}
