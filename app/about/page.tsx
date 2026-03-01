export default function AboutPage() {
  return (
    <div className="animate-fade-in-up mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-text-primary">
        About Me
      </h1>
      <div className="prose prose-zinc mt-8 max-w-none dark:prose-invert">
        <p className="text-lg text-text-secondary">
          Hi, I&apos;m Aman Kumar. I&apos;m a software engineer passionate about
          building great products on the web.
        </p>
        <p className="text-text-secondary">
          This is my personal website where I share my thoughts, projects, and
          writing. Feel free to look around and reach out if you&apos;d like to
          connect.
        </p>
      </div>
    </div>
  );
}
