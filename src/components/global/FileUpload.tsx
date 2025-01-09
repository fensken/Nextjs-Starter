"use client";

import { FC, useTransition } from "react";
import Image from "next/image";
import { X } from "lucide-react";

import { UploadDropzone, deleteUploadthingFile } from "src/utils/uploadthing";

import { Button } from "src/components/ui/button";
import Spinner from "src/components/global/Spinner";

type FileUploadProps = {
  apiEndpoint: "image" | "video";
  onChange: (url?: string) => void;
  value?: string;
};

const FileUpload: FC<FileUploadProps> = ({ apiEndpoint, onChange, value }) => {
  const [isPending, startTransition] = useTransition();

  const acceptedTypes = {
    image: "JPG, PNG, WebP, AVIF or GIF",
    video: "MP4, WebM, Ogg",
  };

  const handleRemove = async () => {
    if (!value) return;

    startTransition(async () => {
      try {
        // Only delete the file if it starts with the specified URL
        if (value.startsWith("https://utfs.io/")) {
          await deleteUploadthingFile(value);
        }
        onChange("");
      } catch (error) {
        console.error("Failed to delete file:", error);
      }
    });
  };

  if (value) {
    return (
      <div className="flex flex-col justify-center items-center">
        {apiEndpoint === "video" ? (
          <>
            <video className="w-80 rounded-sm" controls>
              <source src={value} />
              Your browser does not support the video tag.
            </video>
            <p className="text-xs text-muted-foreground my-1">
              Recommended formats: {acceptedTypes.video}
            </p>
          </>
        ) : (
          <>
            <div className="relative w-80 h-80">
              <Image
                src={value}
                alt="Uploaded Image"
                className="object-contain rounded-sm"
                fill
              />
            </div>
            <p className="text-xs text-muted-foreground my-1">
              Recommended formats: {acceptedTypes.image}
            </p>
          </>
        )}

        <Button
          variant={"ghost"}
          type="button"
          disabled={isPending}
          onClick={handleRemove}
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <Spinner size="sm" />
              Removing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <X className="h-4 w-4" />
              Remove
            </span>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full bg-muted/30">
      <UploadDropzone
        endpoint={apiEndpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          console.error("Upload error:", error);
        }}
        className="cursor-pointer"
        appearance={{
          label: "text-primary hover:text-primary",
          allowedContent: `text-primary/80 before:content-['Accepted_formats:_${
            apiEndpoint === "video" ? acceptedTypes.video : acceptedTypes.image
          }']`,
          button:
            "bg-primary dark:text-stone-900 hover:bg-primary/80 ut-uploading:bg-primary/80 after:bg-muted/30 focus-within:ring-foreground !text-primary-foreground font-medium",
        }}
      />
    </div>
  );
};

export default FileUpload;
