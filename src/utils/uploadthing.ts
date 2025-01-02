import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { OurFileRouter } from "src/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

export const deleteUploadthingFile = async (fileUrl: string) => {
  try {
    const response = await fetch("/api/uploadthing", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: fileUrl }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete file");
    }

    return response.json();
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};
