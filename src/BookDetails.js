//Base
import React from 'react'
//Router
import { Link } from 'react-router-dom'
//Styles
import './App.css'
//Components
import BookThumbnail from './BookThumbnail'

class BookDetails extends React.Component {
  render() {
    const { books } = this.props
    const currentRoute = window.location.href
    const bookID = currentRoute.slice(currentRoute.search("/book/")+6, -1)
    
    const book = books
    	.filter((book) => book.id === bookID)
    	.pop()
    
    console.log(book)
    
    let found
    if(book){found = (
    	<div className="bookshelf">
      	  <div className="search-books-bar book-details-bar">
         	<Link to="/" className="close-search book-details-home">Home</Link>
      		<div className="list-books-title">
          	  <h1>{book.title} - {book.authors}</h1>
       		</div>
		  </div>
      	  <div className="search-books-results">
          <BookThumbnail
      		className="bookdetails-center"
            book={book}
    	    changeShelves={this.props.changeShelves}
    	  />
      	  <ul>
      		<li>Cateogories: {book.categories}</li>
      		<li>Description: {book.description}</li>
      		<li>Published Date: {book.publishedDate}</li>
      	  </ul>
      	  <a href={book.previewLink}>Preview book</a>
      </div>
		</div>)}
      
    const notFound = (<div>Book not found</div>)

    return (
      <div className="fadeIn">
      	{book ? found : notFound}
      </div>
    )
  }
}

export default BookDetails
