// db.js
const knex = require('knex')({
    client: 'mysql2', // Use mysql2 instead of mysql
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'yexahportal',
      port: 3306,
      authPlugins: {
        mysql_native_password: true,
      },
    },
  });
  
  module.exports = knex;
  // --------------------------------------------------------------------------------------------------------
// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');

// // Middleware to parse JSON data from the frontend
// app.use(bodyParser.json());

// // Store the list of games and their statuses (active/inactive)
// const games = [];

// // Endpoint to handle the game data from the frontend
// app.post('/games', (req, res) => {
//   const gamesData = req.body;

//   // Validate that the frontend sent exactly 10 games
//   if (!Array.isArray(gamesData) || gamesData.length !== 10) {
//     return res.status(400).json({ error: 'Invalid game data. Please send exactly 10 games.' });
//   }

//   // Set the active/inactive status for each game based on the time intervals
//   const currentTime = new Date();
//   gamesData.forEach((game, index) => {
//     const startTime1 = new Date();
//     startTime1.setHours(10, 20, 0, 0);

//     const endTime1 = new Date();
//     endTime1.setHours(11, 20, 0, 0);

//     const startTime2 = new Date();
//     startTime2.setHours(11, 30, 0, 0);

//     const endTime2 = new Date();
//     endTime2.setHours(12, 30, 0, 0);

//     const startTime3 = new Date();
//     startTime3.setHours(17, 20, 0, 0);

//     const endTime3 = new Date();
//     endTime3.setHours(17, 50, 0, 0);

//     const startTime4 = new Date();
//     startTime4.setHours(15, 30, 0, 0);

//     const endTime4 = new Date();
//     endTime4.setHours(15, 50, 0, 0);

//     const startTime5 = new Date();
//     startTime5.setHours(15, 52, 0, 0);

//     const endTime5 = new Date();
//     endTime5.setHours(15, 59, 0, 0);

//     if (
//       (currentTime >= startTime1 && currentTime <= endTime1 && index === 0) ||
//       (currentTime >= startTime2 && currentTime <= endTime2 && index === 1) ||
//       (currentTime >= startTime3 && currentTime <= endTime3 && index === 2) ||
//       (currentTime >= startTime4 && currentTime <= endTime4 && index === 3) ||
//       (currentTime >= startTime5 && currentTime <= endTime5 && index === 4)
//     ) {
//       game.status = 'active';
//     } else {
//       game.status = 'inactive';
//     }

//     games.push(game); // Store the game and its status
//   });

//   return res.json(games);
// });