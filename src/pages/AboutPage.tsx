import { Link } from 'react-router-dom';
import { Container } from '@/components/layout/Container';

const specialties = ['Graphic design', 'Visual identity', 'Brand identity', 'Logo design'];

export function AboutPage() {
  return (
    <Container className="py-16 md:py-24 lg:py-32">
      <header className="max-w-[58rem]">
        <p className="mb-4 text-small font-semibold tracking-[0.2em] text-accent uppercase">
          About me
        </p>
        <h1 className="text-page-title font-display text-heading">Design with meaning.</h1>
        <p className="mt-8 text-body-lg leading-relaxed text-copy md:mt-10">
          I’m Natnael Fikreyesus, a creative designer focused on bringing brands to life through
          graphic design, logo design, and thoughtful visual identities. I currently work at
          HayaSebat Marketing and Branding while taking on freelance projects.
        </p>
        <p className="mt-6 text-body leading-relaxed text-muted">
          I’m driven by the opportunity to make a real impact in branding and to bring cultural
          perspective into each project. With a foundation in art and a practical, problem-solving
          mindset, I enjoy working collaboratively to create clear, memorable communication.
        </p>
      </header>

      <section
        aria-labelledby="about-focus"
        className="mt-16 border-t border-border pt-8 md:mt-20 md:pt-10"
      >
        <h2 id="about-focus" className="text-h1 font-semibold text-heading">
          What I do
        </h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {specialties.map((specialty) => (
            <li
              key={specialty}
              className="rounded-full border border-border bg-surface px-5 py-2.5 text-copy"
            >
              {specialty}
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="about-background"
        className="mt-14 grid gap-8 border-t border-border pt-8 md:mt-16 md:grid-cols-[minmax(12rem,0.65fr)_1fr] md:pt-10"
      >
        <h2 id="about-background" className="text-h1 font-semibold text-heading">
          A little background
        </h2>
        <div className="space-y-7">
          <div>
            <p className="font-semibold text-heading">Creative Designer</p>
            <p className="mt-1 text-muted">HayaSebat Marketing and Branding · 2023–present</p>
          </div>
          <div>
            <p className="font-semibold text-heading">Freelance Graphic Designer</p>
            <p className="mt-1 text-muted">Independent · 2019–present</p>
          </div>
          <div>
            <p className="font-semibold text-heading">BSc, Mechanical Engineering</p>
            <p className="mt-1 text-muted">Addis Ababa University · 2019–2023</p>
          </div>
        </div>
      </section>

      <div className="mt-16 rounded-lg border border-border bg-surface p-7 shadow-card md:mt-20 md:p-10">
        <p className="max-w-[45rem] text-body-lg leading-relaxed text-heading">
          Let’s connect and explore how thoughtful design can help your brand stand out.
        </p>
        <Link
          to="/contact"
          className="mt-6 inline-flex min-h-11 items-center font-semibold text-accent underline decoration-current underline-offset-4 hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
        >
          Start a conversation{' '}
          <span aria-hidden="true" className="ml-2">
            →
          </span>
        </Link>
      </div>
    </Container>
  );
}
