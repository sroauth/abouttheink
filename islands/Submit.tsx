import { useEffect } from "preact/hooks";
import { Gun, User, getCertificate, uuid } from "@/utils/gun.ts";
import {
  appointmentDate,
  appointmentTime,
  firstName,
  lastName,
  dob,
  email,
  phoneNumber,
  phoneCarrier,
  referencePhotoCid,
  parts,
} from "@/utils/appointment.ts";

export default function Submit(props) {
  const gun = Gun.value;
  const user = User.value;

  useEffect(() => {
    console.log(user.is);
  }, []);

  async function handleSubmit() {
    const certificate = await getCertificate(props.pub, "appointments");

    if (!user.is) {
      const pair = await SEA.pair();
      localStorage.setItem("pair", JSON.stringify(pair));
      user.auth(pair);
    }

    const photoFormData = new FormData();
    photoFormData.append("file", referencePhotoCid.value);

    const response = await fetch("/api/upload", {
      method: "post",
      body: photoFormData,
    });

    const upload = await response.json();

    gun
      .user(props.pub)
      .get("appointments")
      .get(user.is.pub)
      .put(
        {
          date: appointmentDate.value,
          time: appointmentTime.value,
          firstName: firstName.value,
          lastName: lastName.value,
          dob: dob.value,
          email: email.value,
          phoneNumber: phoneNumber.value,
          phoneCarrier: phoneCarrier.value,
          parts: parts.value,
          referencePhotoCid: upload.cid,
        },
        () => {
          console.log(`Successfully wrote data.`);
        },
        { opt: { cert: certificate } }
      );
  }

  return (
    <button class="bg-white text-xl py-2 px-4 font-bold" onClick={handleSubmit}>
      Submit
    </button>
  );
}
