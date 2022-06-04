import { useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';

function Register() {
  const [inputs, setInputs] = useState({ name: '', email: '', password: '', cpassword: '' });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const register = async () => {
    if (inputs.password === inputs.cpassword) {
      const user = inputs;

      try {
        setLoading(true);
        await axios.post('/api/users/register', user).data;
        setLoading(false);
        setSuccess(true);
        setInputs({ name: '', email: '', password: '', cpassword: '' });
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    } else alert("Password doesn't match");
  };

  return (
    <>
      {loading && <Loader />}
      {error && <Error />}
      <div className="row justify-content-center mt-5">
        <div className="col-lg-5">
          {success && <Success message="Registration Successful" />}
          <div className="shadow p-4">
            <h2 className="fs-1 text-center p-2 fw-bold">Register</h2>
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              value={inputs.name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={inputs.cpassword}
              onChange={(e) => setInputs({ ...inputs, cpassword: e.target.value })}
            />
            <button className="btn btn-sm btn-dark mt-3" onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
