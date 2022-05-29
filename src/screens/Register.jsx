import { useState, useEffect } from 'react';

function Register() {
  const [inputs, setInputs] = useState({ name: '', email: '', password: '', cpassword: '' });

  const register = () => {
    const user = inputs;
    console.log(user);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div>
          <h1>Register</h1>
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
          <button className="btn btn-sm btn-dark" onClick={register}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
