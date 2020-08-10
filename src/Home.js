// Base
import React from "react";
import PropTypes from "prop-types";
// Router
import { Link } from "react-router-dom";
// Styles
import "./App.css";
// Components
import BookShelf from "./BookShelf";

const Home = (props) => {
	const { books, changeShelves } = props;

	const sortedBooks = books.sort((a, b) => b.title - a.title);
	const shelves = [
		{
			human: "Currently Reading",
			camel: "currentlyReading"
		},
		{
			human: "Want to read",
			camel: "wantToRead"
		},
		{
			human: "Read",
			camel: "read"
		},
		{
			human: "None",
			camel: "none"
		}
	];

	return (
		<div className="list-books">
			<div className="list-books-title">
				<h1>MyReads</h1>
			</div>

			<div className="list-books-content">
				{shelves.map((shelf) => (
					<BookShelf
						key={shelf.camel}
						title={shelf.human}
						books={sortedBooks.filter((book) => book.shelf === shelf.camel)}
						changeShelves={changeShelves}
					/>
				))}
			</div>

			<div className="open-search">
				<Link to="/search/">Add a book</Link>
			</div>
		</div>
	);
};

Home.propTypes = {
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

export default Home;
