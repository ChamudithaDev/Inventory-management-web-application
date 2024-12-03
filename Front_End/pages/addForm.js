import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

export default function AddForm() {
  let navigate = useNavigate();

  const [inventory, setInventory] = useState({
    inventoryName: "",
    quantity: "",
    supplierName: "",
    date:"",
  });

  const { inventoryName, quantity, supplierName, date } = inventory;

  const onInputChange = (e) => {
    setInventory({ ...inventory, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/inventory/add", inventory);
    navigate("/home"); 
    setTimeout(() => {
      alert('Add inventory successfully!');
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
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow"style={{ backgroundColor: 'rgba(249,245,240, 0.5)' }}>
            <h2 className="text-center m-4">Add Inventory Details</h2>

            <form onSubmit={(e) => onSubmit(e)}>
              <div className="mb-3">
                <label htmlFor="inventoryName" className="form-label">
                <b>Inventory Name</b>
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter Inventory Name"
                  name="inventoryName"
                  value={inventoryName}
                  onChange={(e) => onInputChange(e)} required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">
                <b>Quantity</b>
                </label>
                <input
                  type={"number"}
                  className="form-control"
                  placeholder="Enter Quantity"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => onInputChange(e)} required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="supplierName" className="form-label">
                <b>Supplier Name</b>
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter Supplier Name"
                  name="supplierName"
                  value={supplierName}
                  onChange={(e) => onInputChange(e)} required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                <b>Supply Date (yyyy-mm-dd)</b>
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter Supply Date"
                  name="date"
                  value={date}
                  onChange={(e) => onInputChange(e)} required
                />
              </div>
              <button className="btn btn-outline-primary" type="submit">
                Submit
              </button>
              <button className="btn btn-outline-danger mx-2" type="button" onClick={() => navigate("/home")}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </Box>
  );
}
