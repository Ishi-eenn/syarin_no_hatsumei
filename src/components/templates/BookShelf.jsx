import React from "react";
import { Button, Card } from "antd-mobile";
import { ShelfTier } from "../parts/ShelfTier";

export const BookShelf = (props) => {
  const { shelfData } = props;

  const renderShelfTiers = (value) => {
    console.log(shelfData)
    const shelfTiers = [];
    for (let i = 0; i < value; i++) {
      shelfTiers.push(<ShelfTier key={i} />);
    }
    return shelfTiers;
  };

  return (
    <div style={{ width: "100%", height: "65vh", display: "flex" }}>
      <div
        style={{
          width: "80%",
          height: "50vh",
          margin: "auto",
          justifyContent: "center",
          borderWidth: 3,
          borderColor: "brown",
          borderStyle: "solid",
        }}
      >
        {renderShelfTiers(shelfData?.boards)}
      </div>
    </div>
  );
};
