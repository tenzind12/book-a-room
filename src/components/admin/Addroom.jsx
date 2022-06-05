import React, { useState } from 'react';
import Loader from '../../components/Loader';
import sweetalert from 'sweetalert2';
import axios from 'axios';

function Addroom() {
  const [loading, setLoading] = useState(false);
  // inputs states
  const [inputs, setInputs] = useState({
    name: '',
    rentperday: '',
    maxcount: '',
    description: '',
    phonenumber: '',
    type: '',
  });

  // image url states
  const [imageURLs, setImageURLs] = useState({ url1: '', url2: '', url3: '' });

  // add new room handler
  const addRoomHandler = async () => {
    const imagesArray = [imageURLs.url1, imageURLs.url2, imageURLs.url3];
    const newRoom = { ...inputs, imageurls: imagesArray };
    // console.log(newRoom);

    try {
      setLoading(true);
      const result = (await axios.post('/api/rooms/addnewroom', newRoom)).data;
      console.log(result);
      setLoading(false);
      sweetalert
        .fire('Success !', 'New room has been added ', 'success')
        .then((result) => (window.location.href = '/home'));
    } catch (error) {
      setLoading(false);
      console.log(error);
      sweetalert.fire('Ooops !', 'Something went wrong !', 'error');
    }
  };

  return (
    <div className="row m-0">
      <h2 className="text-center mb-4">Add New Room</h2>
      {loading && <Loader />}
      <div className="col-md-5">
        <input
          value={inputs.name}
          onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
          type="text"
          placeholder="Room name"
          className="form-control"
        />
        <input
          value={inputs.rentperday}
          onChange={(e) => setInputs({ ...inputs, rentperday: e.target.value })}
          type="text"
          placeholder="Rent Per Day"
          className="form-control"
        />
        <input
          value={inputs.maxcount}
          onChange={(e) => setInputs({ ...inputs, maxcount: e.target.value })}
          type="text"
          placeholder="Max count"
          className="form-control"
        />
        <input
          value={inputs.description}
          onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
          type="text"
          placeholder="Description"
          className="form-control"
        />
        <input
          value={inputs.phonenumber}
          onChange={(e) => setInputs({ ...inputs, phonenumber: e.target.value })}
          type="text"
          placeholder="Phone number"
          className="form-control"
        />
      </div>
      <div className="col-md-5">
        <input
          value={inputs.type}
          onChange={(e) => setInputs({ ...inputs, type: e.target.value })}
          type="text"
          placeholder="Type"
          className="form-control"
        />
        <input
          value={imageURLs.url1}
          onChange={(e) => setImageURLs({ ...imageURLs, url1: e.target.value })}
          type="text"
          placeholder="Image URL 1"
          className="form-control"
        />
        <input
          value={imageURLs.url2}
          onChange={(e) => setImageURLs({ ...imageURLs, url2: e.target.value })}
          type="text"
          placeholder="Image URL 2"
          className="form-control"
        />
        <input
          value={imageURLs.url3}
          onChange={(e) => setImageURLs({ ...imageURLs, url3: e.target.value })}
          type="text"
          placeholder="Image URL 3"
          className="form-control"
        />
        <div className="text-end mt-2">
          <button onClick={addRoomHandler} className="btn btn-sm btn-dark">
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default Addroom;
