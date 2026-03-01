import { signOut } from "@workos-inc/authkit-nextjs";

/** Sign the user out and redirect back to the homepage. */
export async function GET() {
  return signOut({ returnTo: "/?toast=signed-out" });
}
