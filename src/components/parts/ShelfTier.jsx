import { Button } from "antd-mobile";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import { useState } from "react";

export const ShelfTier = (props) => {
  const { books, handlerClickAction, selectBooks, setSelectBooks, index } =
    props;

  const grid = 8;

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "sandybrown" : "peru",
    padding: grid,
    overflow: "hidden",
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    height: "16.5vh",
    borderWidth: 3,
    borderColor: "brown",
    borderStyle: "solid",
  });

  const getItemStyle = (isDragging, draggableStyle, id) => ({
    userSelect: "none",
    width: "10%",
    margin: `0 0 ${grid} 0`,
    background:
      isDragging || selectBooks.find((item) => item === id)
        ? "lightblue"
        : "aliceblue",
    writingMode: "vertical-rl",
    textOrientation: "upright",
    fontSize: "10px",
    textAlign: "center",
    ...draggableStyle,
  });

  const handlerItemClicked = (id) => {
    if (selectBooks.find((item) => item === id)) {
      setSelectBooks(selectBooks.filter((item) => item !== id));
    } else {
      setSelectBooks([...selectBooks, id]);
    }
  };

  return (
    <Droppable droppableId={`droppable-${index}`} direction="horizontal">
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {books.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style,
                    item.id
                  )}
                  onClick={() => {
                    handlerClickAction(item.id);
                    handlerItemClicked(item.id);
                  }}
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
  );
};
