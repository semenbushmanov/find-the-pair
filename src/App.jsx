import { useState,useEffect } from 'react'
import Tile from './components/Tile';
import { TILES_NUMBER } from './utils/constants';
import { createTiles } from './utils/createTiles';

function App() {
  const [tiles, setTiles] = useState(createTiles());
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [victory, setVictory] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (matched.length === TILES_NUMBER) {
      setVictory(true);
    }
  }, [matched]);

  const initBoard = () => {
    const tiles = createTiles();
    setTiles(tiles);
    setFlipped([]);
    setMatched([]);
    setVictory(false);
  };

  const handleTileClick = (key) => {
    if (busy) return;

    const updatedFlip = [...flipped, key];
    setFlipped([...flipped, key]);

    setTiles(tiles.map(tile =>
      tile.key === key ? { ...tile, flipped: true } : tile
    ));

    if (updatedFlip.length > 1) {
      const [firstTileKey, secondTileKey] = updatedFlip;
      if (tiles[firstTileKey].color === tiles[secondTileKey].color) {
        setBusy(true);

        setTimeout(() => {
          setMatched([...matched, firstTileKey, secondTileKey]);

          setTiles(tiles.map(tile =>
            tile.key === firstTileKey || tile.key === secondTileKey ? { ...tile, matched: true } : tile
          ));

          setBusy(false);
        }, 600);
      } else {
        setBusy(true);

        setTimeout(() => {
          setTiles(tiles.map(tile => ({ ...tile, flipped: false })));

          setBusy(false);
        }, 600);
      }
      
      setFlipped([]);
    }
  };

  return (
    <>
      <div className='min-h-screen bg-blue-200 mx-auto p-6 sm:p-8'>
        <div className='container mx-auto flex flex-col items-center p-4 text-center rounded-lg bg-'>
          <div className='bg-blue-300 rounded-lg p-10'>
            {!victory && (
              <h1 className='text-2xl font-bold mb-6 sm:text-3xl sm:mb-8 text-gray-800'>
                Find the pair!
              </h1>
            )}
            {victory && (
              <div className='text-2xl font-bold mb-2 sm:text-3xl sm:mb-4 flex justify-evenly items-center flex-wrap mx-2 sm:mx-0'>
                <p className='text-green-800'>Victory!</p>
                <button onClick={() => initBoard()} className='bg-sky-700 p-2 px-6 mx-2 sm:mx-0 rounded-lg text-white'>Play again</button>
              </div>
            )}
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-4 justify-items-center p-4'>
              {tiles.map(tile => (
                <Tile
                  color={tile.color}
                  flipped={tile.flipped}
                  matched={tile.matched}
                  onClick={() => handleTileClick(tile.key)}
                />
              ))}
            </div>
          </div>   
        </div>
      </div>
    </>
  )
}

export default App
