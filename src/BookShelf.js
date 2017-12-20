//Base
import React from 'react'
//Styles
import './App.css'
//Components
import BookThumbnail from './BookThumbnail'

class BookShelf extends React.Component {
  render() {
    return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">          
              {this.props.books.map((book) => (
      		    <li key={book.id}>
                  <BookThumbnail
      			    book={book}
      				changeShelves={this.props.changeShelves}
      			  />
      			</li>
              ))}
            </ol>
          </div>
        </div>
    )
  }
}

export default BookShelf