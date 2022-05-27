const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
    },
    eventDate: {
      type: String,
      required: true,
    },
    eventLocation: {
      type: String,
      required: true,
    },
    eventCost: {
      type: String,
      required: true,
    },
    eventOrganizer: {
      type: String,
      required: true,
    },
    eventInvites: {
      type: String,
      required: true,
    } 
  },
);

module.exports = mongoose.model("Event", EventSchema);
