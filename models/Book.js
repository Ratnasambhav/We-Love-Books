const mongoose = require('mongoose')
mongoose.promise = global.Promise
// const slugs = require('slugs')

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Please enter a book name!'
  },
  author: {
    type: String,
    required: 'Please enter an author name'
  },
  // slug: String,
  description: {
    type: String,
    required: 'Please provide a book description'
  },
  rating: {
    type: Number,
    required: true
  },
  photo: String,
  goodreadsID: {
    type: Number,
    required: true
  },
  shelves: [String]
})

// bookSchema.pre('save', async function (next) {
//   this.slug = slugs(this.name)
//   const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i')
//   const booksWithSlug = await this.constructor.find({ slug: slugRegEx })
//   if (booksWithSlug.length) {
//     this.slug = `${this.slug}-${booksWithSlug.length + 1}`
//   }
//   next()
// })

module.exports = mongoose.model('Book', bookSchema)
