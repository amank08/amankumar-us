export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        About Me
      </h1>
      <div className="prose prose-zinc mt-8 dark:prose-invert max-w-none">
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Hi, I&apos;m Aman Kumar. I&apos;m a software engineer passionate about
          building great products on the web.
        </p>
        <p className="text-zinc-600 dark:text-zinc-400">
          This is my personal website where I share my thoughts, projects, and
          writing. Feel free to look around and reach out if you&apos;d like to
          connect.
        </p>
      </div>
    </div>
  );
}
