export interface NftItem {
  id: string;
  contract_address: string;
  name: string;
  asset_platform_id: string;
  symbol: string;
}

export const mockNfts: NftItem[] = [
  {
    id: "autoglyphs",
    contract_address: "0xd4e4078ca3495de5b1d4db434bebc5a986197782",
    name: "Autoglyphs",
    asset_platform_id: "ethereum",
    symbol: "☵",
  },
  {
    id: "meebits",
    contract_address: "0x7Bd29408f11D2bFC23c34f18275bBf23bB716Bc7",
    name: "Meebits",
    asset_platform_id: "ethereum",
    symbol: "⚇",
  },
  {
    id: "spacepunksclub",
    contract_address: "0x45db714f24f5a313569c41683047f1d49e78ba07",
    name: "SpacePunksClub",
    asset_platform_id: "ethereum",
    symbol: "⚇",
  },
  {
    id: "mooncats-acclimated",
    contract_address: "0xc3f733ca98e0dad0386979eb96fb1722a1a05e69",
    name: "MoonCats - Acclimated",
    asset_platform_id: "ethereum",
    symbol: "😺",
  },
];
