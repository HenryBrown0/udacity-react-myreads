//Base
import React from 'react'
//Router
import { Link } from 'react-router-dom'
//Styles
import './App.css'
//Components
import BookShelf from './BookShelf'

import sortBy from 'sort-by';

class Home extends React.Component {
  render() {
    const books = this.props.books.sort(sortBy('title'))

    const currentBooks = books
      .filter((book) => book.shelf === "currentlyReading")

    const wantToReadBooks = books
      .filter((book) => book.shelf === "wantToRead")

    const readBooks = books
      .filter((book) => book.shelf === "read")

    const noneBooks = books
      .filter((book) => book.shelf === "none")

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <BookShelf
            title="Currently Reading"
            books={currentBooks}
            changeShelves={this.props.changeShelves}
          />
          <BookShelf
            title="Want To Read"
            books={wantToReadBooks}
      	  	changeShelves={this.props.changeShelves}
          />
          <BookShelf
            title="Read"
            books={readBooks}
            changeShelves={this.props.changeShelves}
          />
          <BookShelf
            title="None"
            books={noneBooks}
            changeShelves={this.props.changeShelves}
          />
        </div>

        <div className="open-search">
          <Link to="/search/">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Home
