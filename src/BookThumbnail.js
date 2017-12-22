//Base
import React from 'react'
import PropTypes from 'prop-types';
//Router
import { Link } from 'react-router-dom'
//Styles
import './App.css'

const BookThumbnail = (props) => {
  const { book, changeShelves } = props
  const img = `https${book.imageLinks.smallThumbnail.substring(4)}`
  const link = `/book/${book.id}/`
  return (
    <div className="book fadeIn">
      <div className="book-top">
        <Link
          to={link}
          className="book-cover"
          style={{ width: 128, height: 193, backgroundImage: `url(${img})` }}
        >
        </Link>
        <div className="book-shelf-changer">
          <select
            defaultValue={book.shelf}
            onChange={
              (event) => changeShelves(book, event.target.value)
            }
          >
            <option disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want To Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div
        className="book-title">{book.title}</div>
      <div
        className="book-authors">{book.authors}</div>
    </div>
  )
}

BookThumbnail.propTypes = {
  changeShelves: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired
}

export default BookThumbnail
