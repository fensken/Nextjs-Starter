"use client";

import { useState, useTransition } from "react";
import { Button } from "src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "src/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "src/components/ui/alert-dialog";
import { deleteBlog } from "src/actions/blog";
import { useSession } from "src/lib/auth-client";
import Spinner from "src/components/global/Spinner";
import { redirect } from "next/navigation";

interface BlogCardProps {
  blog: {
    id: string;
    title: string;
    content: string;
    featuredImage: string;
    author: {
      name: string;
    };
  };
}

export default function BlogCard({ blog }: BlogCardProps) {
  const { data: sessionData } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPending, startTransition] = useTransition();

  const user = sessionData?.user;

  const handleDelete = async () => {
    setIsDeleting(true);
    startTransition(async () => {
      const result = await deleteBlog(blog.id, user?.id as string);
      setIsDeleting(false);
      if (result.success) {
        // Optionally, you can add some UI feedback here
        console.log("Blog deleted successfully");
      } else {
        console.error("Failed to delete blog:", result.error);
      }
    });
  };

  if (!sessionData) return <Spinner />;
  if (!user) return redirect("/sign-in");

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{blog.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={blog.featuredImage}
          alt={blog.title}
          className="w-full h-48 object-cover mb-4 rounded"
        />
        <p className="text-sm text-muted-foreground mb-2">{blog.content}</p>
        <p className="text-xs text-muted-foreground">By {blog.author.name}</p>
      </CardContent>

      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="ml-auto bg-rose-700"
              variant="destructive"
              disabled={isDeleting || isPending}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                blog post.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
