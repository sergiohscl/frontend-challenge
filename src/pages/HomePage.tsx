
import { useQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"

import { nftService } from "@/services/nftService"

export function HomePage() {
  const {
    data: nfts,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["nfts"],
    queryFn: nftService.getAll,
  })

  if (isPending) {
    return (
      <main className="min-h-screen bg-black p-8 text-white">
        Carregando NFTs...
      </main>
    )
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-black p-8 text-white">
        Erro ao carregar NFTs.
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <h1 className="mb-8 text-4xl font-bold">
        NFT Marketplace
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {nfts.map((nft) => (
          <Link
            key={nft.id}
            to="/nft/$nftId"
            params={{ nftId: nft.id }}
            className="overflow-hidden rounded-xl border border-gray-800 bg-zinc-900"
          >
            <img
              src={nft.image}
              alt={nft.name}
              className="aspect-square w-full object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl font-semibold">
                {nft.name}
              </h2>

              <p className="mt-2 text-gray-400">
                Criador: {nft.creator}
              </p>

              <p className="mt-4 font-bold text-purple-400">
                {nft.price} {nft.currency}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
