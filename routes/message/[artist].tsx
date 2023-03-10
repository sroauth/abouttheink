import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import Chat from "@/islands/Chat.tsx";

export default function Home(props: PageProps) {
  const artists = {
    sabastian:
      "J5vYLkfFvw2IhQIbqt6RWo27J9F9uyegM6bZ0Zzdq2w.akVKIQdvtR_d37SXEhTPaLCoSpUVuqVEEdhCti9dpII",
  };

  return (
    <>
      <Head>
        <title>Sabastian Auth | About the Ink Tattoos</title>

        <link rel="stylesheet" href="/shared.css" />
      </Head>

      <div class="min-h-screen bg-black text-white">
        <Chat pub={artists[props.params.artist]} />
      </div>
    </>
  );
}
