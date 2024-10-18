import React, { useState } from "react";
import {
  Button,
  Step,
  StepLabel,
  Stepper,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { InputLabel, Select, MenuItem, Input, Checkbox } from "@mui/material";
import { Link } from "react-router-dom";

const BookingForm = () => {
  const [name, setName] = useState({ first: "", last: "" });
  const [wheels, setWheels] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [model, setModel] = useState("");
  const [dates, setDates] = useState({ start: "", end: "" });
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    "Enter Name",
    "Select Number of Wheels",
    "Select Type of Vehicle",
    "Select Model",
    "Select Date Range",
  ];

  const fetchVehicleTypes = async (wheels) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/vehicle-type?wheels=${wheels}`
      );
      const data = await response.json();
      if (Array.isArray(data.data)) {
        setVehicleTypes(data.data);
      } else {
        console.error("Expected an array but got:", data);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchVehiclesByType = async (typeId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/vehicles?id=${typeId}`
      );
      const data = await response.json();
      if (Array.isArray(data.data)) {
        setVehicles(data.data);
      } else {
        console.error("Expected an array but got:", data);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleWheelsChange = (numWheels) => {
    setWheels(numWheels);
    fetchVehicleTypes(numWheels);
  };

  const handleVehicleTypeChange = (typeId) => {
    setVehicleType(typeId);
    fetchVehiclesByType(typeId);
  };

  const handleNext = () => {
    if (activeStep === 0 && (!name.first || !name.last)) {
      setError("Please enter both first and last name.");
      return;
    }
    if (activeStep === 1 && !wheels) {
      setError("Please select the number of wheels.");
      return;
    }
    if (activeStep === 2 && !vehicleType) {
      setError("Please select a vehicle type.");
      return;
    }
    if (activeStep === 3 && !model) {
      setError("Please select a vehicle model.");
      return;
    }
    if (activeStep === 4 && (!dates.start || !dates.end)) {
      setError("Please select a date range.");
      return;
    }

    setError(null); // Clear any previous errors
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    const formData = {
      firstName: name.first,
      lastName: name.last,
      dates: {
        startDate: dates.start,
        endDate: dates.end,
      },
      model: model,
    };

    if (!dates.start && !dates.end) {
      setError("Please select both start and end dates.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        setError(data.message || "Error submitting form.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Error submitting form. Please try again later.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: "url('/vehicle.jpg')",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Card
        sx={{
          width: "800px",
          height: "600px",
          display: "flex",
          flexDirection: "column",
          borderRadius: 3,
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex items-center justify-center pt-2">
          {error && (
            <div style={{ color: "red", padding: "10px", fontSize: "16px" }}>
              {error}
            </div>
          )}
        </div>
        <CardContent sx={{ flex: 1, padding: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <div>
            {activeStep === 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "250px",
                  gap: 2, // Add some gap between input fields for better spacing
                  backgroundColor: "#f5f5f5", // Light background for contrast
                  padding: 3,
                  borderRadius: 2,
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Add subtle shadow for depth
                }}
              >
                <TextField
                  id="first-name"
                  label="First Name"
                  variant="outlined"
                  value={name.first}
                  onChange={(e) => setName({ ...name, first: e.target.value })}
                  required
                  fullWidth
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: 1,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ccc",
                      },
                      "&:hover fieldset": {
                        borderColor: "#888",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#3f51b5", // Change color when focused
                      },
                    },
                  }}
                />
                <TextField
                  id="last-name"
                  label="Last Name"
                  variant="outlined"
                  value={name.last}
                  onChange={(e) => setName({ ...name, last: e.target.value })}
                  required
                  fullWidth
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: 1,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ccc",
                      },
                      "&:hover fieldset": {
                        borderColor: "#888",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#3f51b5", // Change color when focused
                      },
                    },
                  }}
                />
              </Box>
            )}
            {activeStep === 1 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "250px",
                  backgroundColor: "#f5f5f5", // Light background for better contrast
                  padding: 3,
                  borderRadius: 2,
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                }}
              >
                <FormControl component="fieldset" sx={{ width: "80%" }}>
                  <FormLabel
                    component="legend"
                    sx={{ fontSize: "1.2rem", marginBottom: 1 }}
                  >
                    Number of Wheels:
                  </FormLabel>
                  <RadioGroup
                    row
                    value={wheels}
                    onChange={(e) => handleWheelsChange(e.target.value)}
                    sx={{
                      gap: 3, // Space between radio buttons
                      justifyContent: "center",
                    }}
                  >
                    <FormControlLabel
                      value="2"
                      control={<Radio sx={{ color: "#3f51b5" }} />}
                      label="2"
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontSize: "1rem",
                        },
                      }}
                    />
                    <FormControlLabel
                      value="4"
                      control={<Radio sx={{ color: "#3f51b5" }} />}
                      label="4"
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontSize: "1rem",
                        },
                      }}
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            )}
            {activeStep === 2 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "250px",
                }}
              >
                <div style={{ width: "80%" }}>
                  <InputLabel>Type of Vehicle:</InputLabel>
                  <Select
                    fullWidth
                    onChange={(e) => handleVehicleTypeChange(e.target.value)}
                    value={vehicleType}
                    sx={{ height: "48px", fontSize: "16px" }}
                  >
                    <MenuItem value="">Select</MenuItem>
                    {vehicleTypes.map((type, index) => (
                      <MenuItem key={index} value={type.id}>
                        {type.name || type.toString()}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </Box>
            )}
            {activeStep === 3 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "250px",
                }}
              >
                <div style={{ width: "80%" }}>
                  <InputLabel>Model:</InputLabel>
                  <Select
                    fullWidth
                    onChange={(e) => setModel(e.target.value)}
                    value={model}
                    sx={{ height: "48px", fontSize: "16px" }}
                  >
                    {vehicles.map((type, index) => (
                      <MenuItem key={index} value={type.id}>
                        {type.name || type.toString()}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </Box>
            )}
            {activeStep === 4 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "250px",
                }}
              >
                <div className="block" style={{ width: "80%" }}>
                  <InputLabel className="mb-6">Date Range:</InputLabel>
                  <div className="mb-6">
                    <Input
                      type="date"
                      value={dates.start}
                      onChange={(e) =>
                        setDates({ ...dates, start: e.target.value })
                      }
                      required
                      fullWidth
                      sx={{ height: "48px", fontSize: "16px" }}
                    />
                  </div>
                  <div className="mb-6">
                    <Input
                      type="date"
                      value={dates.end}
                      onChange={(e) =>
                        setDates({ ...dates, end: e.target.value })
                      }
                      required
                      fullWidth
                      sx={{ height: "48px", fontSize: "16px" }}
                    />
                  </div>
                </div>
              </Box>
            )}
          </div>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #ccc",
            padding: 2,
            backgroundColor: "#f9f9f9",
          }}
        >
          <Button
            variant="outlined"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ width: "120px", height: "48px" }}
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ width: "120px", height: "48px" }}
            >
              Submit
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              sx={{ width: "120px", height: "48px" }}
            >
              Next
            </Button>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default BookingForm;
