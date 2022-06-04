import Loader from '../../components/Loader';
import Error from '../../components/Error';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  // fetch all the users when the component loads
  useEffect(() => {
    (async () => {
      try {
        const users = (await axios.get('/api/users/getallusers')).data;
        setUsers(users);
        setLoading(false);
        console.log(users);
      } catch (error) {
        setLoading(false);
        setError(error);
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="row m-0">
      <div className="col-lg-10 m-auto">
        <h2>users</h2>
        {loading && <Loader />}
        {error && <Error />}
        <table className="table table-bordered text-center table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">User Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Is Admin</th>
            </tr>
          </thead>
          <tbody className="">
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
