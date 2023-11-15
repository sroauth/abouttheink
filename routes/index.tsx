import { Head } from "$fresh/runtime.ts";
import Gallery from "../islands/Gallery.tsx";
import OpenSign from "../islands/OpenSign.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>About the Ink Tattoos</title>

        <meta
          name="description"
          content="Premier tattoo shop in Charles County, MD, established in 1993. Home to diligent artists Jason Auth, Ashley Cooksey, and Sabastian Auth."
        />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="About the Ink Tattoos" />

        <link rel="stylesheet" href="/shared.css" />
      </Head>

      <main class="max-w-[34em] mx-auto font-serif leading-normal p-4">
        <hgroup>
          <h1 class="font-sans font-bold text-6xl mb-4">
            <small class="text-3xl">About the Ink</small>
            <br />Tattoos
          </h1>

          <h2 class="font-sans font-light text-xl mb-4">
            Rendering the art of tattoos for more than 30 years
          </h2>
        </hgroup>

        <nav class="mb-4 font-mono">
          <ul>
            <li>
              🚶{" "}
              <a
                href="#Walk-in_Hours"
                class="text-blue-600 underline"
              >
                Walk-in Hours
              </a>
            </li>
            <li>
              💬{" "}
              <a
                href="#Contact_Us"
                class="text-blue-600 underline"
              >
                Contact Us
              </a>
            </li>
            <li>
              🧑‍🎨{" "}
              <a
                href="#Our_Artists"
                class="text-blue-600 underline"
              >
                Our Artists
              </a>
            </li>
            <li>
              🎨{" "}
              <a
                href="#Our_Latest_Work"
                class="text-blue-600 underline"
              >
                Our Latest Work
              </a>
            </li>
            <li>
              ‼️{" "}
              <a
                href="#Piercing_Services"
                class="text-red-600 underline"
              >
                Piercing Services
              </a>
            </li>
            <li>
              📄{" "}
              <a
                href="/documents/tattoo-aftercare-instructions"
                class="text-blue-600 underline"
              >
                Tattoo Aftercare
              </a>
            </li>
          </ul>
        </nav>

        <article>
          <section class="border-b-2 border-black pb-8 mb-0.5">
            <OpenSign />
            <p class="text-right mt-0.5">
              <em>Availability is updated in realtime.</em>
            </p>
          </section>

          <section
            id="Walk-in_Hours"
            class="border-b-2 border-black pb-4 mb-0.5"
          >
            <h3 class="font-sans font-bold text-2xl mb-4 leading-none">
              <small class="text-base">When Are</small>
              <br />Walk-in Hours
            </h3>

            <table class="border border-black w-full mb-4 font-mono">
              <thead>
                <tr class="text-left border-b border-black">
                  <th class="border-r border-black px-1">📅 Day</th>
                  <th class="px-1">⏰ Hours</th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-red-50 border-b border-black">
                  <td class="flex items-center gap-2 border-r border-red-300 px-1">
                    <img src="/images/icons/sun.png" class="w-4 h-4" />
                    <span>Sunday</span>
                  </td>
                  <td class="px-1">Closed</td>
                </tr>
                <tr class="bg-green-50 border-b border-black">
                  <td class="flex items-center gap-2 border-r border-green-300 px-1">
                    <img src="/images/icons/moon.png" class="w-4 h-4" />
                    <span>Monday</span>
                  </td>
                  <td class="px-1">12:00-6:00 PM</td>
                </tr>
                <tr class="bg-red-50 border-b border-black">
                  <td class="flex items-center gap-2 border-r border-red-300 px-1">
                    <img src="/images/icons/mars.png" class="w-4 h-4" />
                    <span>Tuesday</span>
                  </td>
                  <td class="px-1">Closed</td>
                </tr>
                <tr class="bg-green-50 border-b border-black">
                  <td class="flex items-center gap-2 border-r border-green-300 px-1">
                    <img
                      src="/images/icons/mercury.png"
                      class="w-4 h-4"
                    />
                    <span>Wednesday</span>
                  </td>
                  <td class="px-1">12:00-6:00 PM</td>
                </tr>
                <tr class="bg-green-50 border-b border-black">
                  <td class="flex items-center gap-2 border-r border-green-300 px-1">
                    <img
                      src="/images/icons/jupiter.png"
                      class="w-4 h-4"
                    />
                    <span>Thursday</span>
                  </td>
                  <td class="px-1">12:00-6:00 PM</td>
                </tr>
                <tr class="bg-green-50 border-b border-black">
                  <td class="flex items-center gap-2 border-r border-green-300 px-1">
                    <img src="/images/icons/venus.png" class="w-4 h-4" />
                    <span>Friday</span>
                  </td>
                  <td class="px-1">12:00-6:00 PM</td>
                </tr>
                <tr class="bg-green-50">
                  <td class="flex items-center gap-2 border-r border-green-300 px-1">
                    <img
                      src="/images/icons/saturn.png"
                      class="w-4 h-4"
                    />
                    <span>Saturday</span>
                  </td>
                  <td class="px-1">12:00-6:00 PM</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section
            id="Contact_Us"
            class="border-b-2 border-black pb-8 mb-0.5"
          >
            <h3 class="font-sans font-bold text-2xl mb-4 leading-none">
              <small class="text-base">How To</small>
              <br />Contact Us
            </h3>

            <address>
              ☎️ Call us at{" "}
              <a href="tel:+13017055781" class="text-blue-600 underline">
                (301) 705-5781
              </a>.
              <br />
              📧 Email{" "}
              <a
                href="mailto:abouttheink@gmail.com"
                class="text-blue-600 underline"
              >
                abouttheink@gmail.com
              </a>.
              <br />
              📍 During walk-in hours, visit us:<br />
              <a
                href="maps:?saddr=Current Location&daddr=4433 Crain Highway White Plains MD 20695 United States"
                class="text-blue-600 underline"
              >
                4433 Crain Highway<br />
                White Plains, MD 20695
              </a>
              <br />
              <hr />
              🐞 Notice a bug? Email the{" "}
              <a
                href="mailto:abouttheink@gmail.com"
                class="text-blue-600 underline"
              >
                webmaster
              </a>.
            </address>
          </section>

          <section
            id="Our_Artists"
            class="border-b-2 border-black pb-8 mb-0.5"
          >
            <h3 class="font-sans font-bold text-2xl mb-4 leading-none">
              <small class="text-base">Who Are</small>
              <br />Our Artists
            </h3>

            <div id="Artist_Jason_Auth" class="flex gap-4 mb-4 pb-4 border-b">
              <img
                src="/images/artists/jason-auth.jpg"
                class="w-[150px] h-[150px]"
              />

              <div class="flex-grow">
                <p class="font-sans font-bold">Jason Auth</p>
                <p>
                  Contact on:
                </p>
                <div class="flex flex-col gap-0.5">
                  <a
                    href="https://ig.me/m/abouttheinktattoos"
                    target="_blank"
                    class="bg-[#ff0176] font-sans text-white flex items-center"
                  >
                    <div class="flex items-center justify-center w-8 h-8">
                      <img
                        src="/images/glyphs/instagram.svg"
                        width="29"
                        height="29"
                      />
                    </div>
                    <span class="underline">Instagram</span>
                  </a>
                  <a
                    href="https://m.me/abouttheinktattoos"
                    target="_blank"
                    class="bg-[#3465aa] font-sans text-white flex items-center"
                  >
                    <div class="flex items-center justify-center w-8 h-8">
                      <img
                        src="/images/glyphs/facebook.svg"
                        width="29"
                        height="29"
                      />
                    </div>
                    <span class="underline">Facebook</span>
                  </a>
                </div>
              </div>
            </div>

            <div
              id="Artist_Ashley_Cooksey"
              class="flex gap-4 mb-4 pb-4 border-b"
            >
              <img
                src="/images/artists/ashley-cooksey.jpg"
                class="w-[150px] h-[150px]"
              />

              <div class="flex-grow">
                <p class="font-sans font-bold">Ashley Cooksey</p>
                <p>
                  Contact on:
                </p>
                <div class="flex flex-col gap-0.5">
                  <a
                    href="https://instagram.com/tattoosbyashleyrose"
                    target="_blank"
                    class="bg-[#ff0176] font-sans text-white flex items-center"
                  >
                    <div class="flex items-center justify-center w-8 h-8">
                      <img
                        src="/images/glyphs/instagram.svg"
                        width="29"
                        height="29"
                      />
                    </div>
                    <span class="underline">Instagram</span>
                  </a>
                  <a
                    href="https://facebook.com/ashley.cooksey.5"
                    target="_blank"
                    class="bg-[#3465aa] font-sans text-white flex items-center"
                  >
                    <div class="flex items-center justify-center w-8 h-8">
                      <img
                        src="/images/glyphs/facebook.svg"
                        width="29"
                        height="29"
                      />
                    </div>
                    <span class="underline">Facebook</span>
                  </a>
                </div>
              </div>
            </div>

            <div
              id="Artist_Sabastian_Auth"
              class="flex gap-4"
            >
              <img
                src="/images/artists/sabastian-auth.jpg"
                class="w-[150px] h-[150px]"
              />

              <div class="flex-grow">
                <p class="font-sans font-bold">Sabastian Auth</p>
                <p>
                  Contact on:
                </p>
                <div class="flex flex-col gap-0.5">
                  <a
                    href="https://ig.me/m/sabastianauth"
                    target="_blank"
                    class="bg-[#ff0176] font-sans text-white flex items-center"
                  >
                    <div class="flex items-center justify-center w-8 h-8">
                      <img
                        src="/images/glyphs/instagram.svg"
                        width="29"
                        height="29"
                      />
                    </div>
                    <span class="underline">Instagram</span>
                  </a>
                  <a
                    href="https://m.me/abouttheinktattoos"
                    target="_blank"
                    class="bg-[#3465aa] font-sans text-white flex items-center"
                  >
                    <div class="flex items-center justify-center w-8 h-8">
                      <img
                        src="/images/glyphs/facebook.svg"
                        width="29"
                        height="29"
                      />
                    </div>
                    <span class="underline">Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section
            id="Our_Latest_Work"
            class="border-b-2 border-black pb-8 mb-0.5"
          >
            <h3 class="font-sans font-bold text-2xl mb-4 leading-none">
              <small class="text-base">What Is</small>
              <br />Our Latest Work
            </h3>

            <Gallery />
          </section>

          <section
            id="Piercing_Services"
            class="border-b border-black pb-8 mb-4"
          >
            <h3 class="font-sans font-bold text-2xl mb-4 leading-none">
              <small class="text-base">How To Receive</small>
              <br />Piercing Services
            </h3>
            <p>
              <p class="text-red-600">
                We do not provide any piercing services. We recommend that you
                contact{" "}
                <a
                  href="https://www.instagram.com/piercingsbyjr/"
                  target="_blank"
                  class="text-blue-600 underline"
                >
                  Piercings Plus LLC
                </a>{" "}
                for piercing related inquiries.
              </p>
            </p>
          </section>
        </article>
      </main>
    </>
  );
}
