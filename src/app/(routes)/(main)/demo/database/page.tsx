import Link from "next/link";
import { AlertCircle } from "lucide-react";

import { getAllBlogs } from "src/actions/blog";
import { Button } from "src/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "src/components/ui/alert";

import BlogCard from "./_components/BlogCard";

export default async function BlogsPage() {
  const { success, data: blogs } = await getAllBlogs();

  if (!success) {
    return <div>Error fetching blogs.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">All Blog Posts</h1>
        <p className="text-muted-foreground mb-4">
          These blogs are fetched from the database.
        </p>
        <Link href="/demo/form">
          <Button>Create a new blog</Button>
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <div className="col-span-full text-center">
            <Alert className="w-fit mx-auto bg-muted">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="text-left">No blog posts!</AlertTitle>
              <AlertDescription className="text-left">
                Create one to display here.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
}
