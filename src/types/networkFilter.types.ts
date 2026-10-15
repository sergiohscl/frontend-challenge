
export type NetworkOption = {
  id: string;
  label: string;
  count: number;
};

export type NetworkFilterProps = {
  networks: NetworkOption[];
  selectedNetwork: string | null;
  onNetworkChange: (networkId: string | null) => void;
};
