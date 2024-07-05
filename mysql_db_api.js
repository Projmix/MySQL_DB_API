const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: '95.217.107.186',
    user: 'u232692_r5M6XrpzsK',
    password: '7hBmcs397GH8NJ+^w2zxjMbZ',
    database: 's232692_Player_Data'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

app.post('/save_player_data', (req, res) => {
    const { player_name, health, thirst, food_level } = req.body;
    const query = `INSERT INTO player_data (player_name, health, thirst, food_level) 
                   VALUES (?, ?, ?, ?) 
                   ON DUPLICATE KEY UPDATE health=VALUES(health), thirst=VALUES(thirst), food_level=VALUES(food_level)`;
    db.query(query, [player_name, health, thirst, food_level], (err, result) => {
        if (err) throw err;
        res.send('Player data saved!');
    });
});

app.get('/get_player_data', (req, res) => {
    const { player_name } = req.query;
    const query = `SELECT health, thirst, food_level FROM player_data WHERE player_name = ?`;
    db.query(query, [player_name], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
