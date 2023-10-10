import { FC, useState } from "react";
import Image from "next/image";

// lib
import { TILE_DIM } from "@/lib/const";
import { cn } from "@/lib/utils";

// enums
import { TileState } from "@/enums/game";

interface TileProps {
    tile: Tile;
    isSelected: boolean;
    onClick: (tile: Tile) => void;
}

const Tile: FC<TileProps> = ({ tile, isSelected, onClick }) => {
    const [isActive, setIsActive] = useState<boolean>(false);

    function getClassName(): string {
        return cn(
            "relative overflow-hidden flex items-center justify-center w-tile h-tile border transition-all duration-500 transform",
            isActive ? `bg-green-900 bg-transparent animate-static` : "",
            isSelected
                ? "border-yellow-300 border-2 bg-green-700 hover:bg-green-500"
                : "",
            tile.state === TileState.DEFAULT
                ? "border-green-500 bg-green-700 hover:bg-green-500"
                : "",
            tile.state === TileState.MOVEMENT
                ? "bg-blue-500 hover:bg-blue-300 border-blue-300"
                : "",
            tile.state === TileState.ABILITY_TARGET
                ? "bg-red-500 hover:bg-red-300 border-red-300"
                : ""
        );
    }

    function renderVagaryImage() {
        if (!tile.vagary) return null;
        const { name, imgPath } = tile.vagary.ownedVagary.baseVagary;
        const { owner } = tile.vagary.ownedVagary;
        return (
            <div className='transition-opacity opacity-90 hover:opacity-100'>
                <Image
                    src={`/card-images/${imgPath}`}
                    alt={`in-play-${name}--${owner}`}
                    width={TILE_DIM.width}
                    height={TILE_DIM.height}
                />
            </div>
        );
    }

    return (
        <button
            style={{
                backgroundImage: isActive ? "url(/static-noise.png)" : "none",
                backgroundSize: "200% 200%",
                backgroundBlendMode: "multiply",
                transition: "opacity 300ms ease, background-color 300ms ease",
                zIndex: isActive ? 10 : 0,
                border: isActive ? "none" : undefined,
                opacity: isActive ? 0.6 : 1,
            }}
            key={`tile--${tile.x}-${tile.y}`}
            onClick={() => onClick(tile)}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            onMouseLeave={() => setIsActive(false)}
            className={getClassName()}
        >
            {renderVagaryImage()}
        </button>
    );
};

export default Tile;
