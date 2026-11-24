import { useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';
import { Container } from '@/components/layout/Container';
import { EASE_OUT } from '@/lib/motion';

/** Stacked My Works page title with the same grid and motion as the home hero. */
export function WorksHero() {
  const reduceMotion = useReducedMotion() ?? false;

  const variants = useMemo(() => {
    const textGroup: Variants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.08,
          delayChildren: reduceMotion ? 0 : 0.06,
        },
      },
    };

    const textItem: Variants = {
      hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: reduceMotion ? 0 : 0.6, ease: EASE_OUT },
      },
    };

    return { textGroup, textItem };
  }, [reduceMotion]);

  return (
    <section
      aria-labelledby="works-title"
      className="pt-12 pb-8 md:pt-20 md:pb-12 lg:pt-24 lg:pb-16"
    >
      <Container>
        <motion.div
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
          variants={variants.textGroup}
        >
          <motion.p
            variants={variants.textItem}
            className="text-page-kicker font-semibold text-heading"
          >
            Some of
          </motion.p>
          <motion.h1
            id="works-title"
            variants={variants.textItem}
            className="text-page-title font-extrabold text-heading"
          >
            MY WORKS
          </motion.h1>
        </motion.div>
      </Container>
    </section>
  );
}
