"use client";
import React, { useState } from "react";
import Cropper from "react-easy-crop";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import "react-easy-crop/react-easy-crop.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ImagePlusIcon, Pencil } from "lucide-react";
import { XataFile } from "@xata.io/client";
import getCroppedImg from "@/lib/crop";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const FieldImageProfile = () => {
  const { data, update } = useSession();
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
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  //remove image
  const router = useRouter();
  const removeImage = api.user.removeImage.useMutation({
    onSuccess: async () => {
      await update({ name: data?.user.name, image: null });
      toast.success("Success update profile");
      router.refresh();
    },
    onError: () => {
      toast.error("Error update picture");
    },
  });

  // update profile image

  const updateProfile = api.user.updateImage.useMutation({
    onSuccess: async (e) => {
      await update({ name: data?.user.name, image: e });
      toast.success("Success update profile");
      router.refresh();
      setIsOpen(!isOpen);
      setImage("");
      setIsLoading(false);
    },
    onError: () => {
      toast.error("Error update picture");
    },
  });

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

  // handle submit
  const handleClick = async () => {
    setIsLoading(true);
    try {
      if (image && croppedAreaPixels) {
        const croppedImg = await getCroppedImg(
          image,
          croppedAreaPixels,
          rotation,
        );
        const imgCrop = await XataFile.fromBlob(croppedImg!);
        updateProfile.mutate({
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

  // memoize image
  const imageMemo = React.useMemo(() => {
    return image ? (
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
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
        />
      </div>
    ) : (
      <Label className="relative flex h-[150px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden border-b lg:h-[420px]">
        <Input type="file" className="hidden" onChange={handleImageUpload} />
        <div className="flex flex-col items-center gap-2">
          <ImagePlusIcon size={50} />
          <p>Upload image/poster/banner</p>
          <p className="text-lg font-medium">
            Recommended 724 x 340px and no more than 2Mb
          </p>
        </div>
      </Label>
    );
  }, [crop, image, onCropComplete, rotation, zoom]);

  //hande close
  const handleClose = () => {
    setIsOpen(!open);
    setImage("");
  };

  return (
    <>
      <div className="order-1 mt-5 flex flex-shrink-0 flex-col space-y-2 lg:order-2">
        <p>Profile picture</p>
        <div className="relative size-40 rounded-full bg-accent">
          <Image
            src={data?.user.image ?? "/placeholder.jpg"}
            alt="profile image"
            fill
            priority
            loading="eager"
            className="aspect-square rounded-full object-cover"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="absolute bottom-0 left-1">
                <Button className="gap-2" size="sm">
                  <Pencil size={15} />
                  Edit
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setIsOpen(true)}>
                Upload a photo...
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => removeImage.mutate()}>
                Remove photo
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Dialog defaultOpen={isOpen} open={isOpen} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload profile picture</DialogTitle>
          </DialogHeader>
          {imageMemo}
          <DialogFooter className="flex gap-2">
            <Button
              type="button"
              disabled={isLoading}
              className="flex-1 bg-green-600 hover:bg-green-600/80"
              onClick={handleClick}
            >
              Save changes
            </Button>
            <Button type="button" onClick={handleClose}>
              Cancle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FieldImageProfile;
