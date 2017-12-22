//Base
import React from 'react'
import PropTypes from 'prop-types';
//Router
import { Link } from 'react-router-dom'
//Styles
import './App.css'
//Components
import BookThumbnail from './BookThumbnail'
//ServerAPI
import * as BooksAPI from './BooksAPI'

class BookDetails extends React.Component {
  state = {
    book: []
  }

  componentDidMount() {
    this.setState({ book: { title: "Not found" }})
    const currentRoute = window.location.href;
    const bookID = currentRoute.slice(currentRoute.search("/book/")+6, -1);
    BooksAPI.get(bookID).then((book) => { this.setState({ book }) })
  }

  render() {
    const { book } = this.state

    const found = book => {
    const {
      authors, title, categories, description, publishedDate, previewLink
    } = book;
    return (
      <div className="bookshelf">
        <div className="search-books-bar book-details-bar">
          <Link to="/" className="close-search book-details-home">Home</Link>
            <div className="list-books-title">
            <h1>{title} - {authors}</h1>
          </div>
        </div>
        <div className="search-books-results">
          <BookThumbnail
            className="bookdetails-center"
            book={book}
            changeShelves={this.props.changeShelves}
          />
          <ul>
            <li>Cateogories: {categories}</li>
            <li>Description: {description}</li>
            <li>Published Date: {publishedDate}</li>
          </ul>
          <a href={previewLink}>Preview book</a>
        </div>
      </div>
      )
    }

    const notFound = <div className="bookshelf">
        <div className="search-books-bar book-details-bar">
          <Link to="/" className="close-search book-details-home">Home</Link>
            <div className="list-books-title">
            <h1>Book not found</h1>
          </div>
        </div>
        <div className="search-books-results">
          Book not found
        </div>
      </div>;

    return (
      <div className="fadeIn">
        {book.title ? found(book) : notFound}
      </div>
    )
  }
}

BookDetails.propTypes = {
  changeShelves: PropTypes.func.isRequired
};

export default BookDetails
