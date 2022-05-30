import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';

function Bookingscreen() {
  const params = useParams(); // to get id from url param
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [room, setRoom] = useState();

  const roomid = params.roomid;
  const fromdate = moment(params.fromdate, 'DD-MM-YYYY');
  const todate = moment(params.todate, 'DD-MM-YYYY');

  const totalDays = moment.duration(todate.diff(fromdate)).asDays() + 1;

  // get room by id
  useEffect(() => {
    try {
      setLoading(true);
      (async () => {
        const data = (await axios.post('/api/rooms/getroombyid', { roomid: roomid })).data;
        setRoom(data);
        setLoading(false);
      })();
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [roomid]);

  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <div className="row m-0 justify-content-center p-3 shadow-lg">
          <div className="col-md-6">
            <h1>{room.name}</h1>
            <img src={room.imageurls[0]} alt={room.name} className="img-fluid" />
          </div>

          <div className="col-md-6 float-end">
            <h1>Booking Details</h1>
            <hr />
            <p>
              <b>Name:</b>{' '}
            </p>
            <p>
              <b>From Date : </b> {params.fromdate}
            </p>
            <p>
              <b>To Date :</b> {params.todate}
            </p>
            <p>
              <b>Max Count :</b> {room.maxcount}
            </p>

            <div>
              <h1>Amount</h1>
              <hr />
              <p>
                <b>Total days :</b> {totalDays}
              </p>
              <p>
                <b>Rent per day : </b> {room.rentperday}
              </p>
              <p>
                <b>Total amount :</b>
              </p>
            </div>

            <div className="float-end">
              <button className="btn btn-sm btn-dark">Pay Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookingscreen;
