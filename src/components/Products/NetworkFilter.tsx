import type { NetworkFilterProps } from "../../types/networkFilter.types";

export function NetworkFilter({
  networks,
  selectedNetwork,
  onNetworkChange,
}: NetworkFilterProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      <h3 className="font-mono text-lg leading-4 font-bold text-text-primary">
        Rede
      </h3>

      <div className="flex flex-col pl-3">
        {networks.map((network) => {
          const isSelected = selectedNetwork === network.id;

          return (
            <button
              key={network.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() =>
                onNetworkChange(isSelected ? null : network.id)
              }
              className={`
                flex h-10 w-full items-center justify-between
                font-mono text-[15px] leading-10
                transition-colors
                ${
                  isSelected
                    ? "font-bold text-[#E89B55]"
                    : "font-normal text-text-secondary hover:text-[#E89B55]"
                }
              `}
            >
              <span>{network.label}</span>
              <span>({network.count})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
