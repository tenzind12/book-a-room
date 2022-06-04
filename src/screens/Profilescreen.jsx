import { Tabs } from 'antd';
import { useEffect } from 'react';
import axios from 'axios';

const { TabPane } = Tabs;

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    if (!user) window.location.href = '/login';
  }, []);

  return (
    <div className="ml-3 mt-3">
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

  // getting booked room with userId useEffect
  useEffect(() => {
    (async () => {
      try {
        const rooms = (await axios.post('/api/bookings/getbookingsbyuserid/', { userid: user._id }))
          .data;
        console.log(rooms);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user._id]);
  return (
    <div>
      <h1>My Bookings</h1>{' '}
    </div>
  );
}
