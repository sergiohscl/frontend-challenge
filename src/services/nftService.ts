import { api } from "@/lib/api"
import type { NFT } from "@/types/nft"

export const nftService = {
  async getAll(): Promise<NFT[]> {
    const response = await api.get<NFT[]>("/nfts")

    console.log("Resposta da API:", response.data)

    return response.data
  },

  async getById(id: string): Promise<NFT> {
    const response = await api.get<NFT>(`/nfts/${id}`)
    return response.data
  },
}