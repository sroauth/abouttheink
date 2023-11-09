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
          <h1 class="font-sans font-bold text-7xl mb-4">
            <small class="block text-4xl">Manage Catalog</small> Dashboard
          </h1>

          <h2 class="font-sans font-light text-2xl mb-4">
            Transfer and manage photographs in your catalog
          </h2>

          <a href="/app/" class="text-blue-600 underline">
            Go to the Dashboard page
          </a>
        </header>

        <CatalogManager />
      </div>
    </>
  );
}
