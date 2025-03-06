const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "5mb" }));

mongoose.connect("mongodb://localhost:27017/loan_agreements", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const AgreementSchema = new mongoose.Schema({
  name: String,
  signature: String,
  dateSigned: { type: Date, default: Date.now },
});

const Agreement = mongoose.model("Agreement", AgreementSchema);

app.post("/api/submit-agreement", async (req, res) => {
  try {
    const { name, signature } = req.body;
    if (!name || !signature) {
      return res.status(400).json({ error: "Name and signature are required." });
    }

    const newAgreement = new Agreement({ name, signature });
    await newAgreement.save();

    res.status(201).json({ message: "Agreement submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/agreements", async (req, res) => {
  try {
    const agreements = await Agreement.find();
    res.json(agreements);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
