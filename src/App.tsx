import { Button } from "@/components/ui/button"

function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white md:text-6xl">
          NFT Marketplace
        </h1>

        <p className="mt-4 text-lg text-purple-400">
          React + TypeScript + Tailwind CSS + shadcn/ui
        </p>

        <Button className="mt-8 bg-purple-600 text-white hover:bg-purple-700">
          Explore NFTs
        </Button>
      </div>
    </main>
  )
}

export default App