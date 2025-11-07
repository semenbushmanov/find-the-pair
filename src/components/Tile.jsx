export default function Tile({ color, flipped, matched, onClick }) {
  return (
    <button 
        onClick={onClick} 
        className={'w-20 h-20 sm:w-20 sm:h-30 md:w-30 md:h-40 rounded-lg transition-all duration-300 ' 
          + (flipped ? color : 'bg-gray-800 hover:scale-105 ')
          + (matched ? 'opacity-0 transition-none ' : '')}
        disabled={flipped || matched}
    >
    </button>
  );
}
