const { addPendingRequest } = require("../utils/fileHandler");

const handleFormSubmission = async (req, res) => {
  const { userid, wish, address } = req.body;

  try {
    const pendingRequest = {
      username: userid,
      wish,
      address,
    };

    await addPendingRequest(pendingRequest);
    res.status(200).json({ message: "Request submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit request" });
  }
};

module.exports = {
  handleFormSubmission,
};
