const { User } = require("../models");

const userData = [
    {
        username: "Kev1nEatz",
        email: "KMalone@dundermifflin.com",
        password: "Ke11venby7"
    },

    {
        username: "DSchrute",
        email: "DSchrute@@dundermifflin.com",
        password: "iMissAngela!"
    },

    {
        username: "Jimmy-Samtanko",
        email: "JHalpert@dundermifflin.com",
        password: "BearsBeatsBattlestarGallacticga!"
    }
];

const userSeed = () => User.bulkCreate(userData);
  
module.exports = userSeed; 