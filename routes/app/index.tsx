import { Head } from "$fresh/runtime.ts";
import ArtistLinks from "../../islands/ArtistLinks.tsx";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>About the Ink Tattoos</title>
        <link rel="stylesheet" href="/shared.css" />
      </Head>

      <div class="max-w-[34em] mx-auto font-serif leading-normal p-4">
        <h1 class="font-sans font-bold text-7xl mb-4">
          <small class="block text-4xl">Primary</small> Dashboard
        </h1>

        <h2 class="font-sans font-light text-2xl mb-4">
          Engage in operations for overseeing your catalog and clientele
        </h2>

        <ArtistLinks />
      </div>
    </>
  );
}
