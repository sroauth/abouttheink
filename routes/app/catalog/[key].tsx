import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import CatalogItemDetails from "../../../islands/CatalogItemDetails.tsx";

export default function CatalogItem(props: PageProps) {
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
            Add a caption or delete your photograph
          </h2>

          <ul class="font-mono">
            <li>
              🌄{" "}
              <a href="/app/catalog" class="text-blue-600 underline">
                Go to the Catalog page
              </a>
            </li>
          </ul>
        </header>

        <CatalogItemDetails itemKey={props.params.key} />
      </div>
    </>
  );
}
