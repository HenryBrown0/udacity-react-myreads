//Base
import React from 'react'
//Styles
import './App.css'
//Components
import BookThumbnail from './BookThumbnail'
import sortBy from 'sort-by';

class BookShelf extends React.Component {
  render() {
    const { title, changeShelves, books } = this.props;
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
}

export default BookShelf
