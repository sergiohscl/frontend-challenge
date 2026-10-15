
import { useState } from "react";

import type {
  PriceFilterProps,
  PriceRange,
} from "../../types/priceFilter.types";

export function PriceFilter({
  minPrice = 0.02,
  maxPrice = 12.3,
  onApply,
}: PriceFilterProps) {
  const [range, setRange] = useState<PriceRange>({
    min: minPrice,
    max: maxPrice,
  });

  const priceFormatter = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const total = maxPrice - minPrice;

  const minPercent =
    total > 0
      ? ((range.min - minPrice) / total) * 100
      : 0;

  const maxPercent =
    total > 0
      ? ((range.max - minPrice) / total) * 100
      : 100;

  function handleMinChange(value: number) {
    setRange((current) => ({
      ...current,
      min: Math.min(value, current.max),
    }));
  }

  function handleMaxChange(value: number) {
    setRange((current) => ({
      ...current,
      max: Math.max(value, current.min),
    }));
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <h3 className="font-mono text-lg leading-4 font-bold text-text-primary">
        Faixa de preço
      </h3>

      <div className="flex flex-col gap-3 pl-3">
        {/* Slider */}
        <div className="relative h-5.25 w-full">
          {/* Linha de fundo */}
          <div className="absolute top-1/2 right-0 left-0 h-1 -translate-y-1/2 rounded-full bg-[#4A3024]" />

          {/* Faixa selecionada */}
          <div
            className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-primary"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />

          {/* Controle mínimo */}
          <input
            type="range"
            aria-label="Preço mínimo"
            min={minPrice}
            max={maxPrice}
            step={0.01}
            value={range.min}
            onChange={(event) =>
              handleMinChange(Number(event.target.value))
            }
            className="pointer-events-none absolute inset-0 h-full w-full appearance-none bg-transparent
              [&::-webkit-slider-thumb]:pointer-events-auto
              [&::-webkit-slider-thumb]:h-3.75
              [&::-webkit-slider-thumb]:w-3.75
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:border-3
              [&::-webkit-slider-thumb]:border-primary
              [&::-webkit-slider-thumb]:bg-[#241612]
              [&::-moz-range-thumb]:pointer-events-auto
              [&::-moz-range-thumb]:h-2.25
              [&::-moz-range-thumb]:w-2.25
              [&::-moz-range-thumb]:cursor-pointer
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:border-3
              [&::-moz-range-thumb]:border-primary
              [&::-moz-range-thumb]:bg-[#241612]"
          />

          {/* Controle máximo */}
          <input
            type="range"
            aria-label="Preço máximo"
            min={minPrice}
            max={maxPrice}
            step={0.01}
            value={range.max}
            onChange={(event) =>
              handleMaxChange(Number(event.target.value))
            }
            className="pointer-events-none absolute inset-0 h-full w-full appearance-none bg-transparent
              [&::-webkit-slider-thumb]:pointer-events-auto
              [&::-webkit-slider-thumb]:h-3.75
              [&::-webkit-slider-thumb]:w-3.75
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:border-3
              [&::-webkit-slider-thumb]:border-primary
              [&::-webkit-slider-thumb]:bg-[#241612]
              [&::-moz-range-thumb]:pointer-events-auto
              [&::-moz-range-thumb]:h-2.25
              [&::-moz-range-thumb]:w-2.25
              [&::-moz-range-thumb]:cursor-pointer
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:border-3
              [&::-moz-range-thumb]:border-primary
              [&::-moz-range-thumb]:bg-[#241612]"
          />
        </div>

        {/* Valores */}
        <p className="font-mono text-[15px] leading-5 text-text-primary">
          Preço: {priceFormatter.format(range.min)} -{" "}
          {priceFormatter.format(range.max)} ETH
        </p>

        {/* Botão aplicar */}
        <button
          type="button"
          onClick={() => onApply(range)}
          className="h-9 w-23 rounded-md bg-primary px-3 py-2 font-mono text-base leading-5 font-bold text-[#140D0A] transition-colors hover:bg-primary-hover"
        >
          Aplicar
        </button>
      </div>
    </div>
  );
}
