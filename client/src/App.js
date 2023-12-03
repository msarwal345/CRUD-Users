import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Formtable from './component/Formtable';

axios.defaults.baseURL = 'http://localhost:8080/';

function App() {
  const [add, setAdd] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: ''
  });

  const [dataList, setDataList] = useState([]);
  
  const[edit,setEdit]=useState(false)
  
  const [formEdit, setFormEdit] = useState({
    name: '',
    email: '',
    mobile: ''
  });

  const handleonChange = (e) => {
    const { value, name } = e.target;
    setForm((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post('/create', form);

    console.log(data);
    if (data.data.success) {
      setAdd(false);
      alert(data.data.message);
      getfetchData();
    }
  };

  const getfetchData = async () => {
    const data = await axios.get('/');
    if (data.data.success) {
      console.log(data);
      setDataList(data.data.users);
    }
  };

  useEffect(() => {
    getfetchData();
  }, []);
  console.log(dataList);

  const handleDelete = async (id) => {
    const data = await axios.delete('/delete/' + id);
    if (data.data.success) {
      alert(data.data.message);
      getfetchData();
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault()
    const data = await axios.put('/update',formEdit);
    if (data.data.success) {
      alert(data.data.message);
      getfetchData();
      setEdit(false)
    }
  };

  const handleEditonChange =async(e)=>{
    const { value, name } = e.target;
    setFormEdit((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  const handleEdit=(el)=>{
    setFormEdit(el)
    setEdit(true)
  }

  return (
    <>
      <button className="btn" onClick={() => setAdd(true)}>
        Add
      </button>

      {add && (
        <Formtable
        handleonChange={handleonChange}
        handleSubmit={handleSubmit}
        handleClose={()=>setAdd(false)}
        rest={form}
        />
      )}

      {edit && (
         <Formtable
         handleonChange={handleEditonChange}
         handleSubmit={handleUpdate}
         handleClose={()=>setEdit(false)}
         rest={formEdit}
         />
      )

      }

      <div className="table">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>
                  <button className="edit" onClick={() => handleEdit(user)}>
                    Edit
                  </button>
                  <button className="delete" onClick={() => handleDelete(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
