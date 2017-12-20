//Base
import React from 'react'
//Router
import { Link } from 'react-router-dom'
//Styles
import './App.css'
//Components
import BookShelf from './BookShelf'

import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class Search extends React.Component {
  state = {
    query: ''
  }

  updateQuery = query => {
    this.setState({ query: query })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {
    const { query } = this.state
    const { books } = this.props

    let showingBooks
    if(query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books
      .filter((book) => match.test(book.title) || match.test(book.authors))
	   } else {
       showingBooks = books
     }
     showingBooks.sort(sortBy('title'))

     let title =
      <div className='showing-contacts'>
        <span>Showing {showingBooks.length} of {books.length} books</span>
        <button onClick={this.clearQuery} className="reset-search">
          Show all
        </button>
      </div>

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <BookShelf
              title={title}
              books={showingBooks}
              changeShelves={this.props.changeShelves}
            />
          </div>
        </div>
    )
  }
}

export default Search
