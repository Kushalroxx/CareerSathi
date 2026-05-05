export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { streamAndResHandler } from "@/lib/chat/streamAndResHandler";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const message = typeof body.message === "string" ? body.message : "";
  const chatId = body.chatId;
  const history = Array.isArray(body.history) ? body.history : [];

  if (!chatId || !message) return NextResponse.json({ error: "Missing data" }, { status: 400 });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      await streamAndResHandler(message, history, chatId, session, controller, encoder);
    }
  });


  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no"
    },
  });
}