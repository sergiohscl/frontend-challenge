
import { Link } from "@tanstack/react-router"

export function HomePage() {
  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <h1 className="text-4xl font-bold">NFT Marketplace</h1>

      <p className="mt-4 text-gray-400">
        Explore NFTs exclusivos.
      </p>

      <div className="mt-8 flex gap-4">
        <Link
          to="/nft/$nftId"
          params={{ nftId: "1" }}
          className="rounded-lg bg-purple-600 px-4 py-2"
        >
          Ver NFT
        </Link>

        <Link
          to="/cart"
          className="rounded-lg border border-gray-600 px-4 py-2"
        >
          Carrinho
        </Link>
      </div>
    </main>
  )
}
