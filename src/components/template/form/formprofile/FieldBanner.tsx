"use client";
import "react-easy-crop/react-easy-crop.css";
import getCroppedImg from "@/lib/crop";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { XataFile } from "@xata.io/client";
import { ImageIcon, ImagePlusIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import { toast } from "sonner";

interface Props {
  banner: string | undefined;
}

const FieldBanner = ({ banner }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [image, setImage] = useState("");
  const [rotation, setRotation] = useState<number>(0);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  // croped
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  //upload image
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files?.[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setIsOpen(true);
    }
  };

  //crop complete
  const onCropComplete = React.useCallback(
    (
      croppedArea: unknown,
      croppedAreaPixels: React.SetStateAction<{
        x: number;
        y: number;
        width: number;
        height: number;
      } | null>,
    ) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleDelete = () => {
    setImage("");
  };

  //hande close
  const handleClose = () => {
    setImage("");
    setIsOpen(!open);
  };

  //handle submit
  const ctx = api.useUtils();
  const updateBanner = api.user.updateBanner.useMutation({
    onSuccess: async () => {
      await ctx.user.getUser.invalidate();
      setImage("");
      setIsLoading(false);
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Error upload banner picture");
    },
  });
  const handleSumbit = async () => {
    setIsLoading(true);
    try {
      if (image && croppedAreaPixels) {
        const croppedImg = await getCroppedImg(
          image,
          croppedAreaPixels,
          rotation,
        );
        const imgCrop = await XataFile.fromBlob(croppedImg!);
        updateBanner.mutate({
          name: imgCrop.name,
          mediaType: imgCrop.mediaType,
          base64Content: imgCrop.base64Content,
        });
      }
    } catch (error) {
      toast.error("Error crop image");
      setIsOpen(false);
      setImage("");
    }
  };

  return (
    <div className="relative my-5">
      <p>Banner profile</p>
      <div className="absolute bottom-2 right-2 z-10 flex items-center gap-2">
        <Button
          type="button"
          onClick={() => setIsOpen(true)}
          className="gap-2 bg-primary hover:bg-primary/80"
        >
          <ImageIcon />
          <span>Upload picture</span>
        </Button>
        <Button
          type="button"
          size="icon"
          onClick={handleDelete}
          className="z-10 bg-destructive hover:bg-destructive/80"
        >
          <Trash2 />
        </Button>
      </div>
      {banner ? (
        <div className="relative flex h-[100px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-sm lg:h-[250px]">
          <Image
            src={banner}
            fill
            alt="image"
            sizes="(min-width: 1480px) 90vw, (min-width: 1040px) 17.14vw, (min-width: 780px) calc(33.33vw - 37px), calc(100vw - 66px)"
            className="aspect-video object-cover"
          />
        </div>
      ) : (
        <div className="relative flex h-[150px] w-full flex-col items-center justify-center overflow-hidden border-b lg:h-[420px]">
          <div className="flex flex-col items-center gap-2">
            <ImagePlusIcon size={50} />
            <p>Upload image/poster/banner</p>
            <p className="text-lg font-medium">
              Recommended 724 x 340px and no more than 2Mb
            </p>
          </div>
        </div>
      )}
      <Dialog defaultOpen={isOpen} open={isOpen} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload profile picture</DialogTitle>
          </DialogHeader>
          {image !== "" ? (
            <div className="relative flex h-[150px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden border-b lg:h-[420px]">
              <Cropper
                image={image || ""}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                zoomSpeed={0.1}
                maxZoom={3}
                zoomWithScroll={true}
                showGrid={true}
                aspect={5}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
              />
            </div>
          ) : (
            <Label className="relative flex h-[150px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden border-b lg:h-[420px]">
              <Input
                type="file"
                className="hidden"
                onChange={handleImageUpload}
              />
              <div className="flex flex-col items-center gap-2">
                <ImagePlusIcon size={50} />
                <p>Upload image/poster/banner</p>
                <p className="text-lg font-medium">
                  Recommended 724 x 340px and no more than 2Mb
                </p>
              </div>
            </Label>
          )}
          <DialogFooter className="flex gap-2">
            <Button
              type="button"
              disabled={isLoading}
              onClick={handleSumbit}
              className="flex-1 bg-green-600 hover:bg-green-600/80 "
            >
              Save changes
            </Button>
            <Button type="button" onClick={handleClose}>
              Cancle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FieldBanner;
