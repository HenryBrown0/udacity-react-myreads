// Base
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// Router
import { Link } from "react-router-dom";
// Styles
import "../App.css";
// Components
import escapeRegExp from "escape-string-regexp";
import BookShelf from "../components/BookShelf";
import useDebounce from "../hooks/useDebounce";
// ServerAPI
import * as BooksAPI from "../BooksAPI";

const Search = (props) => {
	const { books, changeShelves } = props;

	const [localBooks, setLocalBooks] = useState([]);
	const [networkBooks, setNetworkBooks] = useState([]);
	const [query, setQuery] = useState("");

	const debouncedSearch = useDebounce(query, 500);

	const findLocalBooks = (requestQuery) => {
		const match = new RegExp(escapeRegExp(requestQuery), "i");

		return books
			.filter((b) => match.test(b.title) || match.test(b.authors))
			.sort((a, b) => b.title - a.title);
	};

	const fetchNetworkBooks = async (requestQuery) => {
		if (!requestQuery) {
			return setNetworkBooks([]);
		}

		let results;
		try {
			results = await BooksAPI.search(requestQuery);
		} catch (error) {
			console.error(error);
			return null;
		}

		// remove local books from sever results
		const localBookIds = localBooks.map((localBook) => localBook.id);

		const filteredResults = results
			.filter((serverBook) => !localBookIds.includes(serverBook.id))
			.sort((a, b) => b.title - a.title);

		return setNetworkBooks(filteredResults);
	};

	const updateQuery = (requestQuery) => {
		const url = new URL(window.location);

		setQuery(requestQuery);

		if (requestQuery) {
			setLocalBooks(findLocalBooks(requestQuery));
			window.history.pushState({ requestQuery }, "", `${url.origin}${url.pathname}?q=${requestQuery}`);
		} else {
			setLocalBooks([]);
			setNetworkBooks([]);
			window.history.pushState({ requestQuery }, "", `${url.origin}${url.pathname}`);
		}
	};

	window.onpopstate = (event) => {
		const { requestQuery } = event.state;

		updateQuery(requestQuery);
	};

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);

		if (urlParams.has("q")) updateQuery(urlParams.get("q"));
	}, [books]);

	useEffect(() => {
		if (query) {
			fetchNetworkBooks(query);
		}
	}, [debouncedSearch]);

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
					title={`Found ${localBooks.length} local book${localBooks.length !== 1 ? "s" : ""}`}
					books={localBooks}
					changeShelves={changeShelves}
				/>
				<BookShelf
					title={`Showing ${networkBooks.length} network book${networkBooks.length !== 1 ? "s" : ""}`}
					books={networkBooks}
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
