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
        <a href="/app/catalog" class="text-blue-600 underline">
          Go back to the Catalog page
        </a>
        <CatalogItemDetails itemKey={props.params.key} />
      </div>
    </>
  );
}
