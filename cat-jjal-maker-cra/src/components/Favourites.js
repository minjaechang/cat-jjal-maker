import CatItem from './CatItem';

function Favourites({ favourites }) {
  if (favourites.length === 0) {
    // conditional rendering
    return <div>사진 위 하트를 눌러 고양이 사진을 저장해보세요!</div>;
  }

  return (
    <ul className='favorites'>
      {favourites.map((cat) => {
        return <CatItem img={cat} key={cat} />;
      })}
    </ul>
  );
}

export default Favourites;
