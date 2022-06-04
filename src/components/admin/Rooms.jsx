import Loader from '../../components/Loader';
import Error from '../../components/Error';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  // fetch all the rooms when the component loads
  useEffect(() => {
    (async () => {
      try {
        const rooms = (await axios.get('/api/rooms/getallRooms')).data.rooms;
        setRooms(rooms);
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
        <h2>Rooms</h2>
        {loading && <Loader />}
        {error && <Error />}
        <table className="table table-bordered text-center table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">Room Id</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Rent/day</th>
              <th scope="col">Max count</th>
              <th scope="col">Phone no.</th>
            </tr>
          </thead>
          <tbody className="">
            {rooms &&
              rooms.map((room) => (
                <tr key={room._id}>
                  <td>{room._id}</td>
                  <td>{room.name}</td>
                  <td>{room.type}</td>
                  <td>{room.rentperday}</td>
                  <td>{room.maxcount}</td>
                  <td>{room.phonenumber}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Rooms;
