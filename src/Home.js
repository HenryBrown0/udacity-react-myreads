//Base
import React from 'react'
import PropTypes from 'prop-types';
//Router
import { Link } from 'react-router-dom'
//Lodash
import lodash from 'lodash'
//Styles
import './App.css'
//Components
import BookShelf from './BookShelf'
import sortBy from 'sort-by';

const Home = (props) => {
  const books = props.books.sort(sortBy('title'))
  const { changeShelves } = props
  const shelves = [ "Currently Reading", "Want to read", "Read", "None" ]
  
  return (
    <div className="list-books">

      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>

      <div className="list-books-content">
        {shelves.map((shelf) => (
          <BookShelf
            key={shelf}
            title={shelf}
            books={books.filter((book) => book.shelf === lodash.camelCase([shelf]))}
            changeShelves={changeShelves}
          />
        ))}
      </div>

      <div className="open-search">
        <Link to="/search/">Add a book</Link>
      </div>
    </div>
  )
}

Home.propTypes = {
  changeShelves: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired
}

export default Home
