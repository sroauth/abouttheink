import { useState } from "preact/hooks";
import { User } from "../utils/gun.ts";

export default function MasterAuth() {
  const user = User.value;

  const [pair, setPair] = useState("");

  function handleAuthenticate(event) {
    event.preventDefault();

    user.auth(JSON.parse(pair), () => {
      window.location.href = "/master/";
    });
  }

  return (
    <form action="#" class="border border-black p-4">
      <textarea
        name="pair"
        id="pair"
        placeholder="Enter master account pair here"
        class="block w-full mb-4"
        onInput={(e) => setPair(e.target.value)}
      />
      <input
        type="submit"
        value="Verify credentials"
        class="bg-gray-200 border border-gray-400 px-1"
        onClick={handleAuthenticate}
      />
    </form>
  );
}
