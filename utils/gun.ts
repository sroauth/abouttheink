import { signal } from "@preact/signals";
import GUN from "gun";
import "gun/sea";

// export const Gun = signal(GUN(["http://127.0.0.1:8765/gun"]));
export const Gun = signal(GUN(["https://elderlake.glitch.me/gun"]));

export const User = signal(Gun.value.user().recall({ sessionStorage: true }));

Gun.value.on("auth", () => {
  console.log("Authenticated!");
});

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

export const masterPub =
  "LQFZBtZY-9YtryPCPpzcJC2VkFVE2_SGiRqGeoRkz6g.HoB8gbywn9WVGqNmgVHL4dXw8AnZbbXN0ZhQwJPFCsE";

interface Pair {
  pub: string;
  priv: string;
  epub: string;
  epriv: string;
}

export const authenticate = (pair: Pair) => {
  return new Promise((resolve) => {
    User.value.auth(pair, (userReference) => {
      resolve(userReference);
    });
  });
};

interface ProfileData {
  firstName: string;
  lastName: string;
  epub: string;
  _: object;
}

export const getProfile = (pub: string) => {
  return new Promise((resolve) => {
    Gun.value.user(pub).get("profile").once((profileData: ProfileData) => {
      resolve({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        epub: profileData.epub,
      });
    });
  });
};

export const getMessage = (pub: string, key: string, epub: string) => {
  return new Promise((resolve) => {
    User.value.get("chat").get(pub).get(key).once(async (data) => {
      const secret = await SEA.secret(epub, User.value.pair());

      const decryptedMessage = await SEA.decrypt(data.message, secret);

      resolve({
        message: decryptedMessage,
        from: data.epub !== User.value.pair().epub,
      });
    });
  });
};
