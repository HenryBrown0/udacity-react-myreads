import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Header = (props) => {
	const { title } = props;
	return (
		<div className="search-books-bar book-details-bar">
			<Link to="/" className="close-search book-details-home">
				Home
			</Link>
			<div className="list-books-title">
				<h1>{title}</h1>
			</div>
		</div>
	);
};

Header.propTypes = {
	title: PropTypes.string.isRequired
};
export default Header;
