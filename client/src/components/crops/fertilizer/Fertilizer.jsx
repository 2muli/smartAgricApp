import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

const Fertilizer = () => {
  const [users, setUsers] = useState([
    {
 id:1,
 name:"Muli",
 username:"Muthui",
 email:"Muthiauaha@gmail.com",
 phone_number:"0797363782",

    },  {
        id:2,
        name:"Muli",
        username:"Muthui",
        email:"Muthiauaha@gmail.com",
        phone_number:"0797363782",
       
           },  {
            id:3,
            name:"Muli",
            username:"Muthui",
            email:"Muthiauaha@gmail.com",
            phone_number:"0797363782",
           
               }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, userDetails } = useAuth();





  return (
    <>
      <div className="pagetitle">
        <h1>Animals</h1>
      </div>
      <table className="table">
        <thead>
        <tr>
            <th>Number</th>
            <th>Name</th>
            <th>Bought Date</th>
            <th>Bought Quantity</th>
            <th>Applied Date</th>
            <th>Applied Quantity</th>
            <th>Remaining Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone_number}</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to={`/editanimal/${user.id}`} className='me-2'>
                    <button className="btn btn-primary">Edit</button>
                  </Link>
                {user.id &&(<Link><button onClick={() => handleDelete(user.id)} className="btn btn-danger">
                    Delete
                  </button>
                  </Link>)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
  );
};

export default Fertilizer;
