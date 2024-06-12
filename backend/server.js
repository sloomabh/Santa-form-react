const express = require("express");
const path = require("path");
const formRoutes = require("./routes/formRoutes");
const sendEmail = require("./utils/emailSender");
const {
  readPendingRequests,
  clearPendingRequests,
} = require("./utils/fileHandler");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api", formRoutes);

// Serve React Frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Email sending logic every 15 seconds
setInterval(async () => {
  const pendingRequests = await readPendingRequests();
  if (pendingRequests.length > 0) {
    await sendEmail(pendingRequests);
    await clearPendingRequests();
  }
}, 15000);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
