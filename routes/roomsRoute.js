const express = require('express');
const router = express.Router();

const Room = require('../models/room');

// get all rooms at once
router.get('/getallrooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    return res.json({ rooms });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

// get room by id
router.post('/getroombyid', async (req, res) => {
  const roomid = req.body.roomid;

  try {
    const room = await Room.findOne({ _id: roomid });
    res.send(room);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

// ADMIN SIDE
// fetch all rooms
router.get('/getallrooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.send(rooms);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
