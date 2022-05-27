const mongoose = require("mongoose");

const InviteSchema = new mongoose.Schema(
  {
    inviteID: {
      type: String,
      required: true,
    },
    inviteStatus: {
        type: Boolean,
        required: true,
    },
    // user email
    inviteUser: {
        type: Array,
        required: true,
    },
  },
);

module.exports = mongoose.model("Invite", InviteSchema);
