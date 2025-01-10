"use client";

import { useState, useTransition } from "react";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { createBlog } from "src/actions/blog";
import FileUpload from "src/components/global/FileUpload";
import { Button } from "src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import { Textarea } from "src/components/ui/textarea";
import { Switch } from "src/components/ui/switch";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "src/components/ui/card";
import { useSession } from "src/lib/auth-client";
import Spinner from "src/components/global/Spinner";
import { PenIcon, ImageIcon, EyeIcon, Plus } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  published: z.boolean().default(false),
  featuredImage: z.string().min(1, "Featured image is required"),
});

export default function BlogForm() {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const user = sessionData?.user;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      published: false,
      featuredImage: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      setLoading(true);
      const result = await createBlog(data, user?.id as string);

      if (result.success) {
        toast.success("Blog post created successfully!");
        router.push("/demo/database");
      } else {
        const errorMessage = Array.isArray(result.error)
          ? result.error[0].message
          : result.error;
        form.setError("root", { message: errorMessage });
        toast.error(errorMessage);
      }

      setLoading(false);
    });
  };

  if (!sessionData) return <Spinner />;
  if (!user) return redirect("/sign-in");

  return (
    <Card className="max-w-2xl w-full mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Create New Blog Post
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading || isPending}
                      placeholder="Enter your blog title"
                      className="text-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Content
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={10}
                      disabled={loading || isPending}
                      placeholder="Write your blog content here..."
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="featuredImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Featured Image
                  </FormLabel>
                  <FormControl>
                    <FileUpload
                      apiEndpoint="image"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4 py-2">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={loading || isPending}
                    />
                  </FormControl>
                  <FormLabel className="flex items-center gap-2 cursor-pointer">
                    Publish immediately
                  </FormLabel>
                </FormItem>
              )}
            />

            {form.formState.errors.root && (
              <p className="text-red-500 text-sm text-center">
                {form.formState.errors.root.message}
              </p>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          disabled={loading || isPending}
          className="w-full"
          onClick={form.handleSubmit(onSubmit)}
        >
          {isPending ? (
            <Spinner className="mr-2 h-4 w-4" />
          ) : (
            <Plus className="mr-2 h-4 w-4" />
          )}
          {isPending ? "Creating..." : "Create Blog Post"}
        </Button>
      </CardFooter>
    </Card>
  );
}
