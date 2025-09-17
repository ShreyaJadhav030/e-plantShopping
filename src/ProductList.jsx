import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch } from 'react-redux';
import { addItem } from '../CartSlice'; // Adjust path if needed

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          id: 1,
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15"
        },
        {
          id: 2,
          name: "Spider Plant",
          image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12"
        },
        {
          id: 3,
          name: "Peace Lily",
          image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
          description: "Removes mold spores and purifies the air.",
          cost: "$18"
        },
        {
          id: 4,
          name: "Areca Palm",
          image: "https://cdn.pixabay.com/photo/2020/01/13/18/02/areca-palm-4762429_1280.jpg",
          description: "Humidifies indoor air naturally.",
          cost: "$25"
        }
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        {
          id: 5,
          name: "Aloe Vera",
          image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
          description: "Soothing gel used for skin ailments.",
          cost: "$14"
        },
        {
          id: 6,
          name: "Tulsi (Holy Basil)",
          image: "https://cdn.pixabay.com/photo/2018/05/06/12/28/basil-3373206_1280.jpg",
          description: "Boosts immunity and treats colds.",
          cost: "$10"
        },
        {
          id: 7,
          name: "Mint",
          image: "https://cdn.pixabay.com/photo/2017/05/30/12/30/mint-2357981_1280.jpg",
          description: "Aids digestion and relieves nausea.",
          cost: "$8"
        },
        {
          id: 8,
          name: "Chamomile",
          image: "https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg",
          description: "Soothes anxiety and promotes sleep.",
          cost: "$15"
        }
      ]
    },
    {
      category: "Flowering Plants",
      plants: [
        {
          id: 9,
          name: "Rose",
          image: "https://cdn.pixabay.com/photo/2016/04/01/11/23/rose-1299202_1280.png",
          description: "Symbol of love and beauty with fragrant blooms.",
          cost: "$20"
        },
        {
          id: 10,
          name: "Hibiscus",
          image: "https://cdn.pixabay.com/photo/2018/08/26/20/25/hibiscus-3633355_1280.jpg",
          description: "Bright flowers used in herbal teas.",
          cost: "$18"
        },
        {
          id: 11,
          name: "Jasmine",
          image: "https://cdn.pixabay.com/photo/2017/05/23/20/36/jasmine-2347539_1280.jpg",
          description: "Sweet fragrance, used in perfumes.",
          cost: "$22"
        },
        {
          id: 12,
          name: "Sunflower",
          image: "https://cdn.pixabay.com/photo/2016/11/29/03/53/beautiful-1867323_1280.jpg",
          description: "Brightens gardens and provides seeds.",
          cost: "$16"
        }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({
      ...prev,
      [plant.id]: true
    }));
  };

  return (
    <div>
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index} className="category-section">
              <h2 className="category-title">{category.category}</h2>
              <div className="plants-grid">
                {category.plants.map((plant) => (
                  <div key={plant.id} className="product-card">
                    <img src={plant.image} alt={plant.name} className="product-img" />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p>Price: {plant.cost}</p>
                    <button
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.id]}
                      className="add-to-cart-btn"
                    >
                      {addedToCart[plant.id] ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
