// Base
import React, { useState, useEffect } from "react";
// Router
import { Switch, Route } from "react-router-dom";
// Pages
import Home from "./views/Home";
import Search from "./views/Search";
import BookDetails from "./views/BookDetails";
import NotFound from "./views/NotFound";
// ServerAPI
import * as BooksAPI from "./BooksAPI";
// Styles
import "./App.css";

const BooksApp = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [books, setBooks] = useState([]);

	useEffect(() => {
		BooksAPI.getAll()
			.then((requestBooks) => {
				setBooks(requestBooks);
				setIsLoading(false);
			});
	}, []);

	const changeShelves = (bookId, shelf) => {
		const book = books.find(({ id: bId }) => bId === bookId);
		const arrayWithoutBook = books.filter(({ id: bId }) => bId !== bookId);

		BooksAPI.update(bookId, shelf).then(() => {
			setBooks(arrayWithoutBook.concat([{ ...book, shelf }]));
		});
	};

	return (
		<Switch className="app">
			<Route
				exact
				path="/"
				render={() => (
					<Home
						books={books}
						changeShelves={changeShelves}
						isLibraryLoading={isLoading}
					/>
				)}
			/>

			<Route
				exact
				path="/search/"
				render={() => (
					<Search
						books={books}
						changeShelves={changeShelves}
						isLibraryLoading={isLoading}
					/>
				)}
			/>

			<Route
				exact
				path="/book/:bookId"
				render={() => (
					<BookDetails
						changeShelves={changeShelves}
						books={books}
					/>
				)}
			/>
			<Route component={NotFound} />
		</Switch>
	);
};

export default BooksApp;
