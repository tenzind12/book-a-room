import React, { useEffect } from 'react';
import Bookings from '../components/admin/Bookings';
import Rooms from '../components/admin/Rooms';
import Users from '../components/admin/Users';
import { Tabs } from 'antd';
import Addroom from '../components/admin/Addroom';

function Adminscreen() {
  const { TabPane } = Tabs;

  // if not admin, redirect to home
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('currentUser')).isAdmin) window.location.href = '/home';
  }, []);

  return (
    <div className="mt-3 ms-3 shadow p-3">
      <h1 className="text-center fw-bold fs-2">Admin Panel</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>
        <TabPane tab="Add Room" key="3">
          <Addroom />
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;
