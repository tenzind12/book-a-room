import Loader from '../../components/Loader';
import Error from '../../components/Error';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  // fetch all the bookings when the component loads
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
      <div className="col-lg-10 m-auto">
        <h2>Bookings</h2>
        {loading && <Loader />}
        {error && <Error />}
        <table className="table table-bordered text-center table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">Booking Id</th>
              <th scope="col">User Id</th>
              <th scope="col">Room</th>
              <th scope="col">From</th>
              <th scope="col">To</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody className="">
            {bookings &&
              bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking._id}</td>
                  <td>{booking.userid}</td>
                  <td>{booking.room}</td>
                  <td>{booking.fromdate}</td>
                  <td>{booking.todate}</td>
                  <td>{booking.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bookings;
