const router = require("express").Router();
const InviteManager = require("../models/InviteManager");

//create an Invite Manager
router.post("/", async (req, res) => {
  const newInviteManager = new InviteManager(req.body);
  try {
    const savedInviteManager = await newInviteManager.save();
    res.status(200).json(savedInviteManager);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all events
router.get("/", async (req, res) => {
  try {
    const inviteManagers = await InviteManager.find();
    res.status(200).json(inviteManagers);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;