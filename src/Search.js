// Base
import React from "react";
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

class Search extends React.Component {
	constructor() {
		super();
		this.state = {
			showingBooks: [],
			query: ""
		};
	}

	render() {
		const { books, changeShelves } = this.props;
		const { showingBooks, query } = this.state;

		const normaliseBook = (unNormalisedBook) => ({
			id: unNormalisedBook.id || null,
			authors: unNormalisedBook.authors || [],
			shelf: unNormalisedBook.shelf || "none",
			title: unNormalisedBook.title || null
		});

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
			).map(normaliseBook);

			// concat results and sort by title
			const newShowingBooks = [...localResults, ...serverResults].sort(
				(a, b) => b.title - a.title
			);
			// set new state
			this.setState({ showingBooks: newShowingBooks });
		};

		const searchQuery = (searchQueryString) => {
			BooksAPI.search(searchQueryString).then((results) => {
				if (!results) {
					this.setState({ showingBooks: [] });
				} else {
					mergeBooks(results, searchQueryString);
				}
			});
		};

		const updateQuery = (requestQuery) => {
			this.setState({ query: requestQuery });
			if (requestQuery) {
				searchQuery(requestQuery);
			} else {
				this.setState({ showingBooks: [] });
			}
		};

		const title = `Showing ${showingBooks.length} books`;

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
						title={title}
						books={showingBooks}
						changeShelves={changeShelves}
					/>
				</div>
			</div>
		);
	}
}

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
