import { logos } from '@/data/logos';

/** Seamless three-column logo wall; one and two columns on smaller screens. */
export function LogosSection() {
  return (
    <section aria-labelledby="logos-heading">
      <h2 id="logos-heading" className="text-label font-semibold text-heading">
        Logos
      </h2>

      <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {logos.map((logo) => (
          <li
            key={logo.id}
            className="group relative aspect-[4/3] overflow-hidden transition-shadow duration-350 hover:z-10 hover:shadow-card motion-reduce:transition-none"
            style={{ backgroundColor: logo.background }}
          >
            <img
              src={logo.image}
              alt={`${logo.name} logo`}
              width={516}
              height={384}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="h-full w-full object-cover transition-[transform,filter] duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:brightness-105 motion-safe:group-hover:scale-[1.04]"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
