import { Tabs, Tag } from 'antd';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import Error from '../components/Error';
import sweetalert from 'sweetalert2';
import axios from 'axios';

const { TabPane } = Tabs;

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    if (!user) window.location.href = '/login';
  }, [user]);

  return (
    <div className="ms-3 mt-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h1>My Profile</h1>
          <br />
          <h4>Name: {user.name}</h4>
          <h4>Email: {user.email}</h4>
          <h4>isAdmin: {user.isAdmin ? 'YES' : 'NO'}</h4>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profilescreen;

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  // getting booked room with userId useEffect
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const rooms = (await axios.post('/api/bookings/getbookingsbyuserid/', { userid: user._id }))
          .data;
        setBookings(rooms);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
        console.log(error);
      }
    })();
  }, [user._id]);

  // cancel booking function
  const cancelBooking = async (bookingId, roomid) => {
    try {
      setLoading(true);
      const result = await (
        await axios.post('/api/bookings/cancelbooking', { bookingId, roomid })
      ).data;
      console.log(result);
      setLoading(false);
      sweetalert
        .fire('Success', 'Booking has been cancelled !')
        .then((result) => window.location.reload());
    } catch (error) {
      setLoading(false);
      console.log(error);
      sweetalert.fire('Unsuccessful !', 'Cancellation failed ! Please try again');
    }
  };

  return (
    <div className="row m-0">
      <div className="col-lg-6">
        {loading && <Loader />}
        {bookings &&
          bookings.map((booking) => (
            <div className="shadow-lg p-4" key={booking._id}>
              <h4>{booking.room}</h4>
              <p>
                <b>Booking Id: </b>
                {booking._id}
              </p>
              <p>
                <b>CheckIn Date : </b>
                {booking.fromdate}
              </p>
              <p>
                <b>Checkout Date: </b>
                {booking.todate}
              </p>
              <p>
                <b>Amount: </b>
                {booking.totalamount} €
              </p>
              <p>
                <b>Status : </b>
                {booking.status === 'booked' ? (
                  <Tag color="#87d068">Confirmed</Tag>
                ) : (
                  <Tag color="#f50">Cancelled</Tag>
                )}
              </p>

              <div className="text-end">
                <button
                  className="btn btn-sm btn-dark"
                  onClick={() => cancelBooking(booking._id, booking.roomid)}
                  disabled={booking.status === 'cancelled' ? true : false}
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
