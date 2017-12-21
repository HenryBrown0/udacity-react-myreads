//Base
import React from 'react'
//Router
import { Link } from 'react-router-dom'
//Styles
import './App.css'

class BookThumbnail extends React.Component {
  render() {
    const book = this.props.book
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
                (event) => this.props.changeShelves(book, event.target.value)
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
          className="book-title"
          onClick={(event) => console.log(event)}>{book.title}</div>
        <div
          className="book-authors"
          onClick={(event) => console.log(event)}>{book.authors}</div>
      </div>
    )
  }
}

export default BookThumbnail
