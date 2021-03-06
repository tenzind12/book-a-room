import { useState } from 'react';
import { Button, Modal, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Room({ room, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row shadow mt-3 rounded p-2">
      <div className="col-lg-4">
        <img src={room.imageurls[0]} className="smallimg rounded" alt={room.name} />
      </div>
      <div className="col-lg-7 text-start">
        <h1>{room.name}</h1>
        <p>
          <b>Max Count :</b> {room.maxcount}
        </p>
        <p>
          <b>Phone Number:</b> {room.phonenumber}
        </p>
        <p>
          <b>Type:</b> {room.type}
        </p>

        <div className="float-end">
          {fromdate && todate && (
            <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
              <button className="btn btn-sm btn-dark me-2">Book Now</button>
            </Link>
          )}
          <Link to="#">
            <button className="btn btn-sm btn-dark" onClick={handleShow}>
              View Details
            </button>
          </Link>
        </div>
      </div>

      {/* modal react-bootstrap */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {room.imageurls.map((imageUrl, ind) => (
              <Carousel.Item key={ind}>
                <img className="d-block w-100" src={imageUrl} alt={room.name + ind} />
              </Carousel.Item>
            ))}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
