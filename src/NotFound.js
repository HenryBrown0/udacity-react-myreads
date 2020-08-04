//Base
import React from "react";
//Router
import { Link } from "react-router-dom";
//Styles
import "./App.css";

const NotFound = () => {
	return (
		<div className="list-books">
			<div className="search-books-bar book-details-bar">
				<Link to="/" className="close-search book-details-home">
					Home
				</Link>
				<div className="list-books-title">
					<h1>404 Error - Page not found</h1>
				</div>
			</div>

			<div className="search-books-results">We couldn't find that.</div>

			<div className="open-search">
				<Link to="/search/">Add a book</Link>
			</div>
		</div>
	);
};

export default NotFound;
