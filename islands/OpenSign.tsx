import { useEffect, useState } from "preact/hooks";
import { Gun, masterPub } from "../utils/gun.ts";

interface Artist {
  pub: string;
  firstName: string;
  lastName: string;
}

export default function OpenSign() {
  const gun = Gun.value;

  const [artists, setArtists] = useState<Array<string>>([]);

  const socials = {
    "Jason Auth": {
      instagram: "https://ig.me/m/abouttheinktattoos",
      facebook: "https://m.me/abouttheinktattoos",
    },
    "Sabastian Auth": {
      instagram: "https://ig.me/m/sabastianauth",
      facebook: "https://m.me/abouttheinktattoos",
    },
  };

  useEffect(() => {
    gun.user(masterPub).get("artists").map().once((artist: Artist) => {
      gun.user(artist.pub).get("available").on((isAvailable: boolean) => {
        setArtists((prevState: Array<string>) => {
          const name = `${artist.firstName} ${artist.lastName}`;
          const isListed = prevState.filter((e) => e === name).length > 0;

          return !isAvailable
            ? prevState.filter((e) => e !== name)
            : !isListed
            ? [...prevState, name]
            : prevState;
        });
      });
    });
  }, []);

  return (
    <details open={artists.length > 0}>
      <summary
        class={`font-sans p-2 font-bold ${
          artists.length > 0
            ? "bg-green-600 text-white"
            : "bg-red-600 text-white"
        }`}
      >
        {artists.length > 0
          ? "Artists available for walk-ins"
          : "No artists available for walk-ins"}
      </summary>

      <ul class="border border-green-800">
        {artists.map((item) => (
          <li class="flex items-center justify-between gap-0.5 p-0.5 border border-green-800">
            <div class="flex items-center gap-1">
              <img
                src={`/images/artists/${
                  item.toLowerCase().replace(" ", "-")
                }.jpg`}
                class="w-8 h-8"
              />
              <a
                href={`#Artist_${item.replace(" ", "_")}`}
                class="text-blue-600 underline"
              >
                {`${item.split(" ")[0]} (Contact)`}
              </a>
            </div>

            <div class="flex gap-0.5">
              <a
                href={socials[item].instagram}
                target="_blank"
                class="flex items-center justify-center bg-[#ff0176] w-8 h-8"
              >
                <img
                  src="/images/glyphs/instagram.svg"
                  class="w-[29px] h-[29px]"
                />
              </a>
              <a
                href={socials[item].facebook}
                target="_blank"
                class="flex items-center justify-center bg-[#3465aa] w-8 h-8"
              >
                <img
                  src="/images/glyphs/facebook.svg"
                  class="w-[29px] h-[29px]"
                />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </details>
  );
}
