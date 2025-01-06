import Image from "next/image";
import { Github } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-8 border-t mt-auto">
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
  );
};
