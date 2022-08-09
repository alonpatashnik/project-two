const { User } = require('../models')

const userData = [
    {
        "username": "alon714",
        "password": 1234
    },
    {
        "username": "Zane618",
        "password": 1234
    },
    {
        "username": "Jonathan19",
        "password": 1234
    },
    {
        "username": "Rainer24",
        "password": 1234
    },
    {
        "username": "Joelikescats",
        "password": 1234
    }
]

const seedUsers = () => User.bulkCreate(userData)

module.exports = seedUsers