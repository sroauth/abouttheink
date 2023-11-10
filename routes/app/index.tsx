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
        <h1 class="font-sans font-bold text-6xl mb-4">
          <small class="block text-3xl">About the Ink</small> Hub
        </h1>

        <h2 class="font-sans font-light text-xl mb-4">
          Manage your catalog and availability
        </h2>

        <ArtistLinks />
      </div>
    </>
  );
}
