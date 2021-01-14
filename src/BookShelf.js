// Base
import React from "react";
import PropTypes from "prop-types";
// Styles
import "./App.css";
// Components
import BookThumbnail from "./BookThumbnail";

const BookShelf = (props) => {
	const { title, changeShelves, books } = props;

	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{title}</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					{books
						.sort((a, b) => b.title - a.title)
						.map((book) => (
							<li key={book.id}>
								<BookThumbnail book={book} changeShelves={changeShelves} />
							</li>
						))}
				</ol>
			</div>
		</div>
	);
};

BookShelf.propTypes = {
	title: PropTypes.string.isRequired,
	changeShelves: PropTypes.func.isRequired,
	books: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			authors: PropTypes.arrayOf(PropTypes.string),
			shelf: PropTypes.string,
			title: PropTypes.string.isRequired,
			imageLinks: PropTypes.shape({
				smallThumbnail: PropTypes.string
			})
		}).isRequired
	).isRequired
};

export default BookShelf;
