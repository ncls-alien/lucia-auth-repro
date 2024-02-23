"use client";

import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      redirect: "manual",
    });
    if (res.status === 0) {
      return router.refresh();
      // Added for you to try as well
      return router.push("/");
    } else {
      console.log(res);
    }
  }

  return (
    <div className="grid place-items-center h-screen text-center text-balance">
      <form className="flex flex-col gap-2 max-w-80" onSubmit={onSubmit}>
        <h1 className="text-2xl font-bold">This is a client side Login</h1>
        <p>Values entered do not matter and always validate</p>
        <input placeholder="Username" />
        <input type="password" placeholder="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
