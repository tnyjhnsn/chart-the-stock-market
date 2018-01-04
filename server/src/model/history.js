const mongoose = require('mongoose')

const { Schema } = mongoose

const History = new Schema({
  symbol: { type: String, required: true },
  prices: [
    [
      { type: Number, required: true },
      { type: Number, required: true }
    ]
  ]
}, {
  versionKey: false
})

module.exports = mongoose.model('History', History)
