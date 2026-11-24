import { Link } from 'react-router-dom';
import { Container } from '@/components/layout/Container';
import { usePageTitle } from '@/lib/usePageTitle';

const specialties = [
  'Brand strategy',
  'Visual identity',
  'Graphic design',
  'Logo design',
  'Social media design',
  'Video editing',
  'Motion graphics',
];

const softwareSkills = [
  'Adobe Photoshop',
  'Adobe Illustrator',
  'Adobe Premiere Pro',
  'DaVinci Resolve',
  'Adobe After Effects',
];

const strengths = [
  'Creativity',
  'Attention to detail',
  'Time management',
  'Fast learning',
  'Communication',
  'Adaptability',
  'Problem solving',
];

const experience = [
  {
    title: 'Senior Brand Strategist',
    details: 'HayaSebat Marketing and Branding PLC · Sep 2023–present · Addis Ababa',
    responsibilities: [
      'Conduct research and analysis.',
      'Define design objectives and strategies.',
      'Collaborate with cross-functional teams.',
      'Create design briefs and guide design initiatives.',
    ],
  },
  {
    title: 'Freelance Graphic Designer',
    details: 'Independent · Jun 2019–Sep 2023',
    responsibilities: [
      'Design marketing materials, including brochures, flyers, and posters.',
      'Create logos and branding materials for clients.',
      'Develop social media graphics and website designs.',
    ],
  },
  {
    title: 'Volunteer Graphics Designer & Video Editor',
    details: 'Amist Kilo Gbi Gubae · Sep 2020–Jun 2023 · Addis Ababa',
    responsibilities: [
      'Design social media graphics.',
      'Create graphics and edit videos for YouTube.',
    ],
  },
  {
    title: 'Graphics Designer & Video Editor',
    details: 'Nisir Motivation · Dec 2021–Jun 2022 · Addis Ababa',
    responsibilities: [
      'Design logos and social media graphics.',
      'Create graphics for YouTube videos.',
      'Edit and enhance videos for YouTube.',
    ],
  },
];

export function AboutPage() {
  usePageTitle('About');

  return (
    <Container className="py-16 md:py-24 lg:py-32">
      <header className="max-w-[58rem]">
        <p className="mb-4 text-small font-semibold tracking-[0.2em] text-accent uppercase">
          About me
        </p>
        <h1 className="text-page-title font-display text-heading">Design with meaning.</h1>
        <p className="mt-8 text-body-lg leading-relaxed text-copy md:mt-10">
          I’m Natnael Fikreyesus, a Senior Brand Strategist and creative designer at HayaSebat
          Marketing and Branding PLC in Addis Ababa. I shape design objectives and strategies,
          develop clear briefs, and work with cross-functional teams to bring thoughtful brand
          identities and visual communication to life.
        </p>
        <p className="mt-6 text-body leading-relaxed text-muted">
          My work spans logos, marketing materials, social media, websites, and video. A degree in
          mechanical engineering gives me a methodical, analytical perspective, while my
          cinematography training informs how I approach motion and visual storytelling. I enjoy
          combining research, creativity, and collaboration to make communication memorable and
          useful.
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
        aria-labelledby="about-experience"
        className="mt-14 grid gap-8 border-t border-border pt-8 md:mt-16 md:grid-cols-[minmax(12rem,0.65fr)_1fr] md:pt-10"
      >
        <h2 id="about-experience" className="text-h1 font-semibold text-heading">
          Experience
        </h2>
        <div className="space-y-8">
          {experience.map((item) => (
            <div key={item.title}>
              <p className="font-semibold text-heading">{item.title}</p>
              <p className="mt-1 text-muted">{item.details}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-copy marker:text-accent">
                {item.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="about-education"
        className="mt-14 grid gap-8 border-t border-border pt-8 md:mt-16 md:grid-cols-[minmax(12rem,0.65fr)_1fr] md:pt-10"
      >
        <h2 id="about-education" className="text-h1 font-semibold text-heading">
          Education
        </h2>
        <div className="space-y-8">
          <div>
            <p className="font-semibold text-heading">BSc, Mechanical Engineering</p>
            <p className="mt-1 text-muted">Addis Ababa University · Sep 2018–Jul 2023</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-copy marker:text-accent">
              <li>Developed a methodical and analytical approach through engineering studies.</li>
              <li>Apply that perspective to design and problem solving.</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-heading">Diploma in Cinematography</p>
            <p className="mt-1 text-muted">Tom Film Academy · Jun–Aug 2018</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-copy marker:text-accent">
              <li>Studied cinematography principles.</li>
              <li>Apply this foundation to visual design, motion graphics, and animation.</li>
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="about-tools"
        className="mt-14 grid gap-8 border-t border-border pt-8 md:mt-16 md:grid-cols-[minmax(12rem,0.65fr)_1fr] md:pt-10"
      >
        <h2 id="about-tools" className="text-h1 font-semibold text-heading">
          Tools & strengths
        </h2>
        <div className="space-y-7">
          <div>
            <h3 className="font-semibold text-heading">Software</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {softwareSkills.map((skill) => (
                <li key={skill} className="rounded-full bg-surface px-4 py-2 text-small text-copy">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-heading">How I work</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {strengths.map((strength) => (
                <li
                  key={strength}
                  className="rounded-full bg-surface px-4 py-2 text-small text-copy"
                >
                  {strength}
                </li>
              ))}
            </ul>
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
