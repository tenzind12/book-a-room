import { useState } from 'react';
import { Button, Modal, Carousel } from 'react-bootstrap';

export default function Room({ room }) {
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
          <button className="btn btn-sm btn-dark" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      {/* modal react-bootstrap */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {room.imageurls.map((imageUrl, index) => (
              <Carousel.Item key={index}>
                <img className="d-block w-100" src={imageUrl} alt={room.name + index} />
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
