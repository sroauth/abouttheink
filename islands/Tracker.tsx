import { useEffect, useState } from "preact/hooks";
import { Gun, masterPub } from "@/utils/gun.ts";

interface TrackerProps {
  availableText: string;
  unavailableText: string;
}

interface Artist {
  firstName: string;
  lastName: string;
  pub: string;
}

export default function Tracker(props: TrackerProps) {
  const gun = Gun.value;

  const [artists, setArtists] = useState({});

  useEffect(() => {
    gun.user(masterPub).get("artists").map().once(
      (artistData: Artist, artistId: string) => {
        gun.user(artistData.pub).get("available").on((value: boolean) => {
          setArtists((prevState) => {
            return {
              ...prevState,
              [artistId]: {
                firstName: artistData.firstName,
                lastName: artistData.lastName,
                isAvailable: value,
              },
            };
          });
        });
      },
    );
  }, []);

  const isAvailability = () => {
    return Object.values(artists).filter((artist) => artist.isAvailable)
      .length > 0;
  };

  return (
    <section
      class={`full-width ${isAvailability() ? "bg-orange" : ""}`}
    >
      <h2>Walk-in Availability</h2>
      <p>{isAvailability() ? props.availableText : props.unavailableText}</p>

      <ul class="tracker">
        {Object.keys(artists).map((artistId) =>
          artists[artistId].isAvailable
            ? (
              <li>
                <div>
                  <img
                    src={`/assets/images/${
                      artists[artistId].firstName.toLowerCase()
                    }-${artists[artistId].lastName.toLowerCase()}.jpg`}
                    alt=""
                  />
                  {`${artists[artistId].firstName} ${
                    artists[artistId].lastName
                  }`}
                </div>

                <div>
                  <img src="/assets/images/facebook.svg" alt="" />
                  <img src="/assets/images/instagram.svg" alt="" />
                </div>
              </li>
            )
            : null
        )}
      </ul>

      <p>
        Check regularly during walk-in hours to get live updates. Our artists
        update their status when they are working or become available.
      </p>
    </section>
  );
}
