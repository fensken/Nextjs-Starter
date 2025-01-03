import {
  Lock,
  Database,
  CreditCard,
  Upload,
  FormInput,
  Palette,
} from "lucide-react";

export const features = [
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
