import { useEffect, useState } from "preact/hooks";
import { User } from "../utils/gun.ts";

export default function ArtistForm() {
  const user = User.value;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    user.get("artists").map().once((data, key) => {
      setArtists((prevState) => {
        console.log([...prevState, data]);
        return [...prevState, data];
      });
    });
  }, []);

  async function handleAddArtist() {
    const alias = firstName.toLowerCase() + lastName.toLowerCase();
    const pair = await SEA.pair();
    const encryptedPair = await SEA.encrypt(pair, password);

    user.get("artists").get(alias).put({
      pub: pair.pub,
      firstName: firstName,
      lastName: lastName,
      pair: encryptedPair,
    }, (ack) => {
      if (ack.err) {
        console.log(ack.err);
      } else {
        console.log("Success!");
      }
    });
  }

  function handleLeave() {
    user.leave();

    if (!user.is) {
      window.location.href = "/master/login";
    }
  }

  return (
    <div class="flex flex-col gap-4">
      <div class="border-b border-black pb-4 mb-4">
        <button
          class="border border-gray-400 bg-gray-200 px-1"
          onClick={handleLeave}
        >
          Nullify credentials
        </button>
      </div>

      <div class="flex items-center gap-4">
        <label for="firstName">First name:</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="John"
          class="flex-grow border px-4 py-2"
          value={firstName}
          onKeyPress={(e) => {
            if (e.key === " ") {
              e.preventDefault();
            }
          }}
          onInput={(e) => {
            setFirstName(
              e.target.value.charAt(0).toUpperCase() +
                e.target.value.slice(1, e.target.value.length),
            );
          }}
        />
      </div>
      <div class="flex items-center gap-4">
        <label for="lastName">Last name:</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Doe"
          class="flex-grow border px-4 py-2"
          value={lastName}
          onKeyPress={(e) => {
            if (e.key === " ") {
              e.preventDefault();
            }
          }}
          onInput={(e) => {
            setLastName(
              e.target.value.charAt(0).toUpperCase() +
                e.target.value.slice(1, e.target.value.length),
            );
          }}
        />
      </div>
      <div class="flex items-center gap-4">
        <label for="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          class="flex-grow border px-4 py-2"
          onInput={(e) => setPassword(e.target.value)}
        />
      </div>
      <button class="bg-yellow-400 px-4 py-2" onClick={handleAddArtist}>
        Add artist
      </button>

      <div>
        {artists.map((item) => <div>{item.firstName + " " + item.lastName}
        </div>)}
      </div>
    </div>
  );
}
