const axios = require("axios");

const API_BASE = "https://inh.onrender.com/api";

module.exports = async function status() {
  try {
    const res = await axios.get(`${API_BASE}/status`);
    const data = res.data;

    console.log(`✅ Server is online.`);
    console.log(`📦 Package count: ${data.packageCount}`);
    console.log(`🕒 Time: ${new Date(data.timestamp).toLocaleString()}`);
  } catch (e) {
    console.log("❌ Server is offline or unreachable.");
  }
};
