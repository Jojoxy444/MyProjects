import React, { useState } from 'react';

const ProduitsList = ({ produits }) => {
  const [detailsVisible, setDetailsVisible] = useState({});

  const toggleDetails = (index) => {
    setDetailsVisible((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div>
      {produits.map((produit, index) => (
        <div key={index}>
          <div onClick={() => toggleDetails(index)}>
            {produit.produit} - {produit.prix_total} €
            <span>{detailsVisible[index] ? ' ▲' : ' ▼'}</span>
          </div>
          {detailsVisible[index] && (
            <div>
              <ul>
                {produit.ingredients.map((ingredient, id) => (
                  <li key={id}>{ingredient}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProduitsList;
