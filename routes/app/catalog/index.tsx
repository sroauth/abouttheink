import { Head } from "$fresh/runtime.ts";
import CatalogManager from "../../../islands/CatalogManager.tsx";

export default function Catalog() {
  return (
    <>
      <Head>
        <title>Catalog - About the Ink Tattoos</title>
        <link rel="stylesheet" href="/shared.css" />
      </Head>

      <div class="max-w-[34em] mx-auto font-serif leading-normal p-4">
        <header class="border-b border-black pb-4 mb-4">
          <h1 class="font-sans font-bold text-6xl mb-4">
            <small class="block text-3xl">About the Ink Hub</small> Catalog
          </h1>

          <h2 class="font-sans font-light text-xl mb-4">
            Transfer and manage photographs in your catalog
          </h2>

          <ul class="font-mono">
            <li>
              🎛️{" "}
              <a href="/app/" class="text-blue-600 underline">
                Go to the Hub page
              </a>
            </li>
          </ul>
        </header>

        <CatalogManager />
      </div>
    </>
  );
}
