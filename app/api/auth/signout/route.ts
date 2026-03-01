import { NextRequest } from "next/server";
import { signOut } from "@workos-inc/authkit-nextjs";

/** Sign the user out and redirect back to the homepage with a toast. */
export async function GET(request: NextRequest) {
  const { origin } = new URL(request.url);
  return signOut({ returnTo: `${origin}/?toast=signed-out` });
}
