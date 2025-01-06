import { features } from "src/constants/features";

import { FeatureCard } from "./FeatureCard";

export const FeaturesSection = () => {
  return (
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          This starter template comes packed with all the essential features you
          need to build modern web applications.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            link={feature.link}
            demoLink={feature.demoLink}
          />
        ))}
      </div>
    </div>
  );
};
