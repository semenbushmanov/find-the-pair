import { useState } from 'react'
import Tile from './components/Tile';
import { createTiles } from './utils/createTiles';

function App() {
  const [count, setCount] = useState(0)
  const [flipped, setFlipped] = useState([]);
  const [tiles, setTiles] = useState(createTiles());

  const initBoard = () => {
    const tiles = createTiles();
    setTiles(tiles);
    setFlipped([]);
    setCount(0);
  };

  const handleTileClick = (key) => {
    setCount((count) => count + 1);
    setFlipped([...flipped, key]);

    setTiles(tiles.map(tile =>
      tile.key === key ? { ...tile, flipped: true } : tile
    ));

    if (count > 10) {
      initBoard();
    }
  };

  return (
    <>
      <div className='min-h-screen bg-blue-300 mx-auto p-6 sm:p-8'>
        <div className='container mx-auto flex flex-col items-center p-4 text-center rounded-lg'>
          <div className='bg-white rounded-lg p-10'>
            {count < 10 && (
              <h1 className='text-2xl font-bold mb-6 sm:text-3xl sm:mb-8 text-blue-900'>
                Find the pair!
              </h1>
            )}
            {count >= 10 && (
              <div className='text-2xl font-bold mb-2 sm:text-3xl sm:mb-4 flex justify-evenly items-center flex-wrap mx-2 sm:mx-0'>
                <p className='text-green-700'>Victory!</p>
                <button onClick={() => setCount(0)} className='bg-sky-600 p-2 px-6 mx-2 sm:mx-0 rounded-lg text-white'>Play again</button>
              </div>
            )}
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-4 justify-items-center p-4'>
              {tiles.map(tile => (
                <Tile
                  count={count}
                  key={tile.key}
                  color={tile.color}
                  flipped={tile.flipped}
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
