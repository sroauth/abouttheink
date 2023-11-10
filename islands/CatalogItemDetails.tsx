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
    if (confirm("Are you sure you want to delete this photo?")) {
      user.get("catalog").get(props.itemKey).put(null, () => {
        window.location.href = "/app/catalog";
      });
    }
  }

  return Object.keys(item).length > 0
    ? (
      <div>
        <div class="flex gap-0.5 mb-0.5">
          <input
            type="text"
            id="test"
            placeholder="Add a Caption"
            class="flex-grow border border-black rounded-none"
            value={item.comments}
            onInput={updateCaption}
          />
          <button
            class="border border-red-400 bg-red-200 text-red-900 px-1"
            onClick={deleteItem}
          >
            Delete
          </button>
        </div>

        <img
          src={`https://${item.mediaCid}.ipfs.w3s.link`}
        />
      </div>
    )
    : <div></div>;
}
