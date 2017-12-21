//Base
import React from 'react'
//Router
import { Link } from 'react-router-dom'
//Styles
import './App.css'
//Components
import BookShelf from './BookShelf'
//ServerAPI
import * as BooksAPI from './BooksAPI'

class Search extends React.Component {
  state = {
    showingBooks: [],
    query: ''
  }

  updateQuery = query => {
    this.setState({ query: query })
    if(query){
      BooksAPI.search(query, )
        .then((showingBooks) => {
          this.setState({ showingBooks })
      	})
    }else{
      this.setState({ showingBooks: [] })
    }
  }

  clearQuery = () => {
    this.setState({ query: '' })
    this.setState({ showingBooks: [] })
  }

  render() {
    const { showingBooks, query } = this.state

    let title =
      <div className='showing-contacts'>
        <span>Showing {showingBooks.length} books</span>
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
              value={query}
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
