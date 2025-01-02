"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";

import { authClient } from "src/lib/auth-client";

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
import { Alert, AlertDescription, AlertTitle } from "src/components/ui/alert";
import { Input } from "src/components/ui/input";
import ErrorBlock from "src/components/global/ErrorBlock";

// Zod schema for form validation
const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const [isPending, startTransition] = useTransition();
  const [forgotPasswordError, setForgotPasswordError] = useState<
    string | undefined
  >("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Initialize the form with react-hook-form and zod resolver
  const form = useForm<forgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle form submission
  const onSubmit = (values: forgotPasswordSchemaType) => {
    startTransition(async () => {
      const { error } = await authClient.forgetPassword({
        email: values.email,
        redirectTo: "/reset-password",
      });

      if (error) {
        setForgotPasswordError(error.message);
      } else {
        setIsSubmitted(true);
        toast.success("Password reset link sent to your email");
        form.reset();
      }
    });
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            We've sent a password reset link to your email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Reset Link Sent!</AlertTitle>
            <AlertDescription>
              If you don't see the email, check your spam folder.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsSubmitted(false)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to reset password
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Forgot Password</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your email to receive a password reset link
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@zinx.app" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Send Reset Link"
              )}
            </Button>

            <div className="text-center text-sm mt-4">
              Remember your password?{" "}
              <Link href="/sign-in" className="text-primary underline">
                Back to Sign In
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>

      {!isPending && forgotPasswordError && (
        <CardFooter>
          <ErrorBlock errorMessage={forgotPasswordError} />
        </CardFooter>
      )}
    </Card>
  );
}
