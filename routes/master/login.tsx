import { Head } from "$fresh/runtime.ts";
import MasterAuth from "../../islands/MasterAuth.tsx";

export default function Login() {
  return (
    <>
      <Head>
        <title>About the Ink Tattoos</title>
        <link rel="stylesheet" href="/shared.css" />
      </Head>

      <div class="max-w-[34em] mx-auto font-serif leading-normal p-4">
        <h1 class="font-sans font-bold text-7xl mb-4">
          <small class="block text-4xl">Master Account</small> Verification
        </h1>

        <h2 class="font-sans font-light text-2xl mb-4">
          Gain authorization to engage in operations for overseeing your artists
        </h2>

        <ul class="list-disc list-inside text-blue-600 underline mb-4">
          <li>
            <a href="/">
              Go to the Main page
            </a>
          </li>
        </ul>

        <MasterAuth />
      </div>
    </>
  );
}
