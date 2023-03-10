import { Handlers } from "$fresh/server.ts";
import { load } from "https://deno.land/std/dotenv/mod.ts";

export const handler: Handlers = {
  async POST(req) {
    const env = await load();
    const api_key = env["API_KEY"];

    const form = await req.formData();
    const file = form.get("file");

    const resp = await fetch(`https://api.web3.storage/upload`, {
      method: "post",
      headers: new Headers({
        Authorization: "Bearer " + api_key,
      }),
      body: file,
    });

    const cid = await resp.json();

    return new Response(JSON.stringify(cid));
  },
};
