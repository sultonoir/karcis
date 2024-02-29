import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { XataFile } from "@xata.io/client";
import { ImagePlusIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Props {
  handleChange: (value: string) => void;
}

const FieldImage = ({ handleChange }: Props) => {
  const [file, setFile] = React.useState<File>();
  //handle change image
  const handleDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();

    const newFile = e.dataTransfer.files?.[0];
    if (!newFile) return;
    setFile(newFile);
    const image = await XataFile.fromBlob(newFile);

    handleChange(image.base64Content ?? "");
  };

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const newFile = e.target.files?.[0];
    if (!newFile) return;
    setFile(newFile);
    const image = await XataFile.fromBlob(newFile);

    handleChange(image.base64Content ?? "");
  };

  const handleDelete = () => {
    setFile(undefined);
    handleChange("");
  };

  const imageMemo = React.useMemo(() => {
    return file ? (
      <Image
        src={URL.createObjectURL(file)}
        fill
        alt="image"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="aspect-video object-cover"
      />
    ) : (
      <div className="flex flex-col items-center gap-2">
        <ImagePlusIcon size={50} />
        <p>Upload image/poster/banner</p>
        <p className="text-lg font-medium">
          Recommended 724 x 340px and no more than 2Mb
        </p>
      </div>
    );
  }, [file]);

  return (
    <div className="relative">
      {file && (
        <Button
          type="button"
          size="icon"
          onClick={handleDelete}
          className="absolute bottom-2 right-2 z-10 bg-destructive hover:bg-destructive/80"
        >
          <Trash2 />
        </Button>
      )}
      <Label
        className="relative flex h-[150px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden border-b lg:h-[420px]"
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => e.preventDefault()}
      >
        {imageMemo}
        <Input
          type="file"
          className="hidden"
          onChange={(e) => handleChangeImage(e)}
        />
      </Label>
    </div>
  );
};

export default FieldImage;
