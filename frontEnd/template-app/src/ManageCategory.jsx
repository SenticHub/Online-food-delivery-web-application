import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const ManageCategory = () => {
  const [categories, setCategories] = useState([])

  const navigate = useNavigate()


  const getCategory = async () =>{
    const response = await fetch(`http://localhost:3000/category/getAllCategory`)
    const data = await response.json()

    setCategories(data)
  }
  const deleteCategories = async (id) =>{
    //alert(id)
    // const response = await fetch(`http://localhost:3000/user/getAllUsers`)
    // const data = await response.json()

    // setUsers(data)
  
    if(window.confirm('Are u sure to delete? '))
    {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            //body: JSON.stringify(new_user)
        };
        const response = await fetch(`http://localhost:3000/category/deleteCategory/${id}`, requestOptions);
        const data = await response.json();

        setMessage(data)

        navigate('/manageCategory');
    }
}
const editCategories=async(id)=>{
    //alert("hi")
    navigate('/editCategory', {state: {"id": id}});
}
  useEffect(() =>{
    getCategory()
  },[])
  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row vh-100 bg-secondary rounded align-items-center justify-content-center mx-0">
        <div className="col-md-12 text-center">
        <div class="bg-secondary rounded h-100 p-4">
                            
          <h6 className="mb-4">Bordered Table</h6>
          <table className="table table-bordered">
            <thead>
              <tr>
                
                <th scope="col">Category</th>
                <th scope="col">Action</th>
                
              </tr>
            </thead>
            <tbody>
             {
              categories.map((u) =>
                <tr>
                  <td>{u.category}</td>
                  <td>
                      <a onClick={()=> editCategories(u._id)} className="edit btn btn-outline-success">Edit</a>
                       <span>  </span>
                      <a onClick={()=> deleteCategories(u._id)} className="delete btn btn-outline-danger" data-toggle="modal">Delete</a>
                  </td>
                </tr>  
              )
             }
            </tbody>
          </table>
        </div>

        </div>
      </div>
    </div>
  )
}

export default ManageCategory
