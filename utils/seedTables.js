// One-time helper: seed a starter set of tables.
// Run with: npm run seed:tables
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Table = require("../models/Table");

const tables = [
  { number: "T1", capacity: 2 },
  { number: "T2", capacity: 2 },
  { number: "T3", capacity: 4 },
  { number: "T4", capacity: 4 },
  { number: "T5", capacity: 4 },
  { number: "T6", capacity: 6 },
  { number: "T7", capacity: 6 },
  { number: "T8", capacity: 8 },
  { number: "R1 (Rooftop)", capacity: 4 },
  { number: "R2 (Rooftop)", capacity: 6 },
];

(async () => {
  await connectDB();
  const existingCount = await Table.countDocuments();
  if (existingCount > 0) {
    console.log(`Table collection already has ${existingCount} tables. Skipping seed.`);
  } else {
    await Table.insertMany(tables);
    console.log(`Seeded ${tables.length} tables.`);
  }
  await mongoose.connection.close();
  process.exit(0);
})();
