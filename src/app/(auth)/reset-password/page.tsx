"use client";

import { Suspense, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { authClient } from "src/lib/auth-client";

import Spinner from "src/components/global/Spinner";
import { Button } from "src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "src/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import ErrorBlock from "src/components/global/ErrorBlock";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must include uppercase, lowercase, number, and special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ResetPasswordContent = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [resetPasswordError, setResetPasswordError] = useState<
    string | undefined
  >("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const error = searchParams.get("error");

  // Initialize the form with react-hook-form and zod resolver
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Handle form submission
  const onSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
    // Ensure token exists
    if (!token) {
      toast.error("Invalid or expired reset token");
      return;
    }

    startTransition(async () => {
      const { error } = await authClient.resetPassword({
        newPassword: values.password,
      });

      if (error) {
        setResetPasswordError(error.message);
      } else {
        toast.success("Password reset successfully");
        form.reset();
        router.push("/");
      }
    });
  };

  // If no token is present, show an error
  if (!token || error) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">
            Invalid Reset Link
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            The password reset link is invalid or has expired.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => router.push("/forget-password")}
            className="w-full"
          >
            Request New Reset Link
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Reset Password</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter a new password for your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter new password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm new password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Reset Password"
              )}
            </Button>

            <div className="text-center text-sm mt-4">
              Remember your password?{" "}
              <a href="/sign-in" className="text-primary underline">
                Back to Sign In
              </a>
            </div>
          </form>
        </Form>
      </CardContent>

      {!isPending && resetPasswordError && (
        <CardFooter>
          <ErrorBlock errorMessage={resetPasswordError} />
        </CardFooter>
      )}
    </Card>
  );
};

export default function ResetPassword() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Spinner size={"lg"} />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
