import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="mx-auto flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <SignIn />
    </section>
  );
}
