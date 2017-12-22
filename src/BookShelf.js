//Base
import React from 'react'
import PropTypes from 'prop-types';
//Styles
import './App.css'
//Components
import BookThumbnail from './BookThumbnail'
import sortBy from 'sort-by';

const BookShelf = (props) => {
  const { title, changeShelves, books } = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.sort(sortBy('title')).map((book) => (
            <li key={book.id}>
              <BookThumbnail
                book={book}
                changeShelves={changeShelves}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  changeShelves: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired
}

export default BookShelf
