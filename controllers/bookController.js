const mongoose = require('mongoose')
const Book = mongoose.model('Book')
const axios = require('axios')
const queryString = require('query-string')
const parseXML = require('xml2js').parseString

exports.getBooksFromDB = async (req, res) => {
  const books = await Book.find()
  res.render('home', { books, title: '📚' })
}

exports.searchGoodReads = async (req, res) => {
  const key = 'LvDUf0wfynXhqePYwL3fmQ'
  const query = req.body.query
  const url = 'https://www.goodreads.com/search.xml?' + queryString.stringify({ key, query })
  const searchResults = await axios({
    method: 'get',
    url,
    responseType: 'text'
  })
  parseXML(searchResults.data, (err, result) => {
    if (err) {
      console.log(err)
      res.redirect('/')
    } else {
      res.render('search', { books: result, title: `Results for ${query}` })
    }
  })
}

exports.getBooksFromGoodReads = async (req, res) => {
  const url = `https://www.goodreads.com/book/show/${req.params.id}.xml?key=LvDUf0wfynXhqePYwL3fmQ`
  const bookData = await axios({
    method: 'get',
    url,
    responseType: 'text'
  })
  parseXML(bookData.data, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.render('book', { book: result['GoodreadsResponse']['book'][0], title: result['GoodreadsResponse']['book'][0]['title'][0] })
    }
  })
}

exports.addBookForm = async (req, res) => {
  const url = `https://www.goodreads.com/book/show/${req.params.id}.xml?key=LvDUf0wfynXhqePYwL3fmQ`
  const bookData = await axios({
    method: 'get',
    url,
    responseType: 'text'
  })
  parseXML(bookData.data, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.render('add', { book: result['GoodreadsResponse']['book'][0], title: result['GoodreadsResponse']['book'][0]['title'][0] })
    }
  })
}

exports.saveBookToDB = async (req, res) => {
  const book = await (new Book(req.body)).save()
  req.flash('success', `Successfully Added ${book.title}. Care to leave a review?`)
  res.redirect(`/books/${book.goodreadsID}`)
}
