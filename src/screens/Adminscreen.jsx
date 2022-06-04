import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { Tabs } from 'antd';
import axios from 'axios';

function Adminscreen() {
  const { TabPane } = Tabs;

  return (
    <div className="mt-3 ms-3 shadow p-3">
      <h1 className="text-center fw-bold fs-2">Admin Panel</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <h2>Rooms</h2>
        </TabPane>
        <TabPane tab="Add Room" key="3">
          <h2>Add room</h2>
        </TabPane>
        <TabPane tab="Users" key="4">
          <h2>Users</h2>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;

export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      try {
        const bookings = (await axios.get('/api/bookings/getallbookings')).data;
        setBookings(bookings);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="row m-0">
      <div className="col-lg-10">
        <h2>Bookings</h2>
        {loading && <Loader />}
        {bookings && <h3>There are total {bookings.length} bookings.</h3>}
      </div>
    </div>
  );
}
