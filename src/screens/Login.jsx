import { useState, useEffect } from 'react';
import axios from 'axios';

function Login() {
  const [inputs, setInputs] = useState({ email: '', password: '' });

  const login = async () => {
    const user = inputs;
    try {
      const result = await axios.post('/api/users/login', user).data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-lg-5">
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
  );
}

export default Login;
