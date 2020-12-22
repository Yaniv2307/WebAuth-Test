const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile("index.html");
});

router.get('/challenge', (req, res) => {
    let challenge = new Uint8Array([117, 61,252, 231, 191, 241]);
    res.send(challenge);
});

module.exports = router;