const mongoose = require("mongoose");

const InviteManagerSchema = new mongoose.Schema(
  {
    inviteManagerID: {
      type: String,
      required: true,
    },
    // List of emails
    invitationList: {
        type: Array,
        required: true,
    },
    // list of generated invites
    invitesSent: {
        type: Array,
        required: true,
    },
  },
);

module.exports = mongoose.model("InviteManager", InviteManagerSchema);
