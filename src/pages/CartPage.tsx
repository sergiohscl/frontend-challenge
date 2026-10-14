
import { Link } from "@tanstack/react-router"

export function CartPage() {
  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <h1 className="text-4xl font-bold">Meu Carrinho</h1>

      <p className="mt-4 text-gray-400">
        Seus NFTs selecionados aparecerão aqui.
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
