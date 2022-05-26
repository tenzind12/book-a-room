import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Bookingscreen() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState();

  useEffect(() => {
    try {
      setLoading(true);
      (async () => {
        const data = (await axios.post('/api/rooms/getroombyid', { roomid: params.roomid })).data;
        setRoom(data);
        setLoading(false);
      })();
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }, [params.roomid]);
  return (
    <div>
      Bookingscreen
      <h1>Room id : {params.roomid}</h1>
    </div>
  );
}

export default Bookingscreen;
