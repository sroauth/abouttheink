import { useEffect, useState } from "preact/hooks";
import { User } from "../utils/gun.ts";

export default function CatalogItemDetails(props) {
  const user = User.value;

  const [item, setItem] = useState({});

  useEffect(() => {
    user.get("catalog").get(props.itemKey).once((data) => {
      if (!data) return;

      setItem(data);
    });
  }, []);

  function updateCaption(event) {
    user.get("catalog").get(props.itemKey).get("comments").put(
      event.target.value,
    );
  }

  function deleteItem(key) {
    user.get("catalog").get(props.itemKey).put(null, () => {
      window.location.href = "/app/catalog";
    });
  }

  return (
    <div>
      {Object.keys(item).length > 0
        ? (
          <img
            src={`https://gateway.ipfs.io/ipfs/${item.mediaCid}`}
            alt=""
            class="mb-0.5"
          />
        )
        : null}
      <div class="flex gap-0.5">
        <input
          type="text"
          id="test"
          placeholder="Add a Caption"
          class="flex-grow border border-black"
          value={item.comments}
          onInput={updateCaption}
        />
        <button
          class="border border-gray-400 bg-gray-200 px-1"
          onClick={deleteItem}
        >
          Delete catalog item
        </button>
      </div>
    </div>
  );
}
