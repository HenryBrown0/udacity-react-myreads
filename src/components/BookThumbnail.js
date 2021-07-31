// Base
import React from "react";
import PropTypes from "prop-types";
// Router
import { Link } from "react-router-dom";
// Styles
import "../App.css";

const PLACE_HOLDER_THUMBNAIL = "https://via.placeholder.com/128x193?text=No%20Cover";

const BookThumbnail = (props) => {
	const { book, changeShelves } = props;

	let bookThumbnail = PLACE_HOLDER_THUMBNAIL;
	if (book.imageLinks) {
		bookThumbnail = `https${book.imageLinks.smallThumbnail.substring(4)}`;
	}

	return (
		<div className="book fadeIn">
			<div className="book-top">
				<Link
					to={`/book/${book.id}/`}
					className="book-cover"
					style={{
						width: 128,
						height: 193,
						backgroundImage: `url(${bookThumbnail})`
					}}
				/>
				<div className="book-shelf-changer">
					<select
						defaultValue={book.shelf || "none"}
						onChange={(event) => changeShelves(book.id, event.target.value)}
					>
						<option disabled>Move to...</option>
						<option value="currentlyReading">Currently Reading</option>
						<option value="wantToRead">Want To Read</option>
						<option value="read">Read</option>
						<option value="none">None</option>
					</select>
				</div>
			</div>
			<div className="book-title">{book.title}</div>
			<div className="book-authors">
				{book.authors ? book.authors.join(", ") : ""}
			</div>
		</div>
	);
};

BookThumbnail.propTypes = {
	changeShelves: PropTypes.func.isRequired,
	book: PropTypes.shape({
		id: PropTypes.string.isRequired,
		authors: PropTypes.arrayOf(PropTypes.string),
		shelf: PropTypes.string,
		title: PropTypes.string.isRequired,
		imageLinks: PropTypes.shape({
			smallThumbnail: PropTypes.string
		})
	}).isRequired
};

export default BookThumbnail;
