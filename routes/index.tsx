import { Head } from "$fresh/runtime.ts";
import Gallery from "../islands/Gallery.tsx";
import OpenSign from "../islands/OpenSign.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Main - About the Ink Tattoos</title>
        <link rel="stylesheet" href="/shared.css" />
      </Head>

      <div class="max-w-[34em] mx-auto font-serif leading-normal p-4">
        <header>
          <h1 class="font-sans font-bold text-7xl mb-4">
            <small class="block text-4xl">About the Ink</small> Tattoos
          </h1>

          <h2 class="font-sans font-light text-2xl mb-4">
            Rendering the art of tattoos for more than 30 years
          </h2>
        </header>

        <nav>
          <ul class="list-disc list-inside mb-4">
            <li>
              <a
                href="#Regular_walk-in_hours_of_operation"
                class="text-blue-600 underline"
              >
                Regular Walk-in Hours of Operation
              </a>
            </li>
            <li>
              <a
                href="#About_the_ink_tattoos_contact_information"
                class="text-blue-600 underline"
              >
                About the Ink Tattoos Contact Information
              </a>
            </li>
            <li>
              <a
                href="#View_our_artists"
                class="text-blue-600 underline"
              >
                View Our Artists
              </a>
            </li>
            <li>
              <a
                href="#The_latest_designs_executed_by_our_artists"
                class="text-blue-600 underline"
              >
                The Latest Designs Executed by Our Artists
              </a>
            </li>
            <li>
              <a
                href="#Important_note_regarding_piercings"
                class="text-red-600 underline"
              >
                ‼️ Important Note Regarding Piercings
              </a>
            </li>
            <li>
              <a
                href="/documents/tattoo-aftercare-instructions"
                class="text-blue-600 underline"
              >
                Tattoo Aftercare Instructions
              </a>
            </li>
          </ul>
        </nav>

        <section>
          <article class="border-b border-black pb-4 mb-4">
            <OpenSign />
            <p>
              <em>Availability is updated in realtime.</em>
            </p>
          </article>

          <article
            id="Regular_walk-in_hours_of_operation"
            class="border-b border-black pb-4 mb-4"
          >
            <h3 class="font-sans font-bold text-3xl mb-4">
              <small class="block text-xl">Regular Walk-in</small>{" "}
              Hours of Operation
            </h3>

            <table class="border border-black w-full mb-4">
              <thead class="bg-gray-200 border-b border-black">
                <tr class="text-left">
                  <th class="border-r border-black px-1">Day</th>
                  <th class="px-1">Hours</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-black">
                  <td class="border-r border-black px-1">Monday</td>
                  <td class="px-1">12:00 PM - 6:00 PM</td>
                </tr>
                <tr class="bg-gray-100 border-b border-black">
                  <td class="border-r border-black px-1">Tuesday</td>
                  <td class="px-1">Closed</td>
                </tr>
                <tr class="border-b border-black">
                  <td class="border-r border-black px-1">Wednesday</td>
                  <td class="px-1">12:00 PM - 6:00 PM</td>
                </tr>
                <tr class="bg-gray-100 border-b border-black">
                  <td class="border-r border-black px-1">Thursday</td>
                  <td class="px-1">12:00 PM - 6:00 PM</td>
                </tr>
                <tr class="border-b border-black">
                  <td class="border-r border-black px-1">Friday</td>
                  <td class="px-1">12:00 PM - 6:00 PM</td>
                </tr>
                <tr class="bg-gray-100 border-b border-black">
                  <td class="border-r border-black px-1">Saturday</td>
                  <td class="px-1">12:00 PM - 6:00 PM</td>
                </tr>
                <tr>
                  <td class="border-r border-black px-1">Sunday</td>
                  <td class="px-1">Closed</td>
                </tr>
              </tbody>
            </table>
          </article>

          <article id="About_the_ink_tattoos_contact_information">
            <h3 class="font-sans font-bold text-3xl mb-4">
              <small class="block text-xl">About the Ink Tattoos</small>{" "}
              Contact Information
            </h3>

            <address class="border-b border-black pb-4 mb-4">
              🌎 You can contact our artists at{" "}
              <a
                href="https://abouttheink.com/contact"
                title="Contact - About the Ink Tattoos"
                class="text-blue-600 underline"
              >
                abouttheink.com/contact
              </a>.<br />
              ☎️ You can call us at{" "}
              <a href="tel:+13017055781" class="text-blue-600 underline">
                (301) 705-5781
              </a>.<br />
              📧 If you see any bugs, please{" "}
              <a
                href="mailto:abouttheink@gmail.com"
                class="text-blue-600 underline"
              >
                contact the webmaster
              </a>.<br />
              You may also want to visit us:<br />
              <a
                href="maps:?saddr=Current Location&daddr=4433 Crain Highway White Plains MD 20695 United States"
                class="text-blue-600 underline"
              >
                4433 Crain Highway<br />
                White Plains, MD 20695
              </a>
            </address>
          </article>

          <article
            id="View_our_artists"
            class="border-b border-black pb-4 mb-4"
          >
            <h3 class="font-sans font-bold text-3xl mb-4">
              <small class="block text-xl">View</small> Our Artists
            </h3>

            <div class="grid grid-cols-3 border-x border-black">
              <div class="text-center px-4 border-r border-black">
                <img
                  src="/images/artists/jason-auth.jpg"
                  alt=""
                  class="block w-full mb-4"
                />
                <p class="text-lg mb-4">Jason Auth</p>
                <p>
                  Click one of the social icons below to contact this artist.
                </p>
                <div class="flex justify-evenly gap-4">
                  <a
                    href="https://instagram.com/abouttheinktattoos"
                    target="_blank"
                    class="flex items-center justify-center bg-[#ff0176] w-[48px] h-[48px]"
                  >
                    <img
                      src="/images/glyphs/instagram.svg"
                      alt=""
                      width="29"
                      height="29"
                    />
                  </a>
                  <a
                    href="https://facebook.com/abouttheinktattoos"
                    target="_blank"
                    class="flex items-center justify-center bg-[#3465aa] w-[48px] h-[48px]"
                  >
                    <img
                      src="/images/glyphs/facebook.svg"
                      alt=""
                      width="29"
                      height="29"
                    />
                  </a>
                </div>
              </div>

              <div class="text-center px-4 border-r border-black">
                <img
                  src="/images/artists/ashley-cooksey.jpg"
                  alt=""
                  class="block w-full mb-4"
                />
                <p class="text-lg mb-4">Ashley Cooksey</p>
                <p>
                  Click one of the social icons below to contact this artist.
                </p>
                <div class="flex justify-evenly gap-4">
                  <a
                    href="https://instagram.com/tattoosbyashleyrose"
                    target="_blank"
                    class="flex items-center justify-center bg-[#ff0176] w-[48px] h-[48px]"
                  >
                    <img
                      src="/images/glyphs/instagram.svg"
                      alt=""
                      width="29"
                      height="29"
                    />
                  </a>
                  <a
                    href="https://facebook.com/ashley.cooksey.5"
                    target="_blank"
                    class="flex items-center justify-center bg-[#3465aa] w-[48px] h-[48px]"
                  >
                    <img
                      src="/images/glyphs/facebook.svg"
                      alt=""
                      width="29"
                      height="29"
                    />
                  </a>
                </div>
              </div>

              <div class="text-center px-4">
                <img
                  src="/images/artists/sabastian-auth.jpg"
                  alt=""
                  class="block w-full mb-4"
                />
                <p class="text-lg mb-4">Sabastian Auth</p>
                <p>
                  Click one of the social icons below to contact this artist.
                </p>
                <div class="flex justify-evenly gap-4">
                  <a
                    href="https://instagram.com/sabastianauth"
                    target="_blank"
                    class="flex items-center justify-center bg-[#ff0176] w-[48px] h-[48px]"
                  >
                    <img
                      src="/images/glyphs/instagram.svg"
                      alt=""
                      width="29"
                      height="29"
                    />
                  </a>
                  <a
                    href="https://facebook.com/abouttheinktattoos"
                    target="_blank"
                    class="flex items-center justify-center bg-[#3465aa] w-[48px] h-[48px]"
                  >
                    <img
                      src="/images/glyphs/facebook.svg"
                      alt=""
                      width="29"
                      height="29"
                    />
                  </a>
                </div>
              </div>
            </div>
          </article>

          <article
            id="The_latest_designs_executed_by_our_artists"
            class="border-b border-black pb-4 mb-4"
          >
            <h3 class="font-sans font-bold text-3xl mb-4">
              <small class="block text-xl">The Latest</small>{" "}
              Designs Executed by Our Artists
            </h3>

            <Gallery />
          </article>

          <article
            id="Important_note_regarding_piercings"
            class="border-b border-black pb-4 mb-4"
          >
            <h3 class="font-sans font-bold text-3xl mb-4">
              <small class="block text-xl">Important Note</small>Regarding
              Piercings
            </h3>
            <p>
              <strong class="text-red-600">
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
              </strong>
            </p>
          </article>
        </section>

        <section>
          <article>
            <h3 class="font-sans font-bold text-3xl mb-4">
              <small class="block text-xl">Links for Artists</small>
            </h3>

            <ul class="list-disc list-inside">
              <li>
                <a href="/app/" class="text-blue-600 underline">
                  Go to the Dashboard page
                </a>
              </li>
            </ul>
          </article>
        </section>
      </div>
    </>
  );
}
