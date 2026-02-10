"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchNfts } from "@/store/features/nftsSlice";
import { Carousel } from "@/components/Carousel";
import styles from "./page.module.scss";

export default function Home() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.nfts);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNfts());
    }
  }, [dispatch, status]);

  return (
    <main className={styles.main}>
      {status === "loading" && (
        <p className={styles.loading}>Loading NFTs...</p>
      )}
      {status === "failed" && <p className={styles.error}>Error: {error}</p>}
      {status === "succeeded" && items.length > 0 && <Carousel items={items} />}
    </main>
  );
}
