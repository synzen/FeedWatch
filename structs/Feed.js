const getArticles = require('../util/getArticles.js')
const usedIds = []

class Feed {
  constructor (link, options) {
    if (!link) throw new Error('No link specified')
    this.link = link
    this.options = options
    this.id = Math.floor((Math.random() * 99999) + 1).toString()
    while (usedIds.includes(this.id)) this.id = Math.floor((Math.random() * 99999) + 1).toString() // Regenerate ID if, by a tiny chance, it's already used by another feed
    usedIds.push(this.id)
    this._articleList = []
  }

  async getArticles () {
    return getArticles(this.link)
  }

  toJSON () {
    return {
      id: this.id,
      link: this.link,
      options: this.options,
      requestOptions: this.requestOptions,
      seenArticleList: this._articleList
    }
  }

  async _initialize () {
    const articleList = await this.getArticles()
    // console.log(articleList)
    this._articleList = this._articleList.concat(articleList)
  }

  _ovewriteOldArticles (arr) {
    this._articleList = arr
  }
}

module.exports = Feed