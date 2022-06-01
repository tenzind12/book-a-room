import { useState, useEffect } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
// antd
import { DatePicker, Space } from 'antd';
import 'antd/dist/antd.css';
const { RangePicker } = DatePicker;

export default function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  // booking room with date
  const [fromdate, setFromdate] = useState('');
  const [todate, setTodate] = useState('');

  // getting all the rooms from database
  useEffect(() => {
    try {
      // setLoading(true);
      (async () => {
        const data = (await axios.get('/api/rooms/getallrooms')).data;
        setRooms(data.rooms);
        setLoading(false);
      })();
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  }, []);

  // date function
  const filterByDate = (dates) => {
    setFromdate(moment(dates[0]).format('DD-MM-YYYY'));
    setTodate(moment(dates[1]).format('DD-MM-YYYY'));
  };

  return (
    <div className="container">
      {/* data range */}
      <div className="row mt-5">
        <div className="col-lg-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
      </div>
      {/* end date range */}

      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : error ? (
          <Error />
        ) : (
          rooms.map((room, ind) => {
            return (
              <div className="col-md-9 mt-2" key={ind}>
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
