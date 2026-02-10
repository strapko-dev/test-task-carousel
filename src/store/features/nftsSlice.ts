import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface NftApiItem {
  id: string;
  contract_address: string;
  name: string;
  asset_platform_id: string;
  symbol: string;
}

export interface CardData {
  id: string;
  name: string;
  endTime: number; // Unix timestamp (ms) for countdown
  currentBid: number;
  imageIndex: number;
}

interface NftsState {
  items: CardData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NftsState = {
  items: [],
  status: "idle",
  error: null,
};

// Generate random end time (1–48 hours from now)
function generateEndTime(): number {
  const hoursAhead = 1 + Math.random() * 47;
  return Date.now() + hoursAhead * 60 * 60 * 1000;
}

// Generate random bid (0.5 — 15.0 ETH, 2 decimals)
function generateBid(): number {
  return Math.round((0.5 + Math.random() * 14.5) * 100) / 100;
}

// Generate random image index (1-5)
function generateImageIndex(): number {
  return Math.floor(Math.random() * 5) + 1;
}

export const fetchNfts = createAsyncThunk("nfts/fetchNfts", async () => {
  const response = await fetch("https://api.coingecko.com/api/v3/nfts/list");

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data: NftApiItem[] = await response.json();

  // Map API data to card data with client-generated fields
  const cards: CardData[] = data.map((nft) => ({
    id: nft.id,
    name: nft.name,
    endTime: generateEndTime(),
    currentBid: generateBid(),
    imageIndex: generateImageIndex(),
  }));

  return cards;
});

const nftsSlice = createSlice({
  name: "nfts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNfts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchNfts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchNfts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch NFTs";
      });
  },
});

export default nftsSlice.reducer;
