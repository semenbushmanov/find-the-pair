export default function Tile({ count, color, flipped, onClick }) {
  return (
    <button 
      onClick={onClick} 
      className={'w-20 h-20 sm:w-20 sm:h-30 md:w-30 md:h-40 rounded-lg ' + (flipped ? color : 'bg-gray-800')}
    >
      {count}
    </button>
  );
}
