import { getSignInUrl, getSignUpUrl } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const screenHint = searchParams.get("screen_hint");

  const url =
    screenHint === "sign-up"
      ? await getSignUpUrl()
      : await getSignInUrl();

  redirect(url);
}
