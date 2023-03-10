import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sabastian Auth | About the Ink Tattoos</title>

        <link rel="stylesheet" href="/global.css" />
      </Head>

      <div class="p-20">
        <div class="flex justify-between">
          <div>
            <h1 class="font-cinzel-decorative text-5xl font-bold">
              Sabastian Auth
            </h1>

            <p class="font-spectral text-2xl w-[640px] mt-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem nemo sint sapiente saepe! Quod rem odit neque nisi sed
              fugit inventore numquam deserunt, cupiditate nemo vitae,
              doloremque aspernatur et eveniet?
            </p>
          </div>

          <div>
            <a
              href="/message/sabastian"
              class="bg-white text-black py-2 px-4 text-xl font-bold"
            >
              Message
            </a>
          </div>
        </div>

        <ul class="text-xl font-bold uppercase flex gap-5 mt-20">
          <li class="text-white border-2 border-white py-2 px-4 rounded-full cursor-pointer">
            Black & Grey
          </li>
          <li class="text-gray-400 border-2 border-gray-400 py-2 px-4 rounded-full cursor-pointer">
            Color
          </li>
        </ul>

        <div id="gallery" class="flex flex-wrap justify-center gap-5 mt-5">
          <img
            src="/tattoos/02.jpg"
            alt=""
            class="h-96 w-56 object-cover rounded-3xl"
          />
          <img
            src="/tattoos/08.jpg"
            alt=""
            class="h-96 w-48 object-cover rounded-3xl"
          />
          <img
            src="/tattoos/09.jpg"
            alt=""
            class="h-96 w-48 object-cover rounded-3xl"
          />
          <img
            src="/tattoos/05.jpg"
            alt=""
            class="h-96 w-80 object-cover rounded-3xl"
          />
          <img
            src="/tattoos/07.jpg"
            alt=""
            class="h-96 w-48 object-cover rounded-3xl"
          />
          <img
            src="/tattoos/03.jpg"
            alt=""
            class="h-96 object-cover rounded-3xl"
          />
          <img
            src="/tattoos/04.jpg"
            alt=""
            class="h-96 object-cover rounded-3xl"
          />
          <img
            src="/tattoos/06.jpg"
            alt=""
            class="h-96 w-48 object-cover rounded-3xl"
          />
          <img
            src="/tattoos/10.jpg"
            alt=""
            class="h-96 w-48 object-cover rounded-3xl"
          />
          <img
            src="/tattoos/01.jpg"
            alt=""
            class="h-96 w-48 object-cover rounded-3xl"
          />
        </div>
      </div>
    </>
  );
}
