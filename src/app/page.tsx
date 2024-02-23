import { lucia, securePage, validateRequest } from "@/lib/lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  await securePage();

  async function logout() {
    "use server";
    const { session } = await validateRequest();
    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return redirect("/login");
  }

  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col items-center gap-2 max-w-80">
        <h1 className="text-2xl font-bold text-center">
          This is a protected page
        </h1>
        <form action={logout}>
          <button type="submit" className="p-2 w-fit rounded-md bg-white/15">
            Log out
          </button>
        </form>
      </div>
    </div>
  );
}
