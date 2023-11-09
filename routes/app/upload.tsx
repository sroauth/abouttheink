import { Head } from "$fresh/runtime.ts";
import Form from "../../islands/Form.tsx";

export default function Upload() {
  return (
    <>
      <Head>
        <title>About the Ink Tattoos</title>
        <link rel="stylesheet" href="/shared.css" />
      </Head>

      <div class="max-w-[34em] mx-auto font-serif leading-normal p-4">
        <h1 class="font-sans font-bold text-7xl mb-4">
          <small class="block text-4xl">Transfer Photographs</small> Dashboard
        </h1>

        <h2 class="font-sans font-light text-2xl mb-4">
          Transfer photographs from your computer to your catalog on the About
          the Ink Tattoos web site
        </h2>

        <ul class="mb-4">
          <li class="list-disc list-inside">
            <a
              href="/app/"
              title="Dashboard - About the Ink Tattoos"
              class="text-blue-600 underline"
            >
              Go to the Primary Dashboard page
            </a>
          </li>
        </ul>

        <Form />
      </div>
    </>
  );
}
