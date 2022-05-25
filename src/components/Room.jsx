export default function Room({ room }) {
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
          <button className="btn btn-sm btn-dark">View Details</button>
        </div>
      </div>
    </div>
  );
}
