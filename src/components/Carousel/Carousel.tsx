"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  PanInfo,
  useMotionValueEvent,
} from "framer-motion";
import type { CardData } from "@/store/features/nftsSlice";
import { Card } from "@/components/Card/Card";
import styles from "./Carousel.module.scss";
import { ArrowLeftIcon, ArrowRightIcon } from "../icons/Arrows";

interface CarouselProps {
  items: CardData[];
}

const CARD_WIDTH = 240;
const CARD_GAP = 24;
const ITEM_SIZE = CARD_WIDTH + CARD_GAP;
const BUFFER = 3; // extra cards rendered on each side outside viewport

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

export function Carousel({ items }: CarouselProps) {
  const controls = useAnimation();
  const x = useMotionValue(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  const totalItems = items.length;

  // Offset to center the active card in the viewport
  const centerOffset = (containerWidth - CARD_WIDTH) / 2;

  // Measure container width
  useEffect(() => {
    const measure = () => {
      if (wrapperRef.current) {
        setContainerWidth(wrapperRef.current.clientWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Track x for re-rendering visible cards
  useMotionValueEvent(x, "change", (latest) => {
    setCurrentX(latest);
  });

  // Calculate which cards to render (only visible + buffer)
  const visibleCards = useMemo(() => {
    if (totalItems === 0 || containerWidth === 0) return [];

    // Current offset into the virtual infinite strip
    // offset is positive and represents how far we've scrolled right
    const offset = -currentX;

    // First visible virtual index (can be negative or very large)
    const firstVisibleVirtual = Math.floor(
      (offset - BUFFER * ITEM_SIZE) / ITEM_SIZE,
    );
    const lastVisibleVirtual = Math.ceil(
      (offset + containerWidth + BUFFER * ITEM_SIZE) / ITEM_SIZE,
    );

    const cards: { virtualIndex: number; dataIndex: number; left: number }[] =
      [];

    for (let vi = firstVisibleVirtual; vi <= lastVisibleVirtual; vi++) {
      const dataIndex = mod(vi, totalItems);
      const left = vi * ITEM_SIZE + centerOffset;
      cards.push({ virtualIndex: vi, dataIndex, left });
    }

    return cards;
  }, [currentX, containerWidth, totalItems]);

  // Snap to nearest card with spring animation
  const animateTo = useCallback(
    (target: number) => {
      controls.start({
        x: target,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      });
    },
    [controls],
  );

  const handlePrev = () => {
    const current = x.get();
    const snapped = Math.round(current / ITEM_SIZE) * ITEM_SIZE;
    animateTo(snapped + ITEM_SIZE);
  };

  const handleNext = () => {
    const current = x.get();
    const snapped = Math.round(current / ITEM_SIZE) * ITEM_SIZE;
    animateTo(snapped - ITEM_SIZE);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    let cardsMoved = Math.round(Math.abs(offset) / ITEM_SIZE);
    if (cardsMoved === 0 && Math.abs(velocity) > 200) cardsMoved = 1;
    if (cardsMoved === 0) cardsMoved = Math.abs(offset) > ITEM_SIZE / 3 ? 1 : 0;

    const direction = offset > 0 ? 1 : -1;
    const current = x.get();
    const target = current + direction * cardsMoved * ITEM_SIZE;
    const snapped = Math.round(target / ITEM_SIZE) * ITEM_SIZE;

    animateTo(snapped);
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Weekly - Top NFT</h2>

      <div className={styles.carouselWrapper} ref={wrapperRef}>
        <motion.div
          className={styles.track}
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -Infinity, right: Infinity }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          animate={controls}
        >
          {visibleCards.map(({ virtualIndex, dataIndex, left }) => (
            <div
              key={virtualIndex}
              className={styles.slide}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                transform: `translateX(${left}px)`,
              }}
            >
              <Card nft={items[dataIndex]} />
            </div>
          ))}
        </motion.div>
      </div>

      <div className={styles.navigation}>
        <button
          className={styles.navButton}
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <ArrowLeftIcon />
        </button>
        <div className={styles.navDivider} />
        <button
          className={styles.navButton}
          onClick={handleNext}
          aria-label="Next slide"
        >
          <ArrowRightIcon />
        </button>
      </div>
    </section>
  );
}
