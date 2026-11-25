import { useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';
import { Container } from '@/components/layout/Container';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { EASE_OUT } from '@/lib/motion';
import { HeroMark } from './HeroMark';

export function HeroSection() {
  const reduceMotion = useReducedMotion() ?? false;

  const variants = useMemo(() => {
    const textGroup: Variants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.08,
          delayChildren: reduceMotion ? 0 : 0.08,
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

    const mark: Variants = {
      hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.94 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: reduceMotion ? 0 : 0.8,
          ease: EASE_OUT,
          delay: reduceMotion ? 0 : 0.12,
        },
      },
    };

    return { textGroup, textItem, mark };
  }, [reduceMotion]);

  const initial = reduceMotion ? false : 'hidden';

  return (
    <section aria-labelledby="hero-title" className="relative overflow-visible">
      <Container className="grid grid-cols-1 items-center gap-12 pt-12 pb-16 md:pt-16 md:pb-20 lg:min-h-[calc(100svh-5.5rem)] lg:grid-cols-[minmax(0,40rem)_minmax(0,1fr)] lg:gap-16 lg:pt-16 lg:pb-0">
        <motion.div initial={initial} animate="visible" variants={variants.textGroup}>
          <motion.h1
            id="hero-title"
            aria-label="Natnael Fikreyesus"
            variants={variants.textItem}
            className="font-display text-heading"
          >
            <span aria-hidden="true" className="block text-display-1">
              NATNAEL
            </span>
            <span aria-hidden="true" className="block text-display-2">
              FIKREYESUS
            </span>
          </motion.h1>

          <motion.p
            variants={variants.textItem}
            className="mt-6 max-w-[39rem] text-[clamp(0.8rem,1.28vw,1.2rem)] leading-[1.25] text-copy lg:mt-7"
          >
            I empower businesses to stand out in crowded markets. Crafting logos and identities that
            captivate, setting you apart in today&apos;s competitive landscape.
          </motion.p>

          <motion.div variants={variants.textItem} className="mt-6 lg:mt-7">
            <ButtonLink to="/contact">Contact Me</ButtonLink>
          </motion.div>
        </motion.div>

        <motion.div
          initial={initial}
          animate="visible"
          variants={variants.mark}
          aria-hidden="true"
          className="order-first justify-self-center lg:order-none lg:ml-14"
        >
          <HeroMark />
        </motion.div>
      </Container>
    </section>
  );
}
