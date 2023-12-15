import type { Signal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";
import { authenticate, User } from "@/utils/gun.ts";

interface PageProps {
  index: Signal<number>;
}

export default function Counter(props: PageProps) {
  const user = User.value;

  const [startX, setStartX] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(async () => {
    const jsonPair = localStorage.getItem("pair");

    if (!user.is) {
      if (jsonPair) {
        const pair = JSON.parse(jsonPair);
        await authenticate(pair);
      } else {
        window.location.href = "/app/login";
      }
    }

    user.get("available").once((data: boolean) => {
      setIsAvailable(data);
    });
  }, []);

  const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
  };

  const handleTouchStart = (e) => {
    e.currentTarget.classList.remove("toggle__handle--animated");

    setStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isAvailable) {
      const diff = clamp(
        e.changedTouches[0].clientX - startX,
        0,
        e.currentTarget.offsetWidth,
      );
      e.currentTarget.setAttribute(
        "style",
        `transform: translate(${diff}px, 0)`,
      );
    } else {
      const diff = clamp(
        startX - e.changedTouches[0].clientX,
        0,
        e.currentTarget.offsetWidth,
      );
      e.currentTarget.setAttribute(
        "style",
        `transform: translate(${e.currentTarget.offsetWidth - diff}px, 0)`,
      );
    }
  };

  const handleTouchEnd = (e) => {
    const elementWidth = e.currentTarget.offsetWidth;
    const parentWidth = e.currentTarget.parentElement.offsetWidth;
    const position = e.changedTouches[0].clientX - startX;

    e.currentTarget.classList.add("toggle__handle--animated");

    if (position + (elementWidth / 2) > parentWidth / 2) {
      setStartX(elementWidth);
      e.currentTarget.setAttribute(
        "style",
        `transform: translate(${elementWidth}px, 0)`,
      );
      setIsAvailable(true);
      user.get("available").put(true);
    } else {
      setStartX(0);
      e.currentTarget.setAttribute("style", `transform: translate(0, 0)`);
      setIsAvailable(false);
      user.get("available").put(false);
    }
  };

  return props.index.value === 0
    ? <p>Home</p>
    : (
      <div class={`open-sign ${isAvailable ? "open-sign--available" : ""}`}>
        <div>
          <div class="container">
            <div class="fancy-bulb">
              <div class="left-streaks streaks"></div>
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 275.3 413.3"
                enable-background="new 0 0 275.3 413.3"
              >
                <g id="off">
                  <path
                    fill="#E2ECF1"
                    d="M137.7,13.7C67.2,13.7,10,70.9,10,141.4c0,58.3,72.8,118.2,79.9,162.3h47.8h47.8
						  c7.1-44,79.9-103.9,79.9-162.3C265.3,70.9,208.2,13.7,137.7,13.7z"
                  />
                </g>
                <g id="on">
                  <path
                    fill="#FFDB55"
                    d="M137.7,13.7C67.2,13.7,10,70.9,10,141.4c0,58.3,72.8,118.2,79.9,162.3h47.8h47.8
						  c7.1-44,79.9-103.9,79.9-162.3C265.3,70.9,208.2,13.7,137.7,13.7z"
                  />
                </g>

                <g id="outline">
                  <path
                    fill="#F1F2F2"
                    stroke="#38434A"
                    stroke-width="19.1022"
                    stroke-miterlimit="10"
                    d="M168.5,375.5h-61.7c-8.9,0-16-7.2-16-16
						  v-55.8h93.8v55.8C184.6,368.3,177.4,375.5,168.5,375.5z"
                  />
                  <path
                    fill="#F1F2F2"
                    stroke="#38434A"
                    stroke-width="19.1022"
                    stroke-miterlimit="10"
                    d="M151.2,401.5h-27.1c-3.9,0-7-3.2-7-7v-19
						  h41.1v19C158.2,398.4,155.1,401.5,151.2,401.5z"
                  />
                  <line
                    fill="none"
                    stroke="#38434A"
                    stroke-width="19.1022"
                    stroke-miterlimit="10"
                    x1="184.6"
                    y1="339.6"
                    x2="90.8"
                    y2="339.6"
                  />
                  <path
                    fill="none"
                    stroke="#38434A"
                    stroke-width="19.1022"
                    stroke-miterlimit="10"
                    d="M137.7,13.7C67.2,13.7,10,70.9,10,141.4
						  c0,58.3,72.8,118.2,79.9,162.3h47.8h47.8c7.1-44,79.9-103.9,79.9-162.3C265.3,70.9,208.2,13.7,137.7,13.7z"
                  />
                </g>
                <g id="highlight">
                  <path
                    fill="#FFDB55"
                    stroke="#FFFFFF"
                    stroke-width="21.0124"
                    stroke-linecap="round"
                    stroke-miterlimit="10"
                    d="M207.1,89.5
						  c-12.3-16.1-28.4-29.1-46.9-37.8"
                  />
                  <path
                    fill="#FFDB55"
                    stroke="#FFFFFF"
                    stroke-width="21.0124"
                    stroke-linecap="round"
                    stroke-miterlimit="10"
                    d="M225,121.4
						  c-0.8-2.2-1.8-4.4-2.7-6.5"
                  />
                </g>
              </svg>
              <div class="right-streaks streaks"></div>
            </div>
          </div>

          <p class="open-sign__title">
            {isAvailable
              ? "You are available for walk-ins"
              : "You are unavailable at the moment"}
          </p>
          <p>
            You are not visible for walk-ins. Mark yourself as available to
            receive walk-in requests.
          </p>

          <div class="toggle">
            <div
              class="toggle__handle"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              Available
            </div>
          </div>
        </div>
      </div>
    );
}
