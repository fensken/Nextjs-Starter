import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { openAPI, username } from "better-auth/plugins";

import prisma from "src/lib/prisma";
import { resend } from "src/lib/resend";
import VerificationEmail from "src/components/email-templates/VerificationEmail";
import ResetPasswordEmail from "src/components/email-templates/ResetPasswordEmail";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [openAPI(), nextCookies(), username()], // INFO: Remove username if app does not require
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "Zinx <support@zinx.app>",
        to: [user.email],
        subject: "Reset your password",
        react: ResetPasswordEmail({
          name: user.name,
          url: `${url}`,
        }),
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: "Zinx <support@zinx.app>",
        to: [user.email],
        subject: "Verify your email address",
        react: VerificationEmail({
          name: user.name,
          url: `${url}&callbackURL=${process.env.NEXT_PUBLIC_APP_URL}`,
        }),
      });
    },
  },
});

export type SessionType = typeof auth.$Infer.Session;
