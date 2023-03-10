import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import Calendar from "@/islands/Calendar.tsx";
import Form from "@/islands/Form.tsx";
import Diagram from "@/islands/Diagram.tsx";
import Submit from "@/islands/Submit.tsx";

export default function Home(props: PageProps) {
  const artists = {
    // sabastian: "J5vYLkfFvw2IhQIbqt6RWo27J9F9uyegM6bZ0Zzdq2w.akVKIQdvtR_d37SXEhTPaLCoSpUVuqVEEdhCti9dpII",
    sabastian:
      "n74xoLWtXjmJvL2Nb2eGl_sZIk6hPlC05phUnj0cLM8.tqRGsagOzAF-0kjr_bXCscbkL3K6aN9-msAIFTyJmBo",
  };

  return (
    <>
      <Head>
        <title>Sabastian Auth | About the Ink Tattoos</title>

        <link rel="stylesheet" href="/shared.css" />
      </Head>

      <div class="h-screen bg-[#D8DEE9] overflow-hidden">
        <div class="flex justify-between">
          <div class="w-[360px] p-5">
            <h1 class="text-3xl font-bold">Request Appointment</h1>
            <p class="text-lg text-gray-500">
              Please finish all three steps in order to submit your appointment
              request.
            </p>
          </div>

          <div class="p-5">
            <Submit pub={artists.sabastian} />
          </div>
        </div>

        <div class="flex justify-evenly flex-wrap">
          <div class="w-[360px] p-5">
            <h2 class="text-2xl">
              <span class="font-bold">1.</span> Appointment Date
            </h2>
            <p class="text-lg mb-5 text-gray-500">
              Select a date and time for when you would like to get your tattoo.
            </p>

            <Calendar pub={artists[props.params.artist]} />
          </div>

          <div class="w-[360px] p-5">
            <h2 class="text-2xl">
              <span class="font-bold">2.</span> Client Information
            </h2>
            <p class="text-lg mb-5 text-gray-500">
              Provide the information requested on the form below.
            </p>

            <Form />
          </div>

          <div class="w-[360px] p-5">
            <h2 class="text-2xl">
              <span class="font-bold">3.</span> Tattoo Location
            </h2>
            <p class="text-lg mb-5 text-gray-500">
              Select the parts where your tattoo will go on the diagram below.
            </p>

            <Diagram />
          </div>
        </div>
      </div>
    </>
  );
}
