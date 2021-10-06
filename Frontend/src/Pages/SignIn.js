import React from 'react'
import { useHistory } from 'react-router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser} from '../reducers/authReducer';

export default function SignIn() {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {token, feedback} = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();

    const setComponent = () => {
        history.push('/SignUp');
    }
    const user = {
      email,
      password
    }
    const authenticate = async () => {
        const res = await dispatch(signInUser(user));
        const {payload} = res || {};
        console.log('token', payload.token);
        
    }
    return (
        <>
        <div className="row">
      <div className="row">
        <div className="input-field col s12">
          <input id="email" placeholder="Email" type="email" className="validate" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input id="password" placeholder="Password" type="password" className="validate" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
      </div>
          <h6 onClick={()=>setComponent()} id='h6-onhover'>Dont have an account ?</h6>
      <div>
      <button className="waves-effect waves-light btn" onClick={()=>authenticate()}>Sign In</button><br/>
      <center><p id='shadow'>{feedback}</p></center>
      </div>
  </div>
         </>
    )
}