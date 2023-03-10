import { useState } from "preact/hooks";
import {
  firstName,
  lastName,
  dob,
  email,
  phoneNumber,
  phoneCarrier,
  referencePhotoCid,
} from "@/utils/appointment.ts";

export default function Form() {
  const [refPhotoSrc, setRefPhotoSrc] = useState("");

  function showPreview(event) {
    if (event.target.files.length > 0) {
      var src = URL.createObjectURL(event.target.files[0]);
      setRefPhotoSrc(src);
    }
  }

  return (
    <div class="text-xl">
      <div class="w-[320px] flex gap-1">
        <input
          type="text"
          placeholder="First name"
          class="w-0 flex-grow bg-[#E5E9F0] py-2 px-3 outline-none"
          onInput={(e) => (firstName.value = e.target.value)}
        />

        <input
          type="text"
          placeholder="Last name"
          class="w-0 flex-grow bg-[#E5E9F0] py-2 px-3 outline-none"
          onInput={(e) => (lastName.value = e.target.value)}
        />
      </div>

      <div class="mt-1">
        <label for="dob" class="px-3 text-lg text-gray-600">
          Date of birth
        </label>
        <input
          type="date"
          id="dob"
          name="dob"
          class="w-[320px] bg-[#E5E9F0] py-2 px-3"
          onChange={(e) => (dob.value = e.target.value)}
        />
      </div>

      <div class="mt-1">
        <input
          type="email"
          placeholder="jamie.doe@example.com"
          class="w-[320px] bg-[#E5E9F0] py-2 px-3 outline-none"
          onInput={(e) => (email.value = e.target.value)}
        />
      </div>

      <div class="flex gap-1 mt-1">
        <input
          type="tel"
          placeholder="(123) 456-7890"
          class="w-0 flex-grow bg-[#E5E9F0] py-2 px-3"
          onInput={(e) => (phoneNumber.value = e.target.value)}
        />

        <select
          class="appearance-none bg-[#E5E9F0] px-3 outline-none text-gray-400 valid:text-black"
          onChange={(e) => (phoneCarrier.value = e.target.value)}
          required
        >
          <option value="">Select Carrier</option>
          <option value="Verizon">Verizon</option>
        </select>
      </div>

      <label for="referencePhoto" class="block text-gray-600 text-lg px-3 mt-1">
        Reference photo
      </label>
      <div class="bg-[#E5E9F0] p-3">
        {refPhotoSrc ? (
          <img id="referencePhotoPreview" src={refPhotoSrc} />
        ) : (
          <input
            type="file"
            name="referencePhoto"
            id="referencePhoto"
            accept="image/*"
            onChange={(e) => {
              referencePhotoCid.value = e.target.files[0];
              showPreview(e);
            }}
          />
        )}
      </div>
    </div>
  );
}
