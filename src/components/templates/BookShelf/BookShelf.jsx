import { ShelfTier } from "../../parts/ShelfTier";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import { useState, useContext } from "react";
import { BookDataContext } from "../../../main";
import { styles, getListStyle, getItemStyle } from "./styles";
import { NormalButton } from "../../parts/NormalButton";
import { AutoCenter } from "antd-mobile";

export const BookShelf = (props) => {
	const { activeTab, tier, setTier } = props;
	const [bookData, setBookData] = useContext(BookDataContext);

	const [stockBooks, setStockBooks] = useState(
		bookData
			.filter((shelf) => shelf.title === "ストック")
			.flatMap((stock) =>
				stock.books.map((book, index) => ({
					id: `0-${index}`,
					content: book.bookName,
					bookSize: book.bookSize,
				})),
			),
	);

	const [selectBooks, setSelectBooks] = useState([]);

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

	/* クリックされたとき */
	const handlerClickAction = (id) => {
		if (selectBooks.find((item) => item === id)) {
			setSelectBooks(selectBooks.filter((item) => item !== id));
		} else {
			setSelectBooks([...selectBooks, id]);
		}
	};

	/* ドラッグアンドドロップしたとき */
	const onDragEnd = (result) => {
		const { source, destination } = result;

		if (!destination) {
			return;
		}

		const isSourceStock = source.droppableId === "droppable-stock";
		const isDestinationStock = destination.droppableId === "droppable-stock";

		const start = isSourceStock
			? "droppable-stock"
			: parseInt(source.droppableId.charAt(source.droppableId.length - 1), 10);
		const end = isDestinationStock
			? "droppable-stock"
			: parseInt(
					destination.droppableId.charAt(destination.droppableId.length - 1),
					10,
			  );

		const tierTmp = tier.map((tier) => {
			return tier.filter((item) => !selectBooks.includes(item.id));
		});

		const removedTierTmp = tier
			.flat()
			.filter((item) => selectBooks.includes(item.id));
		const stockTmp = stockBooks.filter(
			(item) => !selectBooks.includes(item.id),
		);
		const removedStockTmp = stockBooks.filter((item) =>
			selectBooks.includes(item.id),
		);

		if (!isDestinationStock && tier[end].length !== 0) {
			let sourceSize;
			if (selectBooks.length !== 0) {
				sourceSize = selectBooks
					.map((id) => {
						return tier
							.flat()
							.concat(stockBooks)
							.filter((item) => item.id === id)
							.map((book) => book.bookSize);
					})
					.flat()
					.reduce((sum, value) => sum + value);
			} else {
				if (!isSourceStock) {
					sourceSize = tier[start][source.index].bookSize;
				} else {
					sourceSize = stockBooks[source.index].bookSize;
				}
			}

			const shelfWidth = parseInt(
				bookData.filter((shelf) => shelf.id === String(activeTab))[0].w,
			);

			const totalSize =
				tier[end]
					.map((item) => item.bookSize)
					.reduce((sum, value) => sum + value) + sourceSize;

			if (shelfWidth < totalSize) {
				setSelectBooks([]);
				return;
			}
		}

		if (isSourceStock || isDestinationStock) {
			if (selectBooks.length !== 0) {
				if (isSourceStock) {
					tierTmp[end].splice(
						destination.index,
						0,
						...removedStockTmp.concat(removedTierTmp),
					);
					setTier(tierTmp);
					setStockBooks(stockTmp);
				} else {
					stockTmp.splice(
						destination.index,
						0,
						...removedStockTmp.concat(removedTierTmp),
					);
					setTier(tierTmp);
					setStockBooks(stockTmp);
				}
			} else {
				if (source.droppableId === destination.droppableId) {
					reorder(
						isSourceStock ? stockBooks : tier[start],
						source.index,
						destination.index,
					);
				} else {
					move(
						isSourceStock ? stockBooks : tier[start],
						isDestinationStock ? stockBooks : tier[end],
						source.index,
						destination.index,
					);
				}
			}
		} else {
			if (selectBooks.length !== 0) {
				tierTmp[end].splice(
					destination.index,
					0,
					...removedStockTmp.concat(removedTierTmp),
				);
				setTier(tierTmp);
			} else {
				if (source.droppableId === destination.droppableId) {
					reorder(tier[start], source.index, destination.index);
				} else {
					move(tier[start], tier[end], source.index, destination.index);
				}
			}
		}
		setSelectBooks([]);
	};

	const onSave = () => {
		const newBook = (name) => {
			const aaa = bookData.filter((shelf) => shelf.title === "ストック");
			const bbb = aaa[0]?.books || [];
			const ccc = bbb.map((item) => {
				if (item.bookName === name) {
					return {
						isbn: item.isbn,
						bookName: item.bookName,
						bookSize: item.bookSize,
						id: item.id,
					};
				}
				return null;
			});

			const ddd = ccc.filter((item) => item !== null);
			const eee =
				ddd.length > 0
					? {
							isbn: ddd[0].isbn,
							bookName: ddd[0].bookName,
							bookSize: ddd[0].bookSize,
							id: ddd[0].id,
					  }
					: {};
			return eee;
		};

		const yurusanaiyoooo = tier.flatMap((item) => item);
		// console.log(yurusanaiyoooo);

		const killBook = (name) => {
			let cnt = -1;
			for (let i = 0; i < stockBooks.length; i++) {
				if (stockBooks[i]?.content === name) {
					// ?. を使って undefined チェック
					cnt = i;
					break; // 見つかったらループを終了
				}
			}
			if (cnt === -1) {
				return stockBooks;
			} else {
				return [...stockBooks.slice(0, cnt), ...stockBooks.slice(cnt + 1)];
			}
		};

		const killTier = () => {
			let killedData = stockBooks;
			tier.map((item) => {
				killedData = killBook(item.content);
			});
			return killedData;
		};

		const yurusanaiyo = [];
		tier.map((item) => {
			const yurusanaiyooo = [];
			item.map((book) => {
				yurusanaiyooo.push(newBook(book.content));
			});
			yurusanaiyo.push(yurusanaiyooo);
		});

		const turakunaiyo = killTier();
		const turasugi = [];
		turakunaiyo.map((item) => {
			turasugi.push(newBook(item.content));
			// newBook(item.content);
		});
		// console.log(turasugi);

		bookData[0].books = turasugi;
		bookData[activeTab].books = yurusanaiyo;
		setBookData(bookData);
		localStorage.setItem("bookData", JSON.stringify(bookData));
	};

	return (
		<div style={{ width: "100%", height: "65vh", marginTop: "5vh" }}>
			<DragDropContext onDragEnd={onDragEnd}>
				<div style={styles.tier}>
					{tier.map((item, index) => (
						<ShelfTier
							books={item}
							handlerClickAction={handlerClickAction}
							selectBooks={selectBooks}
							setSelectBooks={setSelectBooks}
							index={index}
							key={index}
						/>
					))}
				</div>
				<div style={styles.stock}>
					<Droppable droppableId="droppable-stock" direction="horizontal">
						{(provided, snapshot) => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
								style={getListStyle(snapshot.isDraggingOver)}
							>
								{stockBooks.map((item, index) => (
									<Draggable key={item.id} draggableId={item.id} index={index}>
										{(provided, snapshot) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												style={getItemStyle(
													snapshot.isDragging,
													provided.draggableProps.style,
													item.id,
													selectBooks,
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
				</div>
			</DragDropContext>
			<AutoCenter>
				<NormalButton text="保存" onClick={onSave} />
			</AutoCenter>
		</div>
	);
};
