import { useEffect, useState } from "preact/hooks";
import { Gun } from "../utils/gun.ts";

export default function Gallery() {
  const gun = Gun.value;

  const [items, setItems] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString());

  useEffect(() => {
    gun.user(
      "LQFZBtZY-9YtryPCPpzcJC2VkFVE2_SGiRqGeoRkz6g.HoB8gbywn9WVGqNmgVHL4dXw8AnZbbXN0ZhQwJPFCsE",
    ).get("artists").map().once((data) => {
      gun.user(data.pub).get("catalog").map().on((item, key) => {
        if (!item) {
          setItems((prevState) => {
            return prevState.filter((e) => e.key !== key);
          });

          return;
        }

        setItems((prevState) => {
          if (prevState.filter((e) => e.key === key).length > 0) {
            return prevState;
          } else {
            const newState = [...prevState, {
              ...item,
              artist: `${data.firstName} ${data.lastName}`,
              key: key,
            }].sort((a, b) => b["_"][">"].mediaCid - a["_"][">"].mediaCid);

            if (newState.length > 6) {
              newState.splice(6, newState.length - 5);
            }

            setLastUpdated(
              new Date(newState[0]["_"][">"].mediaCid).toLocaleString(),
            );

            return newState;
          }
        });
      });
    });
  }, []);

  return (
    <div>
      <p class="mb-4">
        Last updated {lastUpdated}
      </p>

      <div class="relative grid grid-cols-3 gap-0.5">
        {items.map((item) => (
          <div class="pt-[100%] relative">
            <img
              src={`https://gateway.ipfs.io/ipfs/${item.mediaCid}`}
              alt=""
              class="absolute top-0 w-full h-full object-cover pointer-events-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}