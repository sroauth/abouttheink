import { useEffect, useState } from "preact/hooks";
import { User, uuid } from "@/utils/gun.ts";

interface ArtistChatProps {
  pub: string;
}

export default function ArtistChat(props: ArtistChatProps) {
  const user = User.value;

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const [userEpub, setUserEpub] = useState(
    "5rTOmqpKfTAYKBYaWK8z92aNgQFquXeL3SjurN63DYY.sgF7nkbRj-UGMve7l0iLwCRW9t-UHbSa9Rdert1lg3E",
  );

  useEffect(() => {
    user.get("chat").get(props.pub).map().on(
      async (data, key) => {
        const decryptedMessage = await SEA.decrypt(
          data.message,
          await SEA.secret(userEpub, user.pair()),
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
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    console.log(message);

    user.get("chat").get(props.pub).get(uuid()).put(
      {
        message: await SEA.encrypt(
          message,
          await SEA.secret(userEpub, user.pair()),
        ),
        epub: user.pair().epub,
      },
    );

    setMessage("");
  };

  return (
    <div class="chat">
      <ul class="chat__messages">
        {messages.map((item) => (
          <li
            class={`chat__line ${
              item.from ? "chat__line--from" : "chat__line--to"
            }`}
          >
            <div class="chat__bubble">
              {item.content}
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
