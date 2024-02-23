import { lucia } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await prisma.user.create({
      data: {
        id: "42",
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log("[Prisma] User with ID 42 already exists in the database.");
      }
    } else {
      throw error;
    }
  }

  const session = await lucia.createSession("42", {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });
  // Added for you to try as well
  return NextResponse.redirect(new URL("/", req.url));
}
