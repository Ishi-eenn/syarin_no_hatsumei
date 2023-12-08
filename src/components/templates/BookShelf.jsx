import { Button, Card } from "antd-mobile"
import { ShelfTier } from "../parts/ShelfTier"

export const BookShelf = () => {

  const tier = ['a', 'b', 'c'];

  return (
    <div style={{ width:'100%', height:'65vh', display:"flex" }}>
      <div
        style={{
          width:'80%',
          height:'50vh',
          margin:'auto',
          justifyContent:"center",
          borderWidth: 3,
          borderColor: "brown",
          borderStyle: "solid"
        }}>

        <ShelfTier />
        <ShelfTier />
        <ShelfTier />

        {tier.map( (item) => {
          <ShelfTier />
        })}

      </div>
    </div>
  )
}
