import React, { useEffect, useState } from 'react';

function Addroom() {
  // inputs states
  const [inputs, setInputs] = useState({
    roomname: '',
    rentperday: '',
    maxcount: '',
    description: '',
    phone: '',
    type: '',
  });

  // image url states
  const [imageURLs, setImageURLs] = useState({
    url1: '',
    url2: '',
    url3: '',
  });

  // add new room handler
  const addRoomHandler = () => {
    const imagesArray = [imageURLs.url1, imageURLs.url2, imageURLs.url3];
    const newRoom = { ...inputs, imageURLs: imagesArray };
    console.log(newRoom);
  };

  return (
    <div className="row m-0">
      <div className="col-md-5">
        <input
          value={inputs.roomname}
          onChange={(e) => setInputs({ ...inputs, roomname: e.target.value })}
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
          value={inputs.phone}
          onChange={(e) => setInputs({ ...inputs, phone: e.target.value })}
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
