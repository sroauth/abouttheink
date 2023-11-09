import { useSignal } from "@preact/signals";
import { useState } from "preact/hooks";
import { Gun, User, uuid } from "../utils/gun.ts";

export default function Form() {
  const gun = Gun.value;
  const user = User.value;

  const fileEntered = useSignal(false);
  const fileUrl = useSignal("");

  const [file, setFile] = useState(null);
  const [isTransferring, setIsTransferring] = useState(false);

  function handleDragOver(event) {
    event.preventDefault();

    fileEntered.value = true;
  }

  function handleDrop(event) {
    event.preventDefault();

    if (event.dataTransfer.items) {
      [...event.dataTransfer.items].forEach((item, i) => {
        if (item.kind === "file") {
          const thisFile = item.getAsFile();
          setFile(thisFile);
          fileEntered.value = false;

          const reader = new FileReader();
          reader.onload = (
            function (theFile) {
              return function (e) {
                fileUrl.value = e.target.result;
              };
            }
          )(thisFile);
          reader.readAsDataURL(thisFile);
        }
      });
    } else {
      [...event.dataTransfer.files].forEach((thisFile, i) => {
        console.log(thisFile);
        fileEntered.value = false;
      });
    }
  }

  function handleCancel() {
    fileUrl.value = "";
  }

  async function uploadFile(event) {
    event.preventDefault();

    setIsTransferring(true);

    const resp = await fetch("https://api.web3.storage/upload", {
      method: "POST",
      headers: {
        Authorization:
          `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEVhQzY4ZjBENGRGMjE4RUUzMzU3MzVFRWJEMTE0Q0E5NDY0ZTFkODAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTExOTY4ODA3MjUsIm5hbWUiOiJtYXRyaXgifQ.dlgmo-kewygy70SsYHiNsKj1Rg_ulYjYhlGMhgwYdIs`,
      },
      body: file,
    });

    if (!resp.ok) {
      return <h1>An Error occurred</h1>;
    }

    const response = await resp.json();

    console.log(
      response.cid,
      event.target.comments.value,
    );

    setIsTransferring(false);
    fileUrl.value = "";

    user.get("catalog").get(uuid()).put({
      mediaCid: response.cid,
      comments: event.target.comments.value,
    });
  }

  function handleChange(event) {
    setFile(event.target.files[0]);

    const reader = new FileReader();
    reader.onload = (
      function (theFile) {
        return function (e) {
          fileUrl.value = e.target.result;
        };
      }
    )(event.target.files[0]);
    reader.readAsDataURL(event.target.files[0]);
  }

  return (
    <form action="#" id="form" onSubmit={uploadFile}>
      {fileUrl.value
        ? (
          <div class="relative mb-4">
            <img src={fileUrl.value} alt="" />
            <button
              onClick={handleCancel}
              class="absolute top-4 right-4 border bg-gray-200 border-gray-400 px-1"
            >
              Undo photograph selection
            </button>
          </div>
        )
        : (
          <div
            class={`text-center border ${
              fileEntered.value ? "bg-gray-200 border-blue-600" : "border-black"
            } p-4 mb-4`}
            onDragOver={handleDragOver}
            onDragLeave={() => {
              fileEntered.value = false;
            }}
            onDrop={handleDrop}
          >
            <p class="mb-4">
              <span>Drag a photograph here, or</span>{" "}
              <label
                for="file"
                class="bg-gray-200 border border-gray-400 px-1 py-0.5"
              >
                Browse your computer
              </label>
              <input
                type="file"
                name="file"
                id="file"
                class="hidden"
                onChange={handleChange}
              />
            </p>
            <p class="text-gray-500">Supports: JPG, JPEG2000, PNG</p>
          </div>
        )}

      <label for="comments">Comments:</label>
      <br />
      <textarea
        name="comments"
        id="comments"
        class="border border-black w-full resize-none mb-4"
      >
      </textarea>
      <br />
      <input
        type="submit"
        value={isTransferring ? "Transferring..." : "Initiate transfer"}
        class="px-1 bg-gray-200 border border-gray-400"
      />
    </form>
  );
}
