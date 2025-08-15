import React,{useState} from 'react'
import './Registration.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {
    const[userid, setUserId] = useState("")
    const[name, setName]=useState("")
    const[password, setPassword]=useState("")
    const[contact,setContact]=useState("")
    const [message, setMessage]=useState('')

    const add = async() =>{
        const new_user =  {
            "userid": userid,
            "name": name,
            "password": password,
            "contact": contact
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_user)
        };
        const response = await fetch('http://localhost:3000/user/addUser', requestOptions);
        const data = await response.json();

        if(data._id!=null)
        {
          toast("Register Success")
            //window.location.href = ""
        }
        else{
          toast("Register failed")
        }

    }

  return (
   <div>
  <div  className='x'>
  <ToastContainer />
  </div>
  <div className="container1" >
    <h2>Registration Form</h2>
    <div>
      <div className="form-group">
        <label htmlFor="userId">UserId</label>
        <input type="text" className="form-control" id="exampleInputfirstname" name="userid" onChange={(e) => setUserId(e.target.value)}/>
      </div>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" className="form-control" id="exampleInputlastname" name="name" onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="contact">Phone Number</label>
        <input type="text" className="form-control" id="exampleInputphoneno" name="contact" onChange={(e) => setContact(e.target.value)} />
      </div>
      {/* <div className="form-group">
        <label htmlFor="Email1">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" />
      </div> */}
      <div className="form-group">
        <label htmlFor="Password">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword" name="password"  onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary" name="create" onClick={add}>Sign up</button>
      {message}
    </div>
  </div>
</div>

  )
}

export default Registration
