import { AppProps } from "$fresh/server.ts";

export default function App({ Component }: AppProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>
          About the Ink: Southern MD's First Tattoo Shop Since 1993
        </title>

        <link rel="stylesheet" href="/assets/styles/shared.css" />
      </head>

      <body>
        <Component />
      </body>
    </html>
  );
}
