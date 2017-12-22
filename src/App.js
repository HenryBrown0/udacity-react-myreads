//Base
import React from 'react'
//Router
import { Switch, Route } from 'react-router-dom'
//Pages
import Home from './Home'
import Search from './Search'
import BookDetails from './BookDetails'
import NotFound from './NotFound'
//ServerAPI
import * as BooksAPI from './BooksAPI'
//Styles
import './App.css'

class BooksApp extends React.Component {
  constructor() {
    super()
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({ books }))
  }

  changeShelves = (book, shelf) => {
    book.shelf = shelf
    BooksAPI.update(book, shelf).then(() => {
      this.setState((prevState) => ({
        books: prevState.books.filter((b) => b.title !== book.title).concat([book])
      }));
    })
  }

  render() {
    return (
      <Switch className="app">
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

        <Route path="/book/" render={() => (
          <BookDetails
            changeShelves={this.changeShelves}
          />
        )}/>
		<Route component={NotFound} />
      </Switch>
    )
  }
}

export default BooksApp
