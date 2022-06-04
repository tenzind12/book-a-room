import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import sweetalert from 'sweetalert2';
// STRIPE
import StripeCheckout from 'react-stripe-checkout';

function Bookingscreen() {
  const params = useParams(); // to get id from url param
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [room, setRoom] = useState();

  const roomid = params.roomid;
  const fromdate = moment(params.fromdate, 'DD-MM-YYYY');
  const todate = moment(params.todate, 'DD-MM-YYYY');

  const totalDays = moment.duration(todate.diff(fromdate)).asDays() + 1;
  const [totalAmount, setTotalAmount] = useState();

  // get room by id
  useEffect(() => {
    // if not user logged in => redirecccttttt...
    if (!localStorage.getItem('currentUser')) window.location.href = '/login';

    try {
      setLoading(true);
      (async () => {
        const data = (await axios.post('/api/rooms/getroombyid', { roomid: roomid })).data;
        setTotalAmount(totalDays * data.rentperday);
        setRoom(data);
        setLoading(false);
      })();
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [roomid, totalDays]);

  // ============= STRIPE PAYMENT FUNCTION ============== //
  const onToken = async (token) => {
    // console.log(token);
    const bookingdetails = {
      room,
      userid: JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate,
      todate,
      totalamount: totalAmount,
      totaldays: totalDays,
      token,
    };

    try {
      setLoading(true);
      await axios.post('/api/bookings/bookroom', bookingdetails);
      setLoading(false);
      sweetalert
        .fire('Successfull !', 'Your room has been booked', 'success')
        .then((result) => (window.location.href = '/profile'));
      // console.log(result);
    } catch (error) {
      setLoading(false);
      console.log(error);
      sweetalert.fire('Unsuccessfull !', 'Something went wrong', 'error');
    }
  };

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
              <b>Name:</b> {JSON.parse(localStorage.getItem('currentUser')).name}
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
                <b>Total amount :</b> {totalAmount}
              </p>
            </div>

            <div className="float-end">
              {/* stripe button */}
              <StripeCheckout
                name="Payment Form"
                amount={totalAmount * 100}
                locale="fr"
                token={onToken}
                currency="EUR"
                stripeKey="pk_test_51KAuPUAKBlCe0kMM28dRBK87PLmH9wZicPdMZCAXopbyM4yRnhy4BTWOL4BdcXoCcHQGRtbc5OgYppgN5qaYo1IP00WXvCGocO"
              >
                <button className="btn btn-sm btn-dark">Pay Now</button>
              </StripeCheckout>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookingscreen;
