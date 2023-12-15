import { Head } from "$fresh/runtime.ts";
import { RouteConfig } from "$fresh/server.ts";
import { useSignal } from "@preact/signals";
import NavigationBar from "@/islands/NavigationBar.tsx";
import Page from "@/islands/Page.tsx";
import TabBar from "@/islands/TabBar.tsx";

export const config: RouteConfig = {
  skipAppWrapper: true,
};

export default function AppHome() {
  const index = useSignal(1);

  return (
    <>
      <Head>
        <title>Inkbox</title>

        <meta
          name="viewport"
          content="initial-scale=1, viewport-fit=cover, width=device-width"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        <link rel="manifest" href="/site.webmanifest" />
        <link rel="stylesheet" href="/assets/styles/app.css" />
      </Head>

      <main>
        <NavigationBar index={index} />

        <Page index={index} />

        <TabBar index={index} />
      </main>
    </>
  );
}
