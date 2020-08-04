//Base
import React from "react";
import PropTypes from "prop-types";
//Router
import { Link } from "react-router-dom";
//Styles
import "./App.css";

const BookThumbnail = (props) => {
	const { book, changeShelves } = props;
	let img = null;
	book.imageLinks
		? (img = `https${book.imageLinks.smallThumbnail.substring(4)}`)
		: (img = `https://via.placeholder.com/128x193?text=No%20Cover`);
	if (!book.shelf) {
		book.shelf = "none";
	}
	const link = `/book/${book.id}/`;
	return (
		<div className="book fadeIn">
			<div className="book-top">
				<Link
					to={link}
					className="book-cover"
					style={{ width: 128, height: 193, backgroundImage: `url(${img})` }}
				></Link>
				<div className="book-shelf-changer">
					<select
						defaultValue={book.shelf}
						onChange={(event) => changeShelves(book, event.target.value)}
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
	book: PropTypes.object.isRequired,
};

export default BookThumbnail;
