import { useEffect, useState } from "preact/hooks";
import { Gun, User } from "../utils/gun.ts";

export default function ArtistLinks() {
  const gun = Gun.value;
  const user = User.value;

  const [isArtist, setIsArtist] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    gun.user(
      "LQFZBtZY-9YtryPCPpzcJC2VkFVE2_SGiRqGeoRkz6g.HoB8gbywn9WVGqNmgVHL4dXw8AnZbbXN0ZhQwJPFCsE",
    ).get("artists").map().once((data) => {
      if (!user.is?.pub) {
        window.location.href = "/app/login";
      }

      if (user.is.pub === data.pub) {
        setIsArtist(true);
      } else {
        window.location.href = "/app/login";
      }
    });

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
      <ul class="list-disc list-inside pb-4 mb-4 border-b border-black">
        <li>
          <a
            href="/"
            title="Main - About the Ink Tattoos"
            class="text-blue-600 underline"
          >
            Go to the Main page
          </a>
        </li>
        {isArtist
          ? (
            <li>
              <a
                href="/app/catalog"
                title="Dashboard - Transfer Photographs - About the Ink Tattoos"
                class="text-blue-600 underline"
              >
                Manage your catalog
              </a>
            </li>
          )
          : (
            <li class="">
              <span class="bg-black cursor-default">
                Manage your catalog
              </span>
            </li>
          )}
        {isArtist
          ? (
            <li>
              <a
                href="#"
                title="Logout - About the Ink Tattoos"
                class="text-blue-600 underline"
                onClick={handleLeave}
              >
                Nullify your credentials
              </a>
            </li>
          )
          : (
            <li>
              <span class="bg-black cursor-default">
                Nullify your credentials
              </span>
            </li>
          )}
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
