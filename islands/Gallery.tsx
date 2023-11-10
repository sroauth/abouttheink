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
    <div class="relative grid grid-cols-2 gap-0.5 md:grid-cols-3">
      {items.map((item) => (
        <div class="pt-[100%] relative">
          <a
            href={`https://${item.mediaCid}.ipfs.w3s.link`}
            class="absolute top-0 w-full h-full"
          >
            <img
              src={`https://${item.mediaCid}.ipfs.w3s.link`}
              alt=""
              class="w-full h-full object-cover"
            />
          </a>
        </div>
      ))}
    </div>
  );
}
