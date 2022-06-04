import { useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';

function Login() {
  const [inputs, setInputs] = useState({ email: '', password: '' });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const login = async () => {
    const user = inputs;
    try {
      setLoading(true);
      const result = (await axios.post('/api/users/login', user)).data;
      setLoading(false);
      console.log(result);

      localStorage.setItem('currentUser', JSON.stringify(result));
      window.location.href = '/home';
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="row justify-content-center mt-5">
        <div className="col-lg-5">
          {error && <Error message="Invalid credentials" />}
          <div className="shadow p-4">
            <h2 className="fs-1 text-center p-2 fw-bold">Login</h2>

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

            <button className="btn btn-sm btn-dark mt-3" onClick={login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
