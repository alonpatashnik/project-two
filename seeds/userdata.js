const { User } = require('../models')

const userData = [
    {
        "username": "alon714",
        "password": "abc123"
    },
    {
        "username": "Zane618",
        "password": "abc124"
    },
    {
        "username": "Jonathan19",
        "password": "abc125"
    },
    {
        "username": "Rainer24",
        "password": "abc126"
    },
    {
        "username": "Joelikescats",
        "password": "abc127"
    }
]

const seedUsers = () => User.bulkCreate(userData)

module.exports = seedUsers