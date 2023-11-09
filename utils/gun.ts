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
