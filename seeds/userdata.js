const { User } = require('../models')

const userData = [
    {
        "user_name": "alon714"
    },
    {
        "user_name": "Zane618"
    },
    {
        "user_name": "Jonathan19"
    },
    {
        "user_name": "Rainer24"
    },
    {
        "user_name": "Joelikescats"
    }
]

const seedUsers = () => User.bulkCreate(userData)

module.exports = seedUsers