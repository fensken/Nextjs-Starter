"use server";

import prisma from "src/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const BlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  published: z.boolean().default(false),
  featuredImage: z.string().min(1, "Featured image is required"),
});

export async function getAllBlogs() {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        author: true, // Include author details if needed
      },
      orderBy: {
        createdAt: "desc", // Order by creation date
      },
    });
    return { success: true, data: blogs };
  } catch (error) {
    return { success: false, error: "Failed to fetch blogs" };
  }
}

export async function createBlog(
  data: z.infer<typeof BlogSchema>,
  userId: string
) {
  try {
    const validated = BlogSchema.parse(data);

    const blog = await prisma.blog.create({
      data: {
        ...validated,
        authorId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    revalidatePath("/blogs");
    return { success: true, data: blog };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors };
    }
    return { success: false, error: "Failed to create blog post" };
  }
}

export async function updateBlog(
  blogId: string,
  userId: string,
  data: z.infer<typeof BlogSchema>
) {
  try {
    const validated = BlogSchema.parse(data);

    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog || blog.authorId !== userId) {
      return { success: false, error: "Unauthorized" };
    }

    const updated = await prisma.blog.update({
      where: { id: blogId },
      data: {
        ...validated,
        updatedAt: new Date(),
      },
    });

    revalidatePath("/blogs");
    revalidatePath(`/blogs/${blogId}`);
    return { success: true, data: updated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors };
    }
    return { success: false, error: "Failed to update blog post" };
  }
}

export async function deleteBlog(blogId: string, userId: string) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog || blog.authorId !== userId) {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.blog.delete({
      where: { id: blogId },
    });

    revalidatePath("/blogs");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete blog post" };
  }
}
