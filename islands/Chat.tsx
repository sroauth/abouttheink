import { useEffect, useState } from "preact/hooks";
import { Gun, masterPub, User, uuid } from "@/utils/gun.ts";

interface ChatProps {
  artist: string;
}

export default function Chat(props: ChatProps) {
  const gun = Gun.value;
  const user = User.value;

  const artistEpub =
    "J6v42x_bwGZj5hWeFuvHzusKVL2c0fsxSmdDb_P-JCQ.wUGRt6Tkpq5PQsuKSFAPVHF1sEKJQ8Khepbz_ZVuP7o";

  const [certificate, setCertificate] = useState("");
  const [artistPub, setArtistPub] = useState("");
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!user.is) {
      console.log("Not authenticated. Authenticating now.");

      user.auth({
        pub:
          "fV7p4S-ShYwsz2bujLbt3VzbvNMnk7k5haPVHTAAWwo.DlFTzlXNO-lfeklqqhq7c-j3jHPTLUE2UdgbjqpjdP4",
        priv: "F2turOwiKTt7DiGR4BvFmU__trSi4dmy4ImQfgmQmwY",
        epub:
          "5rTOmqpKfTAYKBYaWK8z92aNgQFquXeL3SjurN63DYY.sgF7nkbRj-UGMve7l0iLwCRW9t-UHbSa9Rdert1lg3E",
        epriv: "JpZnrcQ5QvdebeH8ELK33DZ9Mv4eTGLSmM_ZUYt66fQ",
      });
    }

    gun.user(masterPub).get("artists").get(props.artist).on((artist) => {
      setArtistPub(artist.pub);

      gun.user(artist.pub).get("chat").get(user.pair().pub).map().once(
        async (data, key) => {
          const decryptedMessage = await SEA.decrypt(
            data.message,
            await SEA.secret(artistEpub, user.pair()),
          );

          setMessages((prevState) => {
            const results = prevState.filter((item) => item.id === key);

            if (results.length === 0) {
              return [...prevState, {
                content: decryptedMessage,
                id: key,
                from: data.epub !== user.pair().epub,
                timestamp: data._[">"].message,
              }].sort((a, b) => a.timestamp - b.timestamp);
            } else {
              return prevState;
            }
          });
        },
      );

      gun.user(artist.pub).get("certs").get("chat").once((data) => {
        setCertificate(data);
      });
    });
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    gun.user(artistPub).get("chat").get(user.pair().pub).get(uuid()).put(
      {
        message: await SEA.encrypt(
          message,
          await SEA.secret(artistEpub, user.pair()),
        ),
        epub: user.pair().epub,
      },
      null,
      { opt: { cert: certificate } },
    );

    setMessage("");
  };

  return (
    <div class="chat">
      <ul class="chat__messages">
        {Object.keys(messages).map((key) => (
          <li
            class={`chat__line ${
              messages[key].from ? "chat__line--from" : "chat__line--to"
            }`}
          >
            <div class="chat__bubble">
              {messages[key].content}
            </div>
          </li>
        ))}
      </ul>

      <form class="chat__input" onSubmit={handleSendMessage}>
        <input
          type="text"
          onInput={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button>Send message</button>
      </form>
    </div>
  );
}
