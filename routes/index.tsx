import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Tracker from "@/islands/Tracker.tsx";
import sharedLangData from "@/lang/shared.json" assert { type: "json" };
import langData from "@/lang/index.json" assert { type: "json" };

interface Data {
  lang: string;
}

interface Translations {
  [key: string]: { [key: string]: string };
}

export const handler: Handlers = {
  GET(req, ctx) {
    return ctx.render({ lang: req.headers.get("accept-language") });
  },
};

export default function Home({ data }: PageProps<Data>) {
  const lang = data.lang.split(",")[0];

  const translations: Translations = { ...sharedLangData, ...langData };

  const hours = {
    sunday: {
      day: translations["sunday"][lang],
      hours: translations["closed"][lang],
    },
    monday: {
      day: translations["monday"][lang],
      hours: "12:00 PM - 6:00 PM",
    },
    tuesday: {
      day: translations["tuesday"][lang],
      hours: translations["closed"][lang],
    },
    wednesday: {
      day: translations["wednesday"][lang],
      hours: "12:00 PM - 6:00 PM",
    },
    thursday: {
      day: translations["thursday"][lang],
      hours: "12:00 PM - 6:00 PM",
    },
    friday: {
      day: translations["friday"][lang],
      hours: "12:00 PM - 6:00 PM",
    },
    saturday: {
      day: translations["saturday"][lang],
      hours: "12:00 PM - 6:00 PM",
    },
  };

  const today = (new Date()).getDay();

  const getLocaleDateString = (year: number, month: number, date: number) => {
    return (new Date(year, month, date)).toLocaleDateString(lang, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Head>
        <title>About the Ink: {translations["subtitle"][lang]}</title>
      </Head>

      <main class="content-grid">
        <hgroup>
          <h1>About the Ink</h1>

          <p>{translations["subtitle"][lang]}</p>

          <p>
            <small>
              {translations["last_updated"][lang]}{" "}
              <time datetime="2023-12-13">
                {getLocaleDateString(2023, 11, 13)}
              </time>
            </small>
          </p>
        </hgroup>

        <nav aria-labelledby="table-of-contents">
          <h2 id="table-of-contents">
            {translations["table_of_contents--header"][lang]}
          </h2>

          <ol class="table-of-contents">
            <li>
              <span class="emoji" aria-hidden="true">🚶{" "}</span>

              <a href="#Walk-in_Hours">
                {translations["walk-in_hours--header"][lang]}
              </a>
            </li>

            <li>
              <span class="emoji" aria-hidden="true">💬{" "}</span>

              <a href="#Contact_Us">
                {translations["contact_us--header"][lang]}
              </a>
            </li>

            <li>
              <span class="emoji" aria-hidden="true">🧑‍🎨{" "}</span>

              <a href="#Our_Artists">
                {translations["our_artists--header"][lang]}
              </a>
            </li>

            <li>
              <span class="emoji" aria-hidden="true">🚫{" "}</span>

              <a href="#Piercing_Services">
                {translations["piercing_services--header"][lang]}
              </a>
            </li>

            <li>
              <span class="emoji" aria-hidden="true">📄{" "}</span>

              <a href="/documents/tattoo-aftercare-instructions">
                {translations["aftercare-instructions"][lang]}
              </a>
            </li>
          </ol>
        </nav>

        <Tracker
          availableText={translations["walk-in_artists--available"][lang]}
          unavailableText={translations["walk-in_artists--unavailable"][lang]}
        />

        <section id="Walk-in_Hours">
          <h2>{translations["walk-in_hours--header"][lang]}</h2>

          <p>{translations["walk-in_hours--intro"][lang]}</p>

          <table class="hours-of-operation">
            <tbody>
              {Object.keys(hours).map((day, index) => (
                <tr class={index === today ? "active" : ""}>
                  <td>
                    <span aria-hidden="true">
                      <img
                        src={`/assets/images/${day}.svg`}
                        alt=""
                      />
                      {" "}
                    </span>

                    <span>{hours[day].day}</span>
                  </td>

                  <td>
                    <span>{hours[day].hours}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section id="Contact_Us">
          <h2>{translations["contact_us--header"][lang]}</h2>

          <p>{translations["contact_us--intro"][lang]}</p>

          <address>
            <span class="emoji" aria-hidden="true">☎️{" "}</span>
            {translations["call"][lang]}{" "}
            <a href="tel:+13017055781">(301) 705-5781</a>.<br />
            <span class="emoji" aria-hidden="true">📧{" "}</span>
            {translations["email"][lang]}{" "}
            <a href="mailto:abouttheink@gmail.com">
              abouttheink@gmail.com
            </a>.<br />
            <span class="emoji" aria-hidden="true">📍{" "}</span>
            {translations["visit"][lang]}:<br />
            <div class="pl-8">
              <a href="maps:?saddr=Current%20Location&daddr=4433%20Crain%20Highway%20White%20Plains%20MD%2020695%20United%20States">
                4433 Crain <abbr title="Highway">Hwy</abbr>
                <br />White Plains, <abbr title="Maryland">MD</abbr> 20695
              </a>
            </div>
            <span class="emoji" aria-hidden="true">🐞{" "}</span>
            {translations["notice_bug"][lang]}{" "}
            <a href="mailto:sabastian@abouttheink.com">
              {translations["email_webmaster"][lang]}
            </a>.
          </address>
        </section>

        <section id="Our_Artists">
          <h2>{translations["our_artists--header"][lang]}</h2>

          <p>{translations["our_artists--intro"][lang]}</p>

          <ul class="artists">
            <li>
              <img src="/assets/images/jason-auth.jpg" alt="" />

              <div class="artist-details">
                <h3>Jason Auth</h3>

                <div class="contact-button">
                  <img src="/assets/images/facebook.svg" alt="" />

                  <a href="https://m.me/abouttheinktattoos" target="_blank">
                    Facebook
                  </a>
                </div>

                <div class="contact-button">
                  <img src="/assets/images/instagram.svg" alt="" />

                  <a href="https://ig.me/m/abouttheinktattoos" target="_blank">
                    Instagram
                  </a>
                </div>
              </div>
            </li>

            <li>
              <img src="/assets/images/ashley-cooksey.jpg" alt="" />

              <div class="artist-details">
                <h3>Ashley Cooksey</h3>

                <div class="contact-button">
                  <img src="/assets/images/facebook.svg" alt="" />

                  <a
                    href="https://www.facebook.com/ashley.cooksey.5/posts/pfbid08da8LWKEkfvFRts3XZvF2CTzdSbfctqJezko2A8BVvcdg7DQ4v7Xj6YZ21Nm6mYml"
                    target="_blank"
                  >
                    Facebook
                  </a>
                </div>

                <div class="contact-button">
                  <img src="/assets/images/instagram.svg" alt="" />

                  <a
                    href="https://www.instagram.com/p/CtBxGr-LjbI/"
                    target="_blank"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </li>

            <li>
              <img src="/assets/images/sabastian-auth.jpg" alt="" />

              <div class="artist-details">
                <h3>Sabastian Auth</h3>

                <div class="contact-button">
                  <img src="/assets/images/facebook.svg" alt="" />

                  <a href="https://m.me/abouttheinktattoos" target="_blank">
                    Facebook
                  </a>
                </div>

                <div class="contact-button">
                  <img src="/assets/images/instagram.svg" alt="" />

                  <a href="https://ig.me/m/sabastianauth" target="_blank">
                    Instagram
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </section>

        <section id="Piercing_Services">
          <h2>{translations["piercing_services--header"][lang]}</h2>

          <p>
            {translations["piercing_services--intro"][lang]}{" "}
            <a href="https://www.instagram.com/piercingsbyjr/" target="_blank">
              Piercings Plus
            </a>.
          </p>
        </section>
      </main>
    </>
  );
}
