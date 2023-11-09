import ArtistForm from "../../islands/ArtistForm.tsx";

export default function Artists() {
  return (
    <div class="p-20">
      <h1 class="text-4xl mb-4">Artists</h1>
      <a href="/app/dashboard" class="text-blue-600 underline">
        Go back to dashboard
      </a>
      <ArtistForm />
    </div>
  );
}
