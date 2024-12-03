import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

export default function ViewUser() {
  const [inventory, setInventory] = useState({
    inventoryName: "",
    quantity: "",
    supplierName: "",
    date:"",
  });

  const { id } = useParams();

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    const result = await axios.get(`http://localhost:8080/inventory/getAll/${parseInt(id)}`); 
    setInventory(result.data);
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
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow "style={{ backgroundColor: 'rgba(249,245,240, 0.5)' }}>
          <h2 className="text-center m-4">Inventory Details</h2>

          <div className="card">
            <div className="card-header">
              Details of inventory id :  {inventory.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Inventory Name:</b>
                  {inventory.inventoryName}
                </li>
                <li className="list-group-item">
                  <b>Quantity:</b>
                  {inventory.quantity}
                </li>
                <li className="list-group-item">
                  <b>Supplier Name:</b>
                  {inventory.supplierName}
                </li>
                <li className="list-group-item">
                  <b>Date of supply:</b>
                  {inventory.date}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/home"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div></Box>
  );
}