import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { ImagePlus } from "lucide-react";
interface Props {
  value: string | null;
  onValueChange: (value: any) => void;
}

const FieldImageProfile = ({ value, onValueChange }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="group relative size-40 overflow-hidden rounded-full bg-accent">
          <Image
            src={value ?? "/logo.png"}
            alt="profile image"
            fill
            priority
            loading="eager"
            className="aspect-square object-cover"
          />
          <div className="absolute inset-0 flex size-full items-center justify-center bg-background/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <ImagePlus />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FieldImageProfile;
