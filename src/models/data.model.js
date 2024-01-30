import mongoose from "mongoose";

const dataSchema = mongoose.Schema({
  end_year: Number,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  strart_year: String,
  impact: String,
  added: String,
  published: String,
  country: String,
  relavence: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number,
});

const Data = mongoose.model("Data", dataSchema);
export default Data;
