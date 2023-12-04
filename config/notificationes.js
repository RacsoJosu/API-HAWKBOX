const {Expo} = require("expo-server-sdk");

let expo = new Expo({accessToken: process.env.EXPO_ACCESS_TOKEN})

module.exports = {
    expo
};
