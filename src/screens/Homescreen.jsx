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
  // we use this state to filter rooms which is already booked
  const [duplicateRooms, setDuplicateRooms] = useState([]);

  // getting all the rooms from database
  useEffect(() => {
    try {
      // setLoading(true);
      (async () => {
        const data = (await axios.get('/api/rooms/getallrooms')).data;
        // saving the room data in two React States
        setRooms(data.rooms);
        setDuplicateRooms(data.rooms);
        setLoading(false);
      })();
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  }, []);

  // date range function && updating room state by booking date condition
  const filterByDate = (dates) => {
    setFromdate(moment(dates[0]).format('DD-MM-YYYY'));
    setTodate(moment(dates[1]).format('DD-MM-YYYY'));

    const temprooms = [];
    let availability = false;

    for (const room of duplicateRooms) {
      //if there is booking on this room any date
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          // prettier-ignore
          if (!moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(booking.fromdate,booking.todate) 
              && !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(booking.fromdate,booking.todate)) { // if date not between certain date

                // also check if the formdate and todate are not equal
                if(moment(dates[0]).format('DD-MM-YYYY') !== booking.fromdate &&
                moment(dates[0]).format('DD-MM-YYYY') !== booking.todate &&
                moment(dates[1]).format('DD-MM-YYYY') !== booking.fromdate &&
                moment(dates[1]).format('DD-MM-YYYY') !== booking.todate
                ) {
                  availability = true;
                }
          }
        }
      }

      if (availability === true || room.currentbookings.length <= 0) {
        temprooms.push(room);
      }
      // update room state with updated value, room that is not booked on the same date
      setRooms(temprooms);
    }
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
