import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Top } from "./components/pages/Top";
import { NotFound } from "./components/pages/NotFound";
import React, { createContext } from "react";
import { FooterTabs } from "./common/Footer/FooterTabs";
import { ListPage } from "./components/pages/ListPage";
import { SafeArea } from "antd-mobile";
import { AddPage } from "./components/pages/AddPage";

export const BookDataContext = createContext();

export const Main = () => {
	const DEFAULT_DATA = [
		{
			title: "ストック",
			books: [
				{
					isbn: 9784065334928,
					bookName: "中間管理録トネガワ",
					bookSize: 15,
					id: 1,
				},
				{
					isbn: 9784065327722,
					bookName: "星降る王国のニナ（11）",
					bookSize: 15,
					id: 1,
				},
				{
					isbn: 9784065334928,
					bookName: "情報可視化入門",
					bookSize: 15,
					id: 1,
				},
				{
					isbn: 9784065334928,
					bookName: "情報可視化入門",
					bookSize: 15,
					id: 1,
				},
				{
					isbn: 9784065334928,
					bookName: "情報可視化入門",
					bookSize: 15,
					id: 1,
				},
				{
					isbn: 9784065334928,
					bookName: "情報可視化入門",
					bookSize: 15,
					id: 1,
				},
				{
					isbn: 9784065334928,
					bookName: "情報可視化入門",
					bookSize: 15,
					id: 1,
				},
				{
					isbn: 9784065334928,
					bookName: "情報可視化入門",
					bookSize: 15,
					id: 1,
				},
				{
					isbn: 9784065334928,
					bookName: "情報可視化入門",
					bookSize: 15,
					id: 1,
				},
				{
					isbn: 9784065334928,
					bookName: "情報可視化入門",
					bookSize: 15,
					id: 1,
				},
				{
					isbn: 9784065334928,
					bookName: "情報可視化入門",
					bookSize: 15,
					id: 1,
				},
			],
		},
		{
			title: "本棚1",
			id: "1",
			w: "140",
			/* 段数分の空配列追加して作成 例:2段分のため2つの空配列を用意 */
			books: [[], []],
		},
		{
			title: "本棚2",
			id: "2",
			w: "140",
			books: [
				[
					{
						isbn: 9784065334928,
						bookName: "中間管理録トネガワ",
						bookSize: 15,
						id: 1,
					},
					{
						isbn: 9784065327722,
						bookName: "星降る王国のニナ（11）",
						bookSize: 15,
						id: 1,
					},
				],
				[
					{
						isbn: 9784065334928,
						bookName: "情報可視化入門",
						bookSize: 15,
						id: 1,
					},
				],
			],
		},
	];

	// localStorage.clear();
	const localBookData = JSON.parse(localStorage.getItem("bookData"));
	const [bookData, setBookData] = React.useState(localBookData);
	if (bookData === null) {
		localStorage.setItem("bookData", JSON.stringify(DEFAULT_DATA));
		setBookData(DEFAULT_DATA);
	}

	return (
		<div style={{ height: "100vh" }}>
			<BookDataContext.Provider value={[bookData, setBookData]}>
				<BrowserRouter>
					<SafeArea position="top" style={{ height: "5vh" }} />
					<Routes>
						<Route exact path="/" element={<Top />} />
						<Route path="/list" element={<ListPage />} />
						<Route path="*" element={<NotFound />} />
						<Route path="/add" element={<AddPage />} />
					</Routes>
					<FooterTabs />
				</BrowserRouter>
			</BookDataContext.Provider>
		</div>
	);
};
