"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { CardData } from "@/store/features/nftsSlice";
import styles from "./Card.module.scss";
import { formatCountdown } from "@/lib/utils";

interface CardProps {
  nft: CardData;
}

export function Card({ nft }: CardProps) {
  const [timer, setTimer] = useState(() => formatCountdown(nft.endTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(formatCountdown(nft.endTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [nft.endTime]);

  const imageSrc = `/images/image${nft.imageIndex}.jpg`;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageSrc}
          alt={nft.name}
          fill
          sizes="280px"
          className={styles.image}
        />
        <span className={styles.timer}>{timer}</span>
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{nft.name}</h3>

        <div className={styles.footer}>
          <div className={styles.bid}>
            <span className={styles.bidLabel}>Current bid</span>
            <span className={styles.bidValue}>
              <svg
                width="10"
                height="16"
                viewBox="0 0 10 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 0L0 8.2L5 11.2L10 8.2L5 0ZM5 12.2L0 9.2L5 16L10 9.2L5 12.2Z"
                  fill="currentColor"
                />
              </svg>
              {nft.currentBid}
            </span>
          </div>

          <motion.button
            className={styles.bidButton}
            whileTap={{ scale: 0.97 }}
          >
            PLACE BID
          </motion.button>
        </div>
      </div>
    </div>
  );
}
