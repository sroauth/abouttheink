import { PageProps } from "$fresh/server.ts";
import ArtistChat from "@/islands/ArtistChat.tsx";

export default function ArtistChatPage(props: PageProps) {
  return (
    <main class="content-grid">
      <ArtistChat pub={props.params.pub} />
    </main>
  );
}
