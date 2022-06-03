const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Room = require('../models/room');
const moment = require('moment');
const stripe = require('stripe')(
  'sk_test_51KAuPUAKBlCe0kMMHihYXBQQ38pZkaOxIGEDCaSTFstiWI4prNkee0djFNCZ5yRR05iZGV1QpEEeDUopwkNjZUvq00JrvJ7u1a'
);
const { v4: uuidv4 } = require('uuid');

// booking the room route
router.post('/bookroom', async (req, res) => {
  const { room, userid, fromdate, todate, totalamount, totaldays, token } = req.body;

  // stripe methods
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = stripe.charges.create(
      {
        amount: totalamount * 100,
        customer: customer.id,
        currency: 'eur',
        receipt_email: token.email,
      },
      { idempotencyKey: uuidv4() }
    );

    if (payment) {
      const newBooking = new Booking({
        room: room.name,
        roomid: room._id,
        userid,
        fromdate: moment(fromdate).format('DD-MM-YYYY'),
        todate: moment(todate).format('DD-MM-YYYY'),
        totalamount,
        totaldays,
        transactionid: '1234',
      });

      // in booking, we have the object of the booked room
      const booking = await newBooking.save();

      // Updating the currentbookings array field in table rooms with the newly booked room ||
      const roomtemp = await Room.findOne({ _id: room._id });
      // res.send(roomtemp);
      roomtemp.currentbookings.push({
        bookingid: booking._id,
        fromdate: moment(fromdate).format('DD-MM-YYYY'),
        todate: moment(todate).format('DD-MM-YYYY'),
        userid: userid,
        status: booking.status,
      });

      await roomtemp.save();
      // End of updating room table ||
    }

    res.send('Payment successfull, Your room is booked!');
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;