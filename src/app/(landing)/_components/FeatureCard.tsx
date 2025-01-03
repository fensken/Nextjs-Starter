"use client";

import { Button } from "src/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "src/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ElementType;
  link?: string;
  demoLink?: string;
};

export const FeatureCard = ({
  title,
  description,
  icon: Icon,
  link,
  demoLink,
}: FeatureCardProps) => {
  const router = useRouter();

  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="mb-4 flex items-center justify-between">
          <Icon className="h-6 w-6 text-primary" />
          <Sparkles className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
        </div>
        <CardTitle className="mb-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      {(link || demoLink) && (
        <CardFooter className="flex flex-col sm:flex-row gap-3 sm:justify-between items-stretch sm:items-center">
          {link && (
            <Button
              role="link"
              variant="ghost"
              className="text-sm text-muted-foreground hover:text-foreground w-full sm:w-auto"
              onClick={() => router.push(link)}
            >
              Documentation
            </Button>
          )}
          {demoLink && (
            <Button
              role="link"
              variant="default"
              className="text-sm gap-2 w-full sm:w-auto"
              onClick={() => router.push(demoLink)}
            >
              Try Now <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};
