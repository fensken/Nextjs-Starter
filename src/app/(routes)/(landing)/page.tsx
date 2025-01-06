import { Button } from "src/components/ui/button";

import { FeaturesSection } from "./_components/FeaturesSection";

export default function Home() {
  return (
    <main className="flex-grow flex flex-col gap-24 px-6 py-12">
      <HeroSection />
      <FeaturesSection />
    </main>
  );
}

const HeroSection = () => {
  return (
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
          Build faster, scale smarter, and create amazing web experiences with
          our powerful and flexible Next.js template.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Button size="lg" variant="outline" className="rounded-full px-8">
            View Documentation
          </Button>
        </div>
      </div>
    </div>
  );
};
