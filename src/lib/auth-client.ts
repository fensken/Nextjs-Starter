import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [usernameClient()], // INFO: remove username if app does not require it
});

export const { signIn, signOut, signUp, useSession } = authClient;
