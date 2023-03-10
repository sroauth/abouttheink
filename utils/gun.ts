import { signal } from "@preact/signals";
import GUN from "gun";
import "gun/sea";

// Development
// export const Gun = signal(GUN(["http://192.168.1.68:8765/gun"]));

// Production
export const Gun = signal(
  GUN({ peers: ["https://elderlake.glitch.me/gun"], axe: false })
);

export const User = signal(Gun.value.user().recall({ sessionStorage: true }));

export const getCertificate = (pub, type) => {
  return new Promise((resolve, reject) => {
    Gun.value
      .user(pub)
      .get("certificates")
      .get(type)
      .once((certificate) => {
        resolve(certificate);
      });
  });
};

export const setCertificate = async (path, length) => {
  const certificate = await SEA.certify(
    "*",
    { "*": path, "+": "*" },
    User.value.pair(),
    null,
    { expiry: Date.now() + length }
  );
  User.value.get("certificates").get(path).put(certificate);

  console.log(`Successfully set certificate for path: ${path}`);
};

export const uuid = () => {
  const date = new Date();

  const y = date.getFullYear();
  const m = f0(date.getMonth() + 1);
  const d = f0(date.getDate());
  const hh = f0(date.getHours());
  const mm = f0(date.getMinutes());
  const ss = f0(date.getSeconds());
  const ms = date.getMilliseconds();

  return `${y}/${m}/${d}:${hh}:${mm}:${ss}.${ms}`;
};

export const f0 = (t) => {
  return (t > 9 ? "" : "0") + t;
};
