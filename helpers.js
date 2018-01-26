// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = (obj) => JSON.stringify(obj, null, 2)

// Some information about the site
exports.siteName = 'We ❤️ Books'

exports.menus = [
  // { slug: '/', title: 'We ❤️ Books' },
  { slug: '/books', title: 'Books' },
  { slug: '/explore', title: 'Explore' },
  { slug: '/top', title: 'Top' },
  { slug: '/add', title: 'Add' }
]

exports.getLargeImage = (url) => url.slice(0, url.lastIndexOf('m')) + 'l' + url.slice(url.lastIndexOf('m') + 1)
