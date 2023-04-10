const moment = require("moment")

const getYear = (dateStr) => {
    return moment(dateStr).format("YYYY")
}

const getFullMonth = (dateStr) => {
    return moment(dateStr).format("MMMM")
}

const getAbrMonth = (dateStr) => {
    return moment(dateStr).format("MMM")
}

module.exports = {
    getYear,
    getFullMonth,
    getAbrMonth,
}