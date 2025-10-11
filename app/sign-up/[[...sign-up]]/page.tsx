import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <SignUp />
    </section>
  );
}
