import type { NFT } from "@/types/nft";

export const nfts: NFT[] = [
  {
    id: "1",
    name: "Emerald Ape #042",
    description: "NFT exclusivo da coleção Digital Art.",
    image: "/images/nfts/emerald-ape.png",
    price: 1.19,
    currency: "ETH",
    creator: "Kurio Studio",
  },
  {
    id: "2",
    name: "Sage Nomad #009",
    description: "Arte digital da coleção Digital Art.",
    image: "/images/nfts/sage-nomad.png",
    price: 1.69,
    currency: "ETH",
    creator: "Kurio Studio",
  },
  {
    id: "3",
    name: "Neon Vessel #552",
    description: "NFT da coleção Digital Art.",
    image: "/images/nfts/neon-vessel.png",
    price: 1.99,
    currency: "ETH",
    creator: "Kurio Studio",
  },
  {
    id: "4",
    name: "Cosmic Bloom #118",
    description: "Arte digital colecionável.",
    image: "/images/nfts/sage-nomad.png",
    price: 1.29,
    currency: "ETH",
    creator: "Kurio Studio",
  },
  {
    id: "5",
    name: "Violet Nomad #314",
    description: "NFT exclusivo.",
    image: "/images/nfts/sage-nomad.png",
    price: 1.39,
    currency: "ETH",
    creator: "Kurio Studio",
  },
  {
    id: "6",
    name: "Ivory Baron #088",
    description: "Arte digital colecionável.",
    image: "/images/nfts/neon-vessel.png",
    price: 1.79,
    currency: "ETH",
    creator: "Kurio Studio",
  },
  {
    id: "7",
    name: "Golden Beat #207",
    description: "NFT da coleção Digital Art.",
    image: "/images/nfts/golden-beat.png",
    price: 0.99,
    currency: "ETH",
    creator: "Kurio Studio",
  },
  {
    id: "8",
    name: "Golden Signal #160",
    description: "NFT exclusivo.",
    image: "/images/nfts/golden-beat.png",
    price: 0.39,
    currency: "ETH",
    creator: "Kurio Studio",
  },
  {
    id: "9",
    name: "Golden Echo #309",
    description: "NFT da coleção Digital Art.",
    image: "/images/nfts/golden-beat.png",
    price: 0.79,
    currency: "ETH",
    creator: "Kurio Studio",
  },
];

const collections = [
  "Digital Art",
  "Collectibles",
  "Gaming",
  "Photography",
  "Music",
  "Virtual Worlds",
  "Sports",
  "Others",
  "More",
];

const networks = ["Ethereum", "Polygon", "Solana"];

nfts.forEach((nft, index) => {
  nft.collection = collections[index % collections.length];
  nft.network = networks[index % networks.length];
  nft.createdAt = new Date(
    Date.UTC(2026, 9, 1 + (index % 14)),
  ).toISOString();
  nft.isTrending = index % 3 === 0;
});

const demoImages = [
  "/images/nfts/emerald-ape.png",
  "/images/nfts/sage-nomad.png",
  "/images/nfts/neon-vessel.png",
  "/images/nfts/golden-beat.png",
];

const demoNames = [
  "Emerald Ape",
  "Sage Nomad",
  "Neon Vessel",
  "Golden Beat",
];

for (let id = 10; id <= 36; id++) {
  const imageIndex = (id - 10) % demoImages.length;

  nfts.push({
    id: String(id),
    name: `${demoNames[imageIndex]} #${String(id).padStart(3, "0")}`,
    description: "NFT de demonstração para testar a paginação.",
    image: demoImages[imageIndex],
    price: Number((0.39 + ((id * 17) % 160) / 100).toFixed(2)),
    currency: "ETH",
    creator: "Kurio Studio",
  });
}
