//Base
import React from "react";
import PropTypes from "prop-types";
//Router
import { Link } from "react-router-dom";
//Styles
import "./App.css";
//Components
import BookShelf from "./BookShelf";

const Home = (props) => {
	const books = props.books.sort((a, b) => b.title - a.title);
	const { changeShelves } = props;
	const shelves = [
		{
			human: "Currently Reading",
			camel: "currentlyReading",
		},
		{
			human: "Want to read",
			camel: "wantToRead",
		},
		{
			human: "Read",
			camel: "read",
		},
		{
			human: "None",
			camel: "none",
		},
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
						books={books.filter((book) => book.shelf === shelf.camel)}
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
	books: PropTypes.array.isRequired,
};

export default Home;
