import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>About the Ink Tattoos</title>
      </Head>

      <div class="p-5">
        <h1>About the Ink Tattoos</h1>

        <div class="flex flex-col gap-5 mt-5">
          <a href="/artist/sabastian" class="text-blue-600">
            Sabastian Auth
          </a>

          <a href="/login" class="text-blue-600">
            Go to Login
          </a>
        </div>
      </div>
    </>
  );
}
