import { useState } from "react";
import { Search } from "lucide-react";

interface NFTGalleryProps {
  images: string[];
  title: string;
}

export function NFTGallery({
  images,
  title,
}: NFTGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    return null;
  }

  const galleryImages = images.slice(0, 4);

  const selectedImage =
    galleryImages[selectedIndex] ?? galleryImages[0];

  return (
    <div
      className="
        flex w-full flex-col gap-4
        md:flex-row md:items-start md:gap-7
      "
    >
      {/* Miniaturas */}
      <div
        className="
          order-2 flex gap-3 overflow-x-auto
          md:order-1 md:flex-col
          md:overflow-visible
        "
      >
        {galleryImages.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setSelectedIndex(index)}
            aria-label={`Visualizar imagem ${index + 1} de ${title}`}
            aria-pressed={selectedIndex === index}
            className={`
              h-20 w-20 shrink-0 cursor-pointer
              overflow-hidden rounded-lg border-2
              transition-all duration-200
              md:h-25 md:w-25
              ${
                selectedIndex === index
                  ? "border-primary"
                  : "border-transparent hover:border-primary/50"
              }
            `}
          >
            <img
              src={image}
              alt={`${title} - miniatura ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image - Container externo */}
      <div
        className="
          order-1 w-full min-w-0
          rounded-md bg-[#241612] p-4
          md:order-2
          md:h-111 md:w-111 md:shrink-0
        "
      >
        {/* NFT Collection Artwork */}
        <div
          className="
            relative mx-auto aspect-square
            w-full overflow-hidden
            rounded-3xl
            md:h-101 md:w-101
          "
        >
          <img
            src={selectedImage}
            alt={`${title} - imagem ${selectedIndex + 1}`}
            className="h-full w-full object-cover"
          />

          {/* Ícone de zoom */}
          <span
            aria-hidden="true"
            className="
              absolute right-3 top-3
              flex h-9 w-9 items-center
              justify-center rounded-full
              bg-surface/90 text-white
            "
          >
            <Search size={21} />
          </span>
        </div>
      </div>
    </div>
  );
}