import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Sign the user out by clearing the session cookie and redirecting home.
 * Bypasses WorkOS logout endpoint which was causing a "Couldn't sign in" error.
 */
export async function GET() {
  const cookieStore = await cookies();
  cookieStore.delete("wos-session");
  redirect("/?toast=signed-out");
}
