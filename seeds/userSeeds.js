const { User } = require("../models");

const userData = [
    {
        username: "Kev1nEatz",
        password: "Ke11venby7"
    },

    {
        username: "DSchrute",
        password: "iMissAngela!"
    },

    {
        username: "Jimmy-Samtanko",
        password: "BearsBeatsBattlestarGallacticga!"
    }
];

const userSeed = () => User.bulkCreate(userData);
  
module.exports = userSeed; 