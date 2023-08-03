import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import {
  AiOutlineFieldNumber,
  AiOutlineMail,
  AiOutlinePhone,
} from 'react-icons/ai';
const url = 'https://dummyjson.com/users';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const users = data.users;
      setUsers(users);
      setLoading(false);
    } catch (error) {
      setIsError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const removeUser = (id) => {
    const newUsers = users.filter((user) => user.id !== id);
    setUsers(newUsers);
  };
  const removeAll = () => {
    setUsers([]);
  };
  return (
    <div className='max-w-screen-2xl mx-auto'>
      <h1 className='text-3xl font-bold text-center mb-4'>
        {loading ? 'Loading...' : `Users (${users.length}) found`}
        {isError && <div>Something went wrong...</div>}
      </h1>

      {users.length ? (
        <button
          onClick={removeAll}
          className='mx-auto text-center block py-3 px-5 rounded text-white bg-slate-300 hover:bg-slate-500 transition-all duration-500 '
        >
          Remove All
        </button>
      ) : (
        <button
          className='mx-auto text-center block py-3 px-5 rounded text-white bg-slate-300 hover:bg-slate-500 transition-all duration-500 '
          onClick={fetchUsers}
        >
          Fetch Users
        </button>
      )}

      <ul className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8  shadow-lg p-4'>
        {users.map((user) => {
          return <User key={user.id} user={user} ondeleteItem={removeUser} />;
        })}
      </ul>
    </div>
  );
}
App.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};
export default App;

function User({ user, ondeleteItem }) {
  const { firstName, lastName, age, email, phone, image, id } = user;

  return (
    <li className='border p-4 rounded-md' key={id}>
      <div className='flex items-center gap-4  '>
        <img
          src={image}
          alt=''
          width={150}
          height={150}
          className='rounded-full border-3 border-gray-300'
        />
        <div>
          <h2 className='text-2xl font-bold'>
            {firstName} {lastName}
          </h2>
          <p className='text-gray-500 gap-2  flex items-center mt-2'>
            <AiOutlineFieldNumber size={24} /> {age} years
          </p>
          <p className='text-gray-500 inline-flex items-center mt-2 gap-2 '>
            <AiOutlineMail size={24} /> {email}
          </p>
          <p className='text-gray-500 inline-flex items-center gap-2 break-words'>
            <AiOutlinePhone size={24} /> {phone}
          </p>
        </div>
        <button
          className=' text-white font-bold self-start bg-slate-300 p-2 rounded-full hover:bg-slate-400 transiton-all duration-300 ease-in'
          onClick={() => {
            ondeleteItem(id);
          }}
        >
          ❌
        </button>
      </div>
    </li>
  );
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  ondeleteItem: PropTypes.func.isRequired,
};
