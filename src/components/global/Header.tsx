// components/Header.tsx
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { authClient } from "src/lib/auth-client";

import { ThemeToggle } from "src/components/global/ThemeToggle";
import { Button } from "src/components/ui/button";

export const Header = () => {
  const router = useRouter();

  return (
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
  );
};
