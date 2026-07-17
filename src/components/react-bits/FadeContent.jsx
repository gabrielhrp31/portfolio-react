'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FadeContent = ({
  children,
  container,
  blur = false,
  duration = 1000,
  ease = 'power2.out',
  delay = 0,
  threshold = 0.1,
  initialOpacity = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = 'power2.in',
  playOnMount = false,
  yOffset = 16,
  onComplete,
  onDisappearanceComplete,
  className = '',
  style,
  ...props
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let scrollerTarget = container || null;
    if (typeof scrollerTarget === 'string') {
      scrollerTarget = document.querySelector(scrollerTarget);
    }

    const startPct = (1 - threshold) * 100;
    const getSeconds = val => (typeof val === 'number' && val > 10 ? val / 1000 : val);
    let played = false;

    gsap.set(el, {
      autoAlpha: initialOpacity,
      y: yOffset,
      filter: blur ? 'blur(10px)' : 'blur(0px)',
      willChange: 'opacity, filter, transform'
    });

    const tl = gsap.timeline({
      paused: true,
      delay: getSeconds(delay),
      onComplete: () => {
        if (onComplete) onComplete();
        if (disappearAfter > 0) {
          gsap.to(el, {
            autoAlpha: initialOpacity,
            filter: blur ? 'blur(10px)' : 'blur(0px)',
            delay: getSeconds(disappearAfter),
            duration: getSeconds(disappearDuration),
            ease: disappearEase,
            onComplete: () => onDisappearanceComplete?.()
          });
        }
      }
    });

    tl.to(el, {
      autoAlpha: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: getSeconds(duration),
      ease: ease
    });

    const play = () => {
      if (played) return;
      played = true;
      tl.play();
    };

    let st = null;
    let fallbackId = null;

    const rect = el.getBoundingClientRect();
    const alreadyInView =
      rect.top < window.innerHeight * (1 - threshold * 0.5) && rect.bottom > 0;

    if (playOnMount || alreadyInView) {
      play();
    } else {
      st = ScrollTrigger.create({
        trigger: el,
        scroller: scrollerTarget || window,
        start: `top ${startPct}%`,
        once: true,
        onEnter: play,
        onEnterBack: play
      });

      // Safety: never leave content stuck at opacity 0 if ST never fires.
      fallbackId = window.setTimeout(() => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) play();
      }, 1200);

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }

    return () => {
      if (fallbackId) window.clearTimeout(fallbackId);
      st?.kill();
      tl.kill();
      gsap.killTweensOf(el);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className={className} style={style} {...props}>
      {children}
    </div>
  );
};

export default FadeContent;
