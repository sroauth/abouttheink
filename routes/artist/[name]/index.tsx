import { PageProps } from "$fresh/server.ts";

export default function Artist(props: PageProps) {
  return (
    <main class="content-grid">
      Hello, {props.params.name}
    </main>
  );
}
