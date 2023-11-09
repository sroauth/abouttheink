import { useState } from "preact/hooks";
import { Gun, User } from "../utils/gun.ts";

export default function Auth() {
  const gun = Gun.value;
  const user = User.value;

  const [error, setError] = useState("");
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");

  function handleAuthenticate(e) {
    e.preventDefault();

    setError("");
    const errorText =
      "Either unique identifier, passphrase, or both are invalid.";

    gun.user(
      "LQFZBtZY-9YtryPCPpzcJC2VkFVE2_SGiRqGeoRkz6g.HoB8gbywn9WVGqNmgVHL4dXw8AnZbbXN0ZhQwJPFCsE",
    ).get("artists").get(alias).once(async (data) => {
      if (!data) {
        setError(errorText);
        return;
      }

      const pair = await SEA.decrypt(data.pair, password);

      if (!pair) {
        setError(errorText);
        return;
      }

      user.auth(pair, (userReference) => {
        window.location.href = "/app/";
      });
    });
  }

  return (
    <form action="#" class="border border-black p-4">
      <div class="flex items-end mb-4">
        <label for="alias">Unique identifier</label>
        <input
          type="text"
          name="alias"
          id="alias"
          placeholder="johndoe"
          class="flex-grow border-b-2 border-black border-dotted pl-2 outline-none font-mono focus:border-blue-600 focus:text-blue-600"
          onInput={(e) => setAlias(e.target.value)}
        />
      </div>
      <div class="flex items-center mb-4">
        <label for="password">Passphrase</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="********"
          class="flex-grow border-b-2 border-black border-dotted pl-2 outline-none font-mono focus:border-blue-600 focus:text-blue-600"
          onInput={(e) => setPassword(e.target.value)}
        />
      </div>
      <p class="text-red-600 mb-4">{error}</p>
      <input
        type="submit"
        value="Verify credentials"
        class="bg-gray-200 border border-gray-400 px-1"
        onClick={handleAuthenticate}
      />
    </form>
  );
}
