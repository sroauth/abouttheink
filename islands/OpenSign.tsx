import { useEffect, useState } from "preact/hooks";
import { Gun } from "../utils/gun.ts";

export default function OpenSign() {
  const gun = Gun.value;

  // const [availabilityRetrieved, setAvailabilityRetrieved] = useState(false);
  // const [isAvailable, setIsAvailable] = useState(false);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    gun.user(
      "LQFZBtZY-9YtryPCPpzcJC2VkFVE2_SGiRqGeoRkz6g.HoB8gbywn9WVGqNmgVHL4dXw8AnZbbXN0ZhQwJPFCsE",
    ).get("artists").map().once((data) => {
      gun.user(data.pub).get("available").on((value) => {
        // setIsAvailable(value);
        // setAvailabilityRetrieved(true);

        setArtists((prevState) => {
          if (value) {
            if (!prevState.includes(`${data.firstName} ${data.lastName}`)) {
              return [...prevState, `${data.firstName} ${data.lastName}`];
            } else {
              return prevState;
            }
          } else {
            if (prevState.includes(`${data.firstName} ${data.lastName}`)) {
              return prevState.filter((item) =>
                item !== `${data.firstName} ${data.lastName}`
              );
            } else {
              return prevState;
            }
          }
        });
      });
    });
  }, []);

  return (
    <div class="mb-4">
      <details open={artists.length > 0}>
        <summary
          class={`font-sans p-4 font-bold text-xl ${
            artists.length > 0
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {artists.length > 0
            ? "Artists available for walk-ins"
            : "No artists available for walk-ins"}
        </summary>
        <ul class="list-disc list-inside border-l border-b border-r border-gray-400 p-2 pl-5">
          {artists.map((item) => (
            <li>
              <a
                href={`#Artist_${item.replace(" ", "_")}`}
                class="text-blue-600 underline"
              >
                {item}
              </a>{" "}
              {"<- "}
              <span>
                Click to contact
              </span>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
