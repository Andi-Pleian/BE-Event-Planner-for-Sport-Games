const router = require("express").Router();
const Invite = require("../models/Invite");

//create an Invite Manager
router.post("/", async (req, res) => {
  const newInvite = new Invite(req.body);
  try {
    const savedInvite = await newInvite.save();
    res.status(200).json(savedInvite);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all events
router.get("/", async (req, res) => {
  try {
    const invites = await Invite.find();
    res.status(200).json(invites);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;