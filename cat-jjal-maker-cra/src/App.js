import React, { useState, useEffect } from 'react';
import './App.css';
import Title from './components/Title';
import Form from './components/Form';
import MainCard from './components/MainCard';
import Favourites from './components/Favourites';

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = 'https://cataas.com';
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};

const App = () => {
  const CAT1 = 'https://cataas.com/cat/60b73094e04e18001194a309/says/react';

  // function을 등록함으로써 불필요하게 localStorage에 접근하지 않도록 성능 개선
  // 실행될 때 한번만 localStorage에 접근하도록
  const [counter, setCounter] = useState(() => {
    return jsonLocalStorage.getItem('counter');
  });

  const [mainCat, setMainCat] = useState(CAT1);
  const [favourites, setFavourites] = useState(() => {
    return jsonLocalStorage.getItem('favourites') || [];
  });

  const alreadyFavourite = favourites.includes(mainCat);

  // async function setInitialCat() {
  //   const newCat = await fetchCat('First Cat');
  //   setMainCat(newCat);
  // }

  // useEffect(() => {
  //   setInitialCat();
  // }, []);

  async function updateMainCat(value) {
    const newCat = await fetchCat(value);

    setMainCat(newCat);
    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem('counter', nextCounter);
      return nextCounter;
    });
  }

  function handleHeartClick() {
    const nextFavourites = [...favourites, mainCat];
    setFavourites(nextFavourites);
    jsonLocalStorage.setItem('favourites', nextFavourites);
  }

  const counterTitle = counter === null ? '' : `${counter}번째`;

  return (
    <div>
      <Title>{counterTitle} 고양이 가라사대</Title>
      <Form updateMainCat={updateMainCat} />
      <MainCard
        img={mainCat}
        onHeartClick={handleHeartClick}
        alreadyFavourite={alreadyFavourite}
      />
      <Favourites favourites={favourites} />
    </div>
  );
};

export default App;
