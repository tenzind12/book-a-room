import { useState, useEffect } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
// antd
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
const { RangePicker } = DatePicker;

export default function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  // booking room with date
  const [fromdate, setFromdate] = useState('');
  const [todate, setTodate] = useState('');
  // we use this state to filter rooms which is already booked and only available rooms to setRooms again with new result
  const [duplicateRooms, setDuplicateRooms] = useState([]);

  // search bar state
  const [searchText, setSearchText] = useState('');
  const [type, setType] = useState('all');

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
                moment(dates[1]).format('DD-MM-YYYY') !== booking.todate) 
                {
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

  // on every keyup, this function is called
  const filterBySearch = () => {
    const temprooms = duplicateRooms.filter((room) =>
      room.name.toLowerCase().includes(searchText.toLowerCase())
    );

    setRooms(temprooms);
  };

  // dropdown select filter - delux, non-delux
  const filterByType = (e) => {
    if (e !== 'all') {
      const temprooms = duplicateRooms.filter(
        (room) => room.type.toLowerCase() === e.toLowerCase()
      );
      setRooms(temprooms);
      setType(e);
    } else {
      setRooms(duplicateRooms);
      setType('all');
    }
  };

  return (
    <div className="container">
      <div className="row mt-5 shadow-lg p-3">
        {/* data range */}
        <div className="col-lg-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
        {/* end date range */}

        {/* search bar */}
        <div className="col-lg-5">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyUp={filterBySearch}
            type="text"
            placeholder="Search rooms"
            className="form-control border-0 shadow"
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={type}
            onChange={(e) => filterByType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non-Delux</option>
          </select>
        </div>
      </div>

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
