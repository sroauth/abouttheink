import { useEffect, useState } from "preact/hooks";
import { User } from "../utils/gun.ts";

export default function ArtistLinks() {
  const user = User.value;

  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (!user.is) {
      window.location.href = "/app/login";
    }

    user.get("available").once((value) => {
      setIsAvailable(value);
    });
  }, []);

  function handleLeave() {
    user.leave();

    if (!user.is) {
      window.location.href = "/app/login";
    }
  }

  function handleOpenToggle(event) {
    setIsAvailable(event.target.checked);
    user.get("available").put(event.target.checked);
  }

  return (
    <div>
      <ul class="pb-4 mb-4 border-b border-black font-mono">
        <li>
          🏠{" "}
          <a
            href="/"
            title="Main - About the Ink Tattoos"
            class="text-blue-600 underline"
          >
            Go to the Main page
          </a>
        </li>
        <li>
          🌄{" "}
          <a
            href="/app/catalog"
            title="Dashboard - Transfer Photographs - About the Ink Tattoos"
            class="text-blue-600 underline"
          >
            Manage your catalog
          </a>
        </li>
        <li>
          💣{" "}
          <a
            href="#"
            title="Logout - About the Ink Tattoos"
            class="text-blue-600 underline"
            onClick={handleLeave}
          >
            Nullify your credentials
          </a>
        </li>
      </ul>

      <h3 class="font-sans font-bold text-3xl mb-4">
        <small class="block text-xl">Realtime</small> Availability
      </h3>

      <div>
        <input
          type="checkbox"
          name="availability"
          id="availability"
          class="appearance-none border-2 border-black w-3 h-3 checked:bg-black"
          checked={isAvailable}
          onChange={handleOpenToggle}
        />{" "}
        <label for="availability">I am available for walk-ins</label>
      </div>
    </div>
  );
}
