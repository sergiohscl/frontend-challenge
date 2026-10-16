export interface UpdateProfileData {
  displayName: string;
  username: string;
  email: string;
  ensName?: string;
  walletNickname?: string;
  avatar: string | null;
  currentPassword?: string;
  newPassword?: string;
}
