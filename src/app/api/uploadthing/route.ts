import { createRouteHandler } from "uploadthing/next";
import { UTApi } from "uploadthing/server";

import { ourFileRouter } from "./core";
import { NextResponse } from "next/server";

const utapi = new UTApi();

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,

  // Apply an (optional) custom config:
  // config: { ... },
});

export async function DELETE(request: Request) {
  try {
    const { url } = await request.json();

    // Extract the file key from the URL
    // The URL format is typically like: https://uploadthing.com/f/[file-key]
    const fileKey = url.split("/").pop();

    // Delete the file using the UploadThing API
    await utapi.deleteFiles(fileKey);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
