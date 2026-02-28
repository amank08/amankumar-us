"use client";

import { ReactNode, useCallback, useEffect } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithAuth } from "convex/react";
import {
  AuthKitProvider,
  useAuth,
  useAccessToken,
} from "@workos-inc/authkit-nextjs/components";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);

function useAuthFromAuthKit() {
  const { user, loading: isLoading } = useAuth();
  const { getAccessToken, refresh } = useAccessToken();
  const isAuthenticated = !!user;

  const fetchAccessToken = useCallback(
    async ({
      forceRefreshToken,
    }: { forceRefreshToken?: boolean } = {}): Promise<string | null> => {
      if (!user) return null;
      try {
        return forceRefreshToken
          ? ((await refresh()) ?? null)
          : ((await getAccessToken()) ?? null);
      } catch (error) {
        console.error("Failed to get access token:", error);
        return null;
      }
    },
    [user, refresh, getAccessToken]
  );

  return { isLoading, isAuthenticated, fetchAccessToken };
}

function UserSync({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const storeUser = useMutation(api.users.store);

  useEffect(() => {
    if (user) {
      storeUser();
    }
  }, [user, storeUser]);

  return <>{children}</>;
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <AuthKitProvider>
      <ConvexProviderWithAuth client={convex} useAuth={useAuthFromAuthKit}>
        <UserSync>{children}</UserSync>
      </ConvexProviderWithAuth>
    </AuthKitProvider>
  );
}
