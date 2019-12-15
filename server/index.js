const express = require('express');
const port = 3000;
const cors = require('cors');
const app = express();
const bodyparser = require('body-parser');
const sqlite3 = require('sqlite3');
const server = app.listen(port, () => console.log(`Server 🔥 on port ${port}!`));
const io = require('socket.io')(server);
const db = new sqlite3.Database('./db/toggles.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Connected to DB 💰');
})

io.on('connection', client => {
    console.log('client connected ', client)
    let toggles = [];
    let toggleState;

    client.on('get-toggle', data => {
        db.get(`SELECT * FROM toggles where feature='${data}'`, (err, row) => {
            toggleState = row;
            // console.log(row);
            io.emit('toggle-state', toggleState);
        });


    });
    client.on('get-all-toggles', data => {
        db.all('SELECT * FROM toggles', (err, rows) => {
            toggles = rows.map(element => element);
            io.emit('all-toggles', toggles);
        });

    });
    client.on('set-toggle', data => {
        db.run(`UPDATE toggles SET state = ${data.state} WHERE id = ${data.id}`, (err) => {
            if (err) {
                console.log(err);

            } else {
                db.get(`SELECT * FROM toggles where id='${data.id}'`, (err, row) => {
                    toggleState = row;
                    io.emit('toggle-state', toggleState);
                });

            }
        });


    })
    client.on('disconnect', () => { /* … */ });
});

app.use(cors());
app.use(bodyparser.json());