// Base
import React from "react";
import PropTypes from "prop-types";
// Router
import { Link } from "react-router-dom";
// Styles
import "./App.css";
// Components
import BookThumbnail from "./BookThumbnail";
// ServerAPI
import * as BooksAPI from "./BooksAPI";

class BookDetails extends React.Component {
	constructor() {
		super();
		this.state = {
			book: {},
			loading: true
		};
	}

	componentDidMount() {
		this.setState({ book: { title: "Not found" } });
		const currentRoute = window.location.href;
		const bookID = currentRoute.slice(currentRoute.search("/book/") + 6, -1);
		BooksAPI.get(bookID).then((book) => {
			this.setState({ book, loading: false });
		});
	}

	render() {
		const { changeShelves } = this.props;
		const { book, loading } = this.state;

		if (loading) {
			return (
				<div className="bookshelf">
					<div className="search-books-bar book-details-bar">
						<Link to="/" className="close-search book-details-home">
							Home
						</Link>
						<div className="list-books-title">
							<h1>Loading...</h1>
						</div>
					</div>
					<div className="search-books-results">Loading...</div>
				</div>
			);
		}

		if (!book) {
			return (
				<div className="bookshelf">
					<div className="search-books-bar book-details-bar">
						<Link to="/" className="close-search book-details-home">
							Home
						</Link>
						<div className="list-books-title">
							<h1>Book not found</h1>
						</div>
					</div>
					<div className="search-books-results">Book not found</div>
				</div>
			);
		}

		return (
			<div className="bookshelf">
				<div className="search-books-bar book-details-bar">
					<Link to="/" className="close-search book-details-home">
						Home
					</Link>
					<div className="list-books-title">
						<h1>
							{`${book.title} - ${book.authors}`}
						</h1>
					</div>
				</div>
				<div className="search-books-results">
					<BookThumbnail
						className="bookdetails-center"
						book={book}
						changeShelves={changeShelves}
					/>
					<ul>
						<li>
							Cateogories:
							{book.categories}
						</li>
						<li>
							Description:
							{book.description}
						</li>
						<li>
							Published Date:
							{book.publishedDate}
						</li>
					</ul>
					<a href={book.previewLink}>Preview book</a>
				</div>
			</div>
		);
	}
}

BookDetails.propTypes = {
	changeShelves: PropTypes.func.isRequired
};

export default BookDetails;
