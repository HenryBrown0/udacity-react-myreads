// Base
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// Router
import { Link } from "react-router-dom";
// Styles
import "./App.css";
// Components
import escapeRegExp from "escape-string-regexp";
import BookShelf from "./BookShelf";
// ServerAPI
import * as BooksAPI from "./BooksAPI";

const Search = (props) => {
	const { books, changeShelves } = props;

	const [showingBooks, setShowingBooks] = useState([]);
	const [query, setQuery] = useState("");

	const mergeBooks = (results, searchQueryString) => {
		const match = new RegExp(escapeRegExp(searchQueryString), "i");
		// find local results
		const localResults = books.filter(
			(b) => match.test(b.title) || match.test(b.authors)
		);

		const localBookIds = localResults.map((localBook) => localBook.id);
		// remove local books from sever results
		const serverResults = results.filter(
			(serverBook) => !localBookIds.includes(serverBook.id)
		);

		// concat results and sort by title
		const newShowingBooks = [...localResults, ...serverResults].sort(
			(a, b) => b.title - a.title
		);
		// set new state
		setShowingBooks(newShowingBooks);
	};

	const searchQuery = (searchQueryString) => {
		BooksAPI.search(searchQueryString).then((results) => {
			if (!results) {
				setShowingBooks([]);
			} else {
				mergeBooks(results, searchQueryString);
			}
		});
	};

	const updateQuery = (requestQuery) => {
		const url = new URL(window.location);

		setQuery(requestQuery);

		if (requestQuery) {
			window.history.pushState({ requestQuery }, "", `${url.origin}${url.pathname}?q=${requestQuery}`);
			searchQuery(requestQuery);
		} else {
			window.history.pushState({ requestQuery }, "", `${url.origin}${url.pathname}`);
			setShowingBooks([]);
		}
	};

	window.onpopstate = (event) => {
		const { requestQuery } = event.state;

		setQuery(requestQuery);

		if (requestQuery) {
			searchQuery(requestQuery);
		} else {
			setShowingBooks([]);
		}
	};

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);

		if (urlParams.has("q")) updateQuery(urlParams.get("q"));
	}, []);

	return (
		<div className="search-books">
			<div className="search-books-bar">
				<Link className="close-search" to="/">
					Close
				</Link>
				<div className="search-books-input-wrapper">
					<input
						type="text"
						placeholder="Search by title or author"
						value={query}
						onChange={(event) => updateQuery(event.target.value)}
					/>
				</div>
			</div>
			<div className="search-books-results">
				<BookShelf
					title={`Showing ${showingBooks.length} books`}
					books={showingBooks}
					changeShelves={changeShelves}
				/>
			</div>
		</div>
	);
};

Search.propTypes = {
	changeShelves: PropTypes.func.isRequired,
	books: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			authors: PropTypes.arrayOf(PropTypes.string).isRequired,
			shelf: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			imageLinks: PropTypes.shape({
				smallThumbnail: PropTypes.string
			})
		}).isRequired
	).isRequired
};

export default Search;
