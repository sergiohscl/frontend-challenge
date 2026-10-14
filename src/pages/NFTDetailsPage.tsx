
import { Link, useParams } from "@tanstack/react-router"

export function NFTDetailsPage() {
  const { nftId } = useParams({ from: "/nft/$nftId" })

  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <h1 className="text-4xl font-bold">Detalhes do NFT</h1>

      <p className="mt-4 text-gray-400">
        NFT selecionado: {nftId}
      </p>

      <Link
        to="/"
        className="mt-8 inline-block text-purple-400"
      >
        Voltar para Home
      </Link>
    </main>
  )
}
