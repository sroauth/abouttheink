import { useEffect, useState } from "preact/hooks";
import { Gun, User } from "@/utils/gun.ts";

export default function Appointments() {
  const gun = Gun.value;
  const user = User.value;

  const [items, setItems] = useState({});

  useEffect(() => {
    user
      .get("certificates")
      .get("appointments")
      .once(async (data) => {
        if (data) return;

        const certificate = await SEA.certify(
          "*",
          { "*": "appointments", "+": "*" },
          User.value.pair(),
          null,
          { expiry: Date.now() + 31536000000 }
        );

        user.get("certificates").get("appointments").put(certificate);
      });

    user
      .get("appointments")
      .map()
      .on((data, key) => {
        if (!data) return;

        setItems((items) => {
          const updatedItems = items;

          updatedItems[key] = data;

          return { ...updatedItems };
        });
      });
  }, []);

  function handleClick() {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," +
        encodeURIComponent(JSON.stringify(user._.sea))
    );
    element.setAttribute("download", "keypair.txt");

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  function handleLogout() {
    user.leave();

    if (!user.is) {
      window.location.href = "/login";
    }
  }

  return (
    <div class="flex flex-col gap-5 p-10">
      <div class="flex gap-5">
        <button
          onClick={handleClick}
          class="border-2 border-black py-2 px-4 text-black hover:bg-black hover:text-white active:bg-gray-800 active:border-gray-800"
        >
          Download keypair
        </button>

        <button
          onClick={handleLogout}
          class="border-2 border-black py-2 px-4 text-black hover:bg-black hover:text-white active:bg-gray-800 active:border-gray-800"
        >
          Log out
        </button>
      </div>

      <h2>Appointment Requests</h2>

      <div class="flex">
        {Object.keys(items).map((key) => (
          <div class="border-2 border-black p-5">
            <div>
              {items[key].firstName} {items[key].lastName}
            </div>
            <div>{items[key].dob}</div>
            <div>{items[key].email}</div>
            <div>
              {items[key].phoneNumber} @ {items[key].phoneCarrier}
            </div>
            <div>
              <img
                src={`https://w3s.link/ipfs/${items[key].referencePhotoCid}`}
                alt=""
                class="w-[320px]"
              />
            </div>
            <div>
              {items[key].date}T{items[key].time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
