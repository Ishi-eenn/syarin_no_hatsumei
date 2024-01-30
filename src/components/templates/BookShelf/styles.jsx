export const styles = {
  tier: {
    width: "80%",
    margin: "auto",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "brown",
    borderStyle: "solid",
  },
  stock: {
    width: "80%",
    height: "20vh",
    margin: "auto",
    justifyContent: "center",
  },
}

const grid = 8;

export const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "sandybrown" : "peru",
  padding: grid,
  overflow: "scroll",
  whiteSpace: 'nowrap',
  width: "100%",
  height: "16.5vh",
  borderWidth: 3,
  borderColor: "black",
  borderStyle: "solid",
  marginTop: "50px",
});

export const getItemStyle = (isDragging, draggableStyle, id, selectBooks) => ({
  userSelect: "none",
  display: 'inline-block',
  height:'95%',
  width: "40px",
  margin: `0 0 ${grid} 0`,
  background: isDragging ? "white" : "aliceblue",
  writingMode: "vertical-rl",
  textOrientation: "upright",
  fontSize: "10px",
  textAlign: "center",
  borderWidth: 2,
  borderColor: selectBooks.find((item) => item === id)
    ? "lightblue"
    : "transparent",
  borderStyle: "solid",
  ...draggableStyle,
});