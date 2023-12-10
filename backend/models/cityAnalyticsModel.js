const mongoose = require('mongoose')

const cityAnalyticsModel = mongoose.Schema({
    cityName: {
        type: String,
    },
    occurence: {
        type: Number,
        default:1
    }
}
)

module.exports = mongoose.model("cityCount", cityAnalyticsModel)
