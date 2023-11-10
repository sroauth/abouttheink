import { useEffect, useState } from "preact/hooks";
import { User, uuid } from "../utils/gun.ts";

export default function CatalogManager() {
  const user = User.value;

  const [items, setItems] = useState([]);

  const [fileEntered, setFileEntered] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);

  useEffect(() => {
    user.get("catalog").map().on((item, key) => {
      if (!item) return;

      setItems((prevState) => {
        if (prevState.filter((e) => e.key === key).length > 0) {
          return prevState;
        } else {
          return [...prevState, { ...item, key: key }].sort((a, b) =>
            b["_"][">"].mediaCid - a["_"][">"].mediaCid
          );
        }
      });
    });
  }, []);

  function deleteItem(key) {
    user.get("catalog").get(key).put(null);
  }

  function transition(key) {
    console.log(key);
    window.location.href = `/app/catalog/${encodeURIComponent(key)}`;
  }

  function handleDragOver(event) {
    event.preventDefault();
    setFileEntered(true);
  }

  function handleDrop(event) {
    event.preventDefault();

    if (event.dataTransfer.items) {
      [...event.dataTransfer.items].forEach(async (item, i) => {
        if (item.kind === "file") {
          setIsTransferring(true);

          const thisFile = item.getAsFile();
          console.log(thisFile);
          setFileEntered(false);

          const resp = await fetch("https://api.web3.storage/upload", {
            method: "POST",
            headers: {
              Authorization:
                `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEVhQzY4ZjBENGRGMjE4RUUzMzU3MzVFRWJEMTE0Q0E5NDY0ZTFkODAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTExOTY4ODA3MjUsIm5hbWUiOiJtYXRyaXgifQ.dlgmo-kewygy70SsYHiNsKj1Rg_ulYjYhlGMhgwYdIs`,
            },
            body: thisFile,
          });

          if (!resp.ok) {
            return <h1>An Error occurred</h1>;
          }

          const response = await resp.json();

          console.log(
            response.cid,
          );

          user.get("catalog").get(uuid()).put({
            mediaCid: response.cid,
            comments: "",
          }, () => {
            setIsTransferring(false);
          });
        }
      });
    } else {
      [...event.dataTransfer.files].forEach((thisFile, i) => {
        console.log(thisFile);
        setFileEntered(false);
      });
    }
  }

  async function handleBrowse(event) {
    setIsTransferring(true);

    const resp = await fetch("https://api.web3.storage/upload", {
      method: "POST",
      headers: {
        Authorization:
          `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEVhQzY4ZjBENGRGMjE4RUUzMzU3MzVFRWJEMTE0Q0E5NDY0ZTFkODAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTExOTY4ODA3MjUsIm5hbWUiOiJtYXRyaXgifQ.dlgmo-kewygy70SsYHiNsKj1Rg_ulYjYhlGMhgwYdIs`,
      },
      body: event.target.files[0],
    });

    if (!resp.ok) {
      return <h1>An Error occurred</h1>;
    }

    const response = await resp.json();

    console.log(
      response.cid,
      "",
    );

    user.get("catalog").get(uuid()).put({
      mediaCid: response.cid,
      comments: "",
    }, () => {
      setIsTransferring(false);
    });
  }

  return (
    <div class="relative grid grid-cols-2 gap-0.5 md:grid-cols-3">
      <div class="pt-[100%] relative">
        <div
          class={`border absolute top-0 w-full h-full object-cover p-4 text-center ${
            fileEntered ? "border-blue-600 bg-gray-100" : "border-black"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={() => {
            setFileEntered(false);
          }}
          onDrop={handleDrop}
        >
          {isTransferring ? "Transferring..." : "Drop photo here or"}
          {isTransferring ? null : (
            <div>
              <label for="file" class="border border-gray-400 bg-gray-200 px-1">
                Browse
              </label>
              <input
                type="file"
                id="file"
                name="file"
                class="hidden"
                onChange={handleBrowse}
              />
            </div>
          )}
        </div>
      </div>

      {items.map((item) => (
        <div
          class="pt-[100%] relative"
          onClick={() => transition(item.key)}
        >
          <img
            src={`https://${item.mediaCid}.ipfs.w3s.link`}
            alt=""
            class="absolute top-0 w-full h-full object-cover pointer-events-none"
          />
        </div>
      ))}
    </div>
  );
}
