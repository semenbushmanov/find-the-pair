import { COLORS, TILES_NUMBER } from "./constants";

export const createTiles = () => {
  const tiles = [];
  const colors = [...COLORS];

  for (let i = 0; i < TILES_NUMBER; i++) {
    const pickedColor = Math.floor(Math.random() * colors.length) + 1;
    
    const tile = {
      key: i,
      color: colors[pickedColor - 1],
      flipped: false,
      matched: false
    }

    colors.splice(pickedColor - 1, 1);
    tiles.push(tile);
  }

  return tiles;
};
