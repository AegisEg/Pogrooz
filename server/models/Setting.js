const mongoose = require("../database");
const Schema = mongoose.Schema;

const SettingsSchema = new Schema({
  name: { type: String },
  key: { type: String },
  value: { type: String, required: true },
});

const Settings = mongoose.model("Settings", SettingsSchema);
module.exports = Settings;
