import { createRef } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Gun, User } from "@/utils/gun.ts";

export default function Drawing() {
  const gun = Gun.value;
  const user = User.value;

  const signature = createRef();
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    gun
      .user(
        "J5vYLkfFvw2IhQIbqt6RWo27J9F9uyegM6bZ0Zzdq2w.akVKIQdvtR_d37SXEhTPaLCoSpUVuqVEEdhCti9dpII"
      )
      .get("appointments")
      .map()
      .once((data) => {
        console.log(data);
      });

    const ctx = signature.current.getContext("2d");
    ctx.strokeStyle = "#913d88";
    ctx.lineWidth = 2;
  }, []);

  function startDrawing(e) {
    const ctx = signature.current.getContext("2d");
    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(
      e.pageX - signature.current.offsetLeft,
      e.pageY - signature.current.offsetTop
    );
    document.documentElement.style.overflow = "hidden";
  }

  function draw(e) {
    if (isDrawing === true) {
      const ctx = signature.current.getContext("2d");
      var x = e.pageX - signature.current.offsetLeft;
      var y = e.pageY - signature.current.offsetTop;

      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }

  function stopDrawing() {
    setIsDrawing(false);
    document.documentElement.style.overflow = "auto";
  }

  return (
    <canvas
      class="border"
      width="320"
      height="128"
      ref={signature}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
    ></canvas>
  );
}
