// Base
import React from "react";
// Router
import { Switch, Route } from "react-router-dom";
// Pages
import Home from "./Home";
import Search from "./Search";
import BookDetails from "./BookDetails";
import NotFound from "./NotFound";
// ServerAPI
import * as BooksAPI from "./BooksAPI";
// Styles
import "./App.css";

class BooksApp extends React.Component {
	constructor() {
		super();
		this.state = {
			books: []
		};
	}

	componentDidMount() {
		BooksAPI.getAll().then((books) => this.setState({ books }));
	}

	render() {
		const { books } = this.state;

		const changeShelves = (bookId, shelf) => {
			const book = books.find(({ id: bId }) => bId === bookId);
			const arrayWithoutBook = books.filter(({ id: bId }) => bId !== bookId);

			BooksAPI.update(bookId, shelf).then(() => {
				this.setState(() => ({
					books: arrayWithoutBook.concat([{ ...book, shelf }])
				}));
			});
		};

		return (
			<Switch className="app">
				<Route
					exact
					path="/"
					render={() => (
						<Home books={books} changeShelves={changeShelves} />
					)}
				/>

				<Route
					exact
					path="/search/"
					render={() => (
						<Search
							books={books}
							changeShelves={changeShelves}
						/>
					)}
				/>

				<Route
					path="/book/"
					render={() => <BookDetails changeShelves={changeShelves} />}
				/>
				<Route component={NotFound} />
			</Switch>
		);
	}
}

export default BooksApp;
