import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import Error from '../components/Error';
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
  return (
    <div className="row m-0">
      <div className="col-lg-6">
        {loading && <Loader />}
        {bookings &&
          bookings.map((booking) => (
            <div className="shadow-lg p-4">
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
                {booking.status === 'booked' ? 'Confirmed' : 'Canceled'}
              </p>

              <div className="text-end">
                <button className="btn btn-sm btn-dark">Cancel Booking</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
