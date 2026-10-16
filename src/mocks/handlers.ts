import { http, HttpResponse } from "msw";

import { nfts } from "./data/nfts";
import { authHandlers } from "./handlers/authHandlers";
import { walletHandlers } from "./handlers/walletHandlers";

export const handlers = [
  
  ...authHandlers,
  ...walletHandlers,
  
  http.get("/api/nfts", () => {
    return HttpResponse.json(nfts);
  }),

  http.get("/api/nfts/:id", ({ params }) => {
    const nft = nfts.find((item) => item.id === params.id);

    if (!nft) {
      return HttpResponse.json(
        { message: "NFT não encontrado" },
        { status: 404 },
      );
    }

    return HttpResponse.json(nft);
  }),
];
