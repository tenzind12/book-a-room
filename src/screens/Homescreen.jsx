import { useState, useEffect } from 'react';
import axios from 'axios';
import Room from '../components/Room';

export default function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // getting all the rooms from database
  useEffect(() => {
    try {
      setLoading(true);
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

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>error man</h1>
        ) : (
          rooms.map((room, ind) => {
            return (
              <div className="col-md-9 mt-2" key={ind}>
                <Room room={room} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
