import { Head } from "$fresh/runtime.ts";
import Messages from "@/islands/Messages.tsx";

export default function MessagesPage() {
  return (
    <>
      <Head>
        <title>About the Ink Tattoos</title>
      </Head>

      <main class="content-grid">
        <Messages />
      </main>
    </>
  );
}
