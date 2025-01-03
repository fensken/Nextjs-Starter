"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Mail, Send, Eye } from "lucide-react";

import {
  WelcomeDemoEmail,
  ResetPasswordDemoEmail,
  EmailTemplateProps,
} from "src/components/email-templates/Demo";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "src/components/ui/card";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form";
import { RadioGroup, RadioGroupItem } from "src/components/ui/radio-group";

type EmailType = "welcome" | "reset-password";

interface FormValues {
  emailType: EmailType;
  recipientEmail: string;
  recipientName: string;
}

const EmailDemoPage: React.FC = () => {
  const [previewMode, setPreviewMode] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      emailType: "welcome",
      recipientEmail: "",
      recipientName: "",
    },
  });

  const { watch } = form;
  const formValues = watch();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const emailData = {
      type: data.emailType,
      email: data.recipientEmail,
      name: data.recipientName,
      url: `https://app.zinx.com/${data.emailType === "welcome" ? "verify" : "reset-password"}`,
    };

    await toast.promise(
      async () => {
        const response = await fetch("/api/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to send email");
        }

        return response.json();
      },
      {
        loading: "Sending email...",
        success: "Email sent successfully!",
        error: (err) => err.message || "Failed to send email",
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email Template Demo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="emailType"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Select Email Template</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex gap-4 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="welcome" id="welcome" />
                          <Label htmlFor="welcome">Welcome Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="reset-password"
                            id="reset-password"
                          />
                          <Label htmlFor="reset-password">Password Reset</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="recipientEmail"
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="recipient@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="recipientName"
                  rules={{ required: "Name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={() => setPreviewMode(!previewMode)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  {previewMode ? "Hide Preview" : "Show Preview"}
                </Button>
                <Button type="submit" className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Send Email
                </Button>
              </div>
            </form>
          </Form>

          {previewMode && (
            <div className="mt-6 border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Preview</h3>
              {formValues.emailType === "welcome" ? (
                <WelcomeDemoEmail
                  name={formValues.recipientName || "User"}
                  url="https://app.zinx.com/verify"
                />
              ) : (
                <ResetPasswordDemoEmail
                  name={formValues.recipientName || "User"}
                  url="https://app.zinx.com/reset-password"
                />
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailDemoPage;
