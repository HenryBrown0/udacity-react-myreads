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
    const shelves = [
       {
      	shelf: "currentlyReading",
      	title: "Currently Reading"
      }, {
        shelf: "wantToRead",
      	title: "Want to read"
      }, {
        shelf: "read",
        title: "Read"
      }, {
        shelf: "none",
        title: "None"
      }] 
    return (
      <div className="list-books">
      
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
      
        <div className="list-books-content">
      	  {shelves.map((shelf) => (
      	    <BookShelf
      		  key={shelf.shelf}
      		  title={shelf.title}
      		  books={books.filter((book) => book.shelf === shelf.shelf)}
      		  changeShelves={this.props.changeShelves}
      	    />
          ))}
		</div>
  
        <div className="open-search">
          <Link to="/search/">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Home
