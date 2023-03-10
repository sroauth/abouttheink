import { useEffect } from "preact/hooks";
import { Gun, User } from "@/utils/gun.ts";

export default function Auth() {
  const gun = Gun.value;
  const user = User.value;

  useEffect(() => {
    if (user.is) {
      console.log("Authenticated");
      window.location.href = "/dashboard";
    }

    gun.on("auth", () => {
      console.log("Authenticated");
      window.location.href = "/dashboard";
    });
  }, []);

  async function handleClick() {
    const pair = await SEA.pair();

    user.auth(pair);
  }

  function handleChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
  }

  function onReaderLoad(event) {
    const pair = JSON.parse(event.target.result);
    user.auth(pair);
  }

  return (
    <div class="p-10">
      <button
        onClick={handleClick}
        class="border-2 border-black py-2 px-4 text-black hover:bg-black hover:text-white active:bg-gray-800 active:border-gray-800"
      >
        Create user
      </button>

      <p class="mt-10">Already have an account? Choose your keypair below.</p>

      <div class="flex items-center gap-2 mt-5">
        <label for="keypair">Keypair:</label>
        <input type="file" onChange={handleChange} />
      </div>
    </div>
  );
}
