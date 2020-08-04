//Base
import React from "react";
import PropTypes from "prop-types";
//Router
import { Link } from "react-router-dom";
//Styles
import "./App.css";
//Components
import BookShelf from "./BookShelf";
import escapeRegExp from "escape-string-regexp";
//ServerAPI
import * as BooksAPI from "./BooksAPI";

class Search extends React.Component {
	state = {
		showingBooks: [],
		query: "",
	};

	updateQuery = (requestQuery) => {
		const query = requestQuery;
		this.setState({ query: query });
		query ? this.searchQuery(query) : this.setState({ showingBooks: [] });
	};

	searchQuery = (query) => {
		BooksAPI.search(query).then((results) => {
			results[0] === undefined
				? this.setState({ showingBooks: [] })
				: this.mergeBooks(results, query);
		});
	};

	mergeBooks = (results, query) => {
		const match = new RegExp(escapeRegExp(query), "i");
		// find local results
		const localResults = this.props.books.filter(
			(b) => match.test(b.title) || match.test(b.authors)
		);

		const localBookIds = localResults.map((localBook) => localBook.id);
		// remove local books from sever results
		const serverResults = results.filter(
			(serverBook) => !localBookIds.includes(serverBook.id)
		);

		// concat results and sort by title
		const showingBooks = [...localResults, ...serverResults].sort(
			(a, b) => b.title - a.title
		);
		// set new state
		this.setState({ showingBooks });
	};

	render() {
		const { showingBooks, query } = this.state;

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
							onChange={(event) => this.updateQuery(event.target.value)}
							autoFocus
						/>
					</div>
				</div>
				<div className="search-books-results">
					<BookShelf
						title={title}
						books={showingBooks}
						changeShelves={this.props.changeShelves}
					/>
				</div>
			</div>
		);
	}
}

Search.propTypes = {
	changeShelves: PropTypes.func.isRequired,
	books: PropTypes.array.isRequired,
};

export default Search;
