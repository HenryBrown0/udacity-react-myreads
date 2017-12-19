//Base
import React from 'react'
//Router
import { Route } from 'react-router-dom'
//Pages
import Home from './Home'
import Search from './Search'
//ServerAPI
import * as BooksAPI from './BooksAPI'
//Styles
import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [] 
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({ books }))
  }
  
  changeShelves = (book, shelf) => {
    book.shelf = shelf
    console.log(book.shelf)
    this.setState(state => 
      ({ books: state.books.concat([ book ]) })
    )
    console.log(this.state.books)
    BooksAPI.update(book, shelf).then( console.log("Moved book - synced with server") )
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Home
      	    books={this.state.books}
			changeShelves={this.changeShelves}
          />
        )}/>
        <Route exact path="/search/" render={() => (
          <Search
      	    books={this.state.books}
			changeShelves={this.changeShelves}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
