import "./App.css";
import { useState, useEffect } from "react";
import magicSword from "./img/baston.jpg";
import sword from "./img/espada.jpg";
import book from "./img/libro.jpg";
import hammer from "./img/martillo.jpg";
import potion from "./img/pocion.jpg";
import hat from "./img/sombrero.jpg";

const item = [
  {
    source: magicSword,
    name: "magic sword",
    price: 300,
  },
  {
    source: sword,
    name: "sword",
    price: 200,
  },
  {
    source: book,
    name: "book",
    price: 400,
  },
  {
    source: hammer,
    name: "hammer",
    price: 250,
  },
  {
    source: potion,
    name: "potion",
    price: 50,
  },
  {
    source: hat,
    name: "hat",
    price: 100,
  },
  
];

function App() {
  const [bag, setBag] = useState([]);
  const [gold, setGold] = useState(1000);
  const [broke ,setBroke] = useState(false);

  const removeFromBag = (itemToRemove) => 
  {
    setBag((prevBag) => {
      const index = prevBag.findIndex(item => item === itemToRemove);
      if (index !== -1)
      {
        const newBag = [...prevBag];
        newBag.splice(index, 1);
        return newBag;
      }
      return prevBag;
      });
  }
  
  useEffect(() => {
    if (gold <= 0) {
      setBroke(true);
    }
  }, [gold]);

  return (
    <div className="h-screen bg-black ">
      <Header />
      <Adventurer gold={gold} className="float-left" />
      {broke && <div className="font-serif text-gold text-center">Your are out of gold!</div>}
      <main className="grid grid-cols-2">
        <Items
          gold={gold}
          setGold={setGold}
          bag={bag}
          setBag={setBag}
          setBroke={setBroke}
          className="grid grid-cols-3 gap-4 p-4"
        />
        <Bag bag={bag} removeFromBag={removeFromBag} className="grid grid-cols-3 gap-4 p-4"/>
      </main>
    </div>
  );
}

const Header = () => {
  return (
    <div className="w-full p-3 bg-red-500">
      <h1 className="font-bold text-center text-4xl">
        EQUIP FOR THE ADVENTURE
      </h1>
    </div>
  );
};

const Bag = ({ bag, removeFromBag }) => {
  return (
    <div className="border-t-2 border-white">
      <h2 className="text-center text-white text-2xl">Your bag:</h2>
      <div className="flex justify-center">
        {bag.map((items) => (
          <BagItem source={items.source} name={items.name} removeFromBag={() => removeFromBag(items)} />
        ))}
      </div>
    </div>
  );
};

const BagItem = ({ source, name, removeFromBag}) => {
  return (
    <div className="rounded-lg border-2 mt-6 w-24 flex flex-col items-center m-auto" onClick={removeFromBag}>
      <img src={source} alt="item" />
      <h2 className="text-white">You choose</h2>
      <h1 className="text-center text-white">{name}</h1>
    </div>
  );
};

const Items = ({ setBag, bag, gold, setGold, setBroke }) => {
  return (
    <div className="flex justify-center">
      {item.map((item) => (
        <Item
          source={item.source}
          price={item.price}
          addToBag={() => {
            if (gold >= item.price) {
              setBag([...bag, item]);
              setGold(gold - item.price);
              setBroke(false);
            } else {
              setBroke(true);
            }
          }}
          broke={gold <= 0}
        />
      ))}
    </div>
  );
};

const Item = ({ source, addToBag, price, broke }) => {
  return (
    <div
      className="w-24 flex flex-col items-center m-auto mb-6"
      onClick={broke === false ? addToBag : null}
    >
      <img src={source} alt="item" />
      <div className="font-serif text-gold">{price} coins</div>
    </div>
  );
};

const Adventurer = ({ gold }) => {
  return <div className="font-serif text-gold p-6">Gold: {gold}</div>;
};

export default App;
