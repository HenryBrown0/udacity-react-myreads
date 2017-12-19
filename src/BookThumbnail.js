//Base
import React from 'react'
//Styles
import './App.css'

class BookThumbnail extends React.Component {
  state = {
    shelf: this.props.book.shelf
  }

  updateShelf = (book, shelf) => {
    this.props.changeShelves(book, shelf)
    this.setState({ shelf: shelf }) 
  }
  render() {
    const book = this.props.book
    const img = "https"+book.imageLinks.smallThumbnail.substring(4)
    
    return (
      <div className="book">
        <div className="book-top">
          <div
      		className="book-cover"
      		style={{ width: 128, height: 193, backgroundImage: `url(${img})` }}>
          </div>
          <div className="book-shelf-changer">
            <select
			  defaultValue={book.shelf}
			  onChange={(event) => this.updateShelf(book, event.target.value)}
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
        <div className="book-authors">{book.authors}</div>
      </div>
    )
  }
}

export default BookThumbnail
