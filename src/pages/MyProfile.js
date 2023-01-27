import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Link } from 'react-router-dom';

export default function MyProfile({eventsList}) {


  const {user} = useContext(AuthContext);

  return (
    <>
        <div className='profile-header' style={{backgroundColor: "red", display: "flex" }}>
            <img src={user.avatar} alt="" />
            <div>
            <p>{user.username}</p>
            </div>
        </div>
        <div className='profile-body'>

        </div>
      
    </>
  );
}
