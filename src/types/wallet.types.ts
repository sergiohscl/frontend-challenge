export type WalletNetwork =
  | "ethereum"
  | "polygon"
  | "base";

export type WalletType =
  | "metamask"
  | "walletconnect"
  | "coinbase";

export interface WalletFormData {
  displayName: string;
  walletNickname: string;
  network: WalletNetwork;
  profileName: string;
  walletAddress: string;
  secondaryAddress: string;
  walletType: WalletType;
  referralCode: string;
  email: string;
  ensName: string;
  sameAsPrimary: boolean;
}

export interface Wallet extends WalletFormData {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateWalletData = WalletFormData;

export type UpdateWalletData = Partial<WalletFormData>;

export interface WalletListResponse {
  wallets: Wallet[];
}

export interface WalletResponse {
  wallet: Wallet;
}
