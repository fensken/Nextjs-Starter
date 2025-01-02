"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Github,
  Lock,
  Database,
  CreditCard,
  Upload,
  FormInput,
  Palette,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { authClient } from "src/lib/auth-client";

import { ThemeToggle } from "src/components/global/ThemeToggle";
import { Button } from "src/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "src/components/ui/card";

type Feature = {
  title: string;
  description: string;
  icon: React.ElementType;
  link?: string;
  demoLink?: string;
};

const features: Feature[] = [
  {
    title: "Authentication",
    description:
      "Secure authentication powered by BetterAuth with social logins and magic links",
    icon: Lock,
  },
  {
    title: "Database",
    description:
      "Type-safe database queries with Prisma ORM and automatic migrations",
    icon: Database,
  },
  {
    title: "Payments",
    description:
      "Integrated payment processing with Stripe and Paddle for global transactions",
    icon: CreditCard,
  },
  {
    title: "File Upload",
    description:
      "Seamless file uploads with UploadThing including drag & drop support",
    icon: Upload,
  },
  {
    title: "Form Handling",
    description: "Powerful form validation and handling with React Hook Form",
    icon: FormInput,
  },
  {
    title: "Theming",
    description:
      "Beautiful dark and light mode with Tailwind CSS and shadcn/ui",
    icon: Palette,
    link: "/docs/theming",
    demoLink: "/demo/theming",
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="p-6 flex justify-between items-center border-b">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={80}
          height={16}
          priority
        />
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={async () => {
              await authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.push("/sign-in");
                  },
                },
              });
            }}
          >
            Sign Out
          </Button>
        </div>
      </header>

      <main className="flex-grow flex flex-col gap-24 px-6 py-12">
        {/* Enhanced Hero Section */}
        <div className="relative max-w-5xl mx-auto text-center space-y-8">
          <div
            className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
            aria-hidden="true"
          >
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-[#9089fc] bg-clip-text text-transparent">
              Welcome to Your Next.js Starter Kit
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Build faster, scale smarter, and create amazing web experiences
              with our powerful and flexible Next.js template.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Button size="lg" variant="outline" className="rounded-full px-8">
                View Documentation
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              This starter template comes packed with all the essential features
              you need to build modern web applications.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="mb-4 flex items-center justify-between">
                    <feature.icon className="h-6 w-6 text-primary" />
                    <Sparkles className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                  </div>
                  <CardTitle className="mb-2">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>

                {(feature.link || feature.demoLink) && (
                  <CardFooter className="flex flex-col sm:flex-row gap-3 sm:justify-between items-stretch sm:items-center">
                    {feature.link && (
                      <Button
                        role="link"
                        variant="ghost"
                        className="text-sm text-muted-foreground hover:text-foreground w-full sm:w-auto"
                        onClick={() => router.push(feature.link as string)}
                      >
                        Documentation
                      </Button>
                    )}
                    {feature.demoLink && (
                      <Button
                        role="link"
                        variant="default"
                        className="text-sm gap-2 w-full sm:w-auto"
                        onClick={() => router.push(feature.demoLink as string)}
                      >
                        Try Now <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        </div>
      </main>

      <footer className="py-8 border-t">
        <div className="container mx-auto flex flex-col items-center justify-center gap-4 text-sm text-muted-foreground">
          <a
            className="flex items-center gap-2 hover:text-foreground transition-colors"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
              className="dark:invert"
            />
            Powered by Next.js Version 15.X
          </a>
          <a
            href="https://github.com/fensken"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <Github size={16} />
            Created by @fensken
          </a>
        </div>
      </footer>
    </div>
  );
}
