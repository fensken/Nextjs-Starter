import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "src/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "src/components/ui/card";

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
              variant="ghost"
              className="text-sm text-muted-foreground hover:text-foreground w-full sm:w-auto"
            >
              <Link href={link}>Documentation</Link>
            </Button>
          )}

          {demoLink && (
            <Button variant="default" className="text-sm w-full sm:w-auto">
              <Link href={demoLink} className="flex gap-2">
                Try Now <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};
