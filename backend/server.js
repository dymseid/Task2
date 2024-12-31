const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/hospital", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Patient schema
const patientSchema = new mongoose.Schema({
  patient_id: Number,
  patient_name: String,
  conditions: String,
});

const Patient = mongoose.model("Patient", patientSchema);

// API to fetch patients with DIAB1
app.get("/patients/type1diabetes", async (req, res) => {
  try {
    const patients = await Patient.find({ conditions: { $regex: "\\bDIAB1" } });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: "Error fetching data", error: err });
  }
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
