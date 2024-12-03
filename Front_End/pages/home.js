import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';


export default function Home() {
  const [inventory, setInventory] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    const result = await axios.get("http://localhost:8080/inventory/getAll");
    setInventory(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/inventory/add/${parseInt(id)}`);
    loadInventory();
    setTimeout(() => {
      alert('Delete inventory successfully!');
  }, 100);
  };

  const handleLogout = () => {
    
    navigate("/login"); 
    setTimeout(() => {
      alert('Logged out!');
  }, 100);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#2a1793' }}>
        <Toolbar>
          <Typography align='center' variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Inventory Details Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="py-4">
              <div className="table-responsive">
                <Link to="/addform">
                  <Button variant='outlined' sx={{
                    color: 'white',
                    backgroundColor: '#000080',
                    '&:hover': { color: '#2a1793', backgroundColor: '#e7feff' },
                    borderRadius: '5px',
                    padding: '2px 15px',
                    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
                    fontSize: '1rem'
                  }}>+Add Inventory</Button>
                </Link>
                <table className="table border shadow">
                  <thead>
                    <tr>
                      <th scope="col">#ID</th>
                      <th align="center" scope="col">Inventory Name</th>
                      <th align="center" scope="col">Quantity</th>
                      <th align="center" scope="col">Supplier Name</th>
                      <th align="center" scope="col">Date</th>
                      <th align="center" scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((inventory, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{inventory.inventoryName}</td>
                        <td>{inventory.quantity}</td>
                        <td>{inventory.supplierName}</td>
                        <td>{inventory.date}</td>
                        <td>
                          <Link className="btn btn-primary mx-2" to={`/view/${parseInt(inventory.id)}`}>View</Link>
                          <Link className="btn btn-outline-primary mx-2" to={`/update/${parseInt(inventory.id)}`}>Edit</Link>
                          <button className="btn btn-danger mx-2" onClick={() => deleteUser(inventory.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-outline-danger" onClick={handleLogout} >Logout</button>
      </div>
    </Box>
  );
}
