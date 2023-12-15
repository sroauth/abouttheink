import { PageProps } from "$fresh/server.ts";
import Chat from "@/islands/Chat.tsx";

export default function ArtistChat(props: PageProps) {
  return (
    <main class="content-grid">
      <Chat artist={props.params.name.replace("-", "")} />
    </main>
  );
}
