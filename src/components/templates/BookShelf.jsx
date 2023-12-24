import { Button, Card } from "antd-mobile"
import { ShelfTier } from "../parts/ShelfTier"
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import { useState } from "react";

export const BookShelf = (props) => {
  const { shelfData } = props;

  const [tier, setTier] = useState([[{id:"1-1",content:"進撃の巨人 1"},{id:"1-2",content:"進撃の巨人 2"},{id:"1-3",content:"進撃の巨人 3"}],
  [{id:"2-1",content:"ワンピース 1"},{id:"2-2",content:"ワンピース 2"},{id:"2-3",content:"ワンピース 3"}],
  []]);

  const [stockBooks, setStockBooks] = useState([{id:"3-1",content:"情報可視化入門"},{id:"3-2",content:"応用情報過去問"}]);

  const [selectBooks, setSelectBooks] = useState([]);

  const grid = 8;

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "sandybrown" : "peru",
    padding: grid,
    overflow: "hidden",
    display: "flex",
    flexWrap: "wrap",
    width:'100%',
    height:'16.5vh',
    borderWidth: 3,
    borderColor: "black",
    borderStyle: "solid",
    marginTop: "50px",
  });
  
  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    width:'10%',
    margin: `0 0 ${grid} 0`,
    background: isDragging ? "white" : "aliceblue",
    writingMode: "vertical-rl",
    textOrientation: "upright",
    fontSize: "10px",
    textAlign: "center",
    ...draggableStyle,
  });

  /* 並び替え, 同ブロック */
  const reorder = (list, startIndex, endIndex) => {
    const removed = list.splice(startIndex, 1); 
    list.splice(endIndex, 0, removed[0]);
  };

  /* 並び替え, 異ブロック */
  const move = (sourceList, destinationList, startIndex, endIndex) => {
    const [removeSource] = sourceList.splice(startIndex, 1);
    destinationList.splice(endIndex, 0, removeSource);
  };

  const handlerClickAction = (id) => {
    const flag = selectBooks.find((item) => item === id);
    if(flag) {
      setSelectBooks(selectBooks.filter(item => item !== id));
      console.log(id);
      console.log("要素を削除しました");
    } else {
      setSelectBooks([...selectBooks,id]);
      console.log(id);
      console.log("要素を追加しました");
    }
    console.log(selectBooks);
  }

  /* ドラッグアンドドロップしたとき*/
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const isSourceStock = source.droppableId === "droppable-stock";
    const isDestinationStock = destination.droppableId === "droppable-stock";

    const start = isSourceStock ? "droppable-stock" : parseInt(source.droppableId.charAt(source.droppableId.length - 1), 10);
    const end = isDestinationStock ? "droppable-stock" : parseInt(destination.droppableId.charAt(destination.droppableId.length - 1), 10);

    const tierTmp = tier.map((tier) => {
      return tier.filter(item => !selectBooks.includes(item.id));
    })
    const removedTierTmp = tier.flat().filter(item => selectBooks.includes(item.id));
    const stockTmp = stockBooks.filter(item => !selectBooks.includes(item.id));
    const removedStockTmp = stockBooks.filter(item => selectBooks.includes(item.id));

    if (isSourceStock || isDestinationStock) {
      if(selectBooks.length !== 0) {
        if(isSourceStock) {
          tierTmp[end].splice(destination.index, 0, ...removedStockTmp.concat(removedTierTmp));
          setTier(tierTmp);
          setStockBooks(stockTmp);
        } else {
          stockTmp.splice(destination.index, 0, ...removedStockTmp.concat(removedTierTmp));
          setTier(tierTmp);
          setStockBooks(stockTmp);
        }
      } else {
        if (source.droppableId === destination.droppableId) {
          reorder(isSourceStock ? stockBooks : tier[start], source.index, destination.index);
        } else {
          move(isSourceStock ? stockBooks : tier[start], isDestinationStock ? stockBooks : tier[end], source.index, destination.index);
        }
      }
    } else {
      if(selectBooks.length !== 0) {
        tierTmp[end].splice(destination.index, 0, ...removedStockTmp.concat(removedTierTmp));
        setTier(tierTmp);
      } else {
        if (source.droppableId === destination.droppableId) {
          reorder(tier[start], source.index, destination.index);
        } else {
          move(tier[start], tier[end], source.index, destination.index);
        }
      }
    }
  }
    
  /* const renderShelfTiers = (value) => {
    console.log(shelfData)
    const shelfTiers = [];
    for (let i = 0; i < value; i++) {
      shelfTiers.push(<ShelfTier key={i} />);
    }
    return shelfTiers;
  }; */

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
          borderStyle: "solid"
        }}>
          <DragDropContext onDragEnd={onDragEnd}>
            {tier.map( (item, index) => 
              <ShelfTier books={item} handlerClickAction={handlerClickAction} index={index} key={index}/>
            )}

            <Droppable
              droppableId="droppable-stock"
              direction="horizontal"
            >
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {stockBooks.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                          onClick={() => handlerClickAction(item.id)}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {/* {renderShelfTiers(shelfData?.boards)} */}

      </div>
    </div>
  );
};
