import { AppProps } from "$fresh/server.ts";

export default function App({ Component }: AppProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>About the Ink Tattoos</title>
      </head>
      <body>
        <div itemscope itemtype="https://schema.org/WebSite">
          <meta itemprop="url" content="https://abouttheink.com/" />
          <meta itemprop="name" content="About the Ink Tattoos" />
        </div>

        <Component />

        <footer class="max-w-[34em] mx-auto p-4">
          <p class="text-sm">
            &copy; 2023 About the Ink Tattoos. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
