"use client";
import React, { useState, type ChangeEvent } from "react";
import Image from "next/image";
import { Input } from "./input";
import { type Images, createPosts } from "../action";
import { Button } from "./button";
import { usePathname } from "next/navigation";

const Upload = () => {
  const [title, setTitle] = useState<string>("");
  const [files, setFiles] = useState<Images[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const path = usePathname();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles: File[] = Array.from(e.target.files);
      const newImages: Images[] = [];

      selectedFiles.forEach((item) => {
        const fileReader = new FileReader();

        fileReader.onload = () => {
          const base64Content = fileReader.result as string;
          newImages.push({
            name: item.name,
            mediaType: item.type,
            base64Content: base64Content,
          });

          setFiles((prevFiles) => [...prevFiles, ...newImages]);
        };

        fileReader.readAsDataURL(item);
      });
    }
  };

  const file = files.map((item) => {
    const base64Only = item.base64Content.replace(
      /^data:image\/\w+;base64,/,
      "",
    );
    return {
      name: item.name,
      mediaType: item.mediaType,
      base64Content: base64Only,
    };
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createPosts({
        file,
        title,
        path,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setFiles([]);
      setTitle("");
    }
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input value={title} onChange={handleTitleChange} placeholder="Judul" />
        <Input
          type="file"
          onChange={handleFileChange}
          placeholder="Pilih file"
          multiple
        />
        <Button type="submit" disabled={isLoading} size="sm">
          Submit
        </Button>
      </form>
      <div className="grid grid-cols-2">
        {files.map((item) => (
          <Image
            src={item.base64Content}
            alt={item.name}
            key={item.name}
            width={300}
            height={300}
            className="aspect-square"
          />
        ))}
      </div>
    </>
  );
};

export default Upload;
