import { useEffect, useState } from "preact/hooks";
import { getMessage, getProfile, User } from "@/utils/gun.ts";

interface ChatData {
  [key: string]: object;
}

interface ChatInfo {
  firstName: string;
  lastName: string;
  pub: string;
  timestamp: number;
}

export default function Messages() {
  // const gun = Gun.value;
  const user = User.value;

  const [chats, setChats] = useState<ChatInfo[]>([]);

  const parseDate = (input: string) => {
    const parts = /(\d{4})\/(\d{2})\/(\d{2}):(\d{2}):(\d{2}):(\d{2}).(\d+)/
      .exec(input);
    if (!parts) {
      return null;
    }
    const d = parts.slice(1).map((p) => parseInt(p, 10));

    return (new Date(d[0], d[1] - 1, d[2], d[3], d[4], d[5], d[6])).getTime();
  };

  const timeAgo = (timestamp: number) => {
    const currentDate = new Date();
    const inputDate = new Date(timestamp);

    const timeDifference = currentDate.getTime() - inputDate.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return years === 1 ? "a year ago" : `${years} years ago`;
    } else if (months > 0) {
      return months === 1 ? "a month ago" : `${months} months ago`;
    } else if (days > 0) {
      return days === 1 ? "a day ago" : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? "an hour ago" : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? "a minute ago" : `${minutes} minutes ago`;
    } else {
      return seconds === 1 ? "a second ago" : `${seconds} seconds ago`;
    }
  };

  useEffect(() => {
    user.get("chat").map().on(async (chatData: ChatData, pub: string) => {
      // Get the sender's first name, last name, and epub.
      const { firstName, lastName, epub } = await getProfile(pub);

      // Get message keys and sort them by their timestamps.
      const messageKeys = Object.keys(chatData).filter((item) => item !== "_");
      const sortedDates = messageKeys.sort((a, b) =>
        parseDate(b) - parseDate(a)
      );

      // Get the newest message.
      const { message, from } = await getMessage(pub, sortedDates[0], epub);

      setChats((prevState) => {
        const results = prevState.filter((item) => item.pub === pub);

        if (results.length === 0) {
          return [...prevState, {
            firstName,
            lastName,
            message,
            from,
            pub,
            timestamp: parseDate(sortedDates[0]),
          }];
        } else {
          return prevState;
        }
      });
    });
  }, []);

  return (
    <ul class="messages">
      {chats.map((chat) => (
        <li class="messages__item">
          <div class="messages__photo"></div>

          <div class="messages__details">
            <div>
              <a href={`/app/messages/${chat.pub}`}>
                {`${chat.firstName} ${chat.lastName}`}
              </a>
            </div>
            <div>
              {chat.from ? "" : "You: "}
              {chat.message}
            </div>
            <div>
              {timeAgo(chat.timestamp)}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
