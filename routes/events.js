const router = require("express").Router();
const Event = require("../models/Event");

var nodemailer = require("nodemailer");

//create a event
router.post("/", async (req, res) => {
  const newEvent = new Event(req.body);
  try {
    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent);
    let data = req.body;
    let transport = nodemailer.createTransport({
      service:'Gmail',
      auth: {
        user: 'vlad282928@gmail.com',
        pass: '.(.d.).(v).2015',
      },
    });

      const invitationList = data.eventInvites.split(",");
      invitationList.forEach(invitation => {

        let mailOptions = {
          from:data.eventOrganizer,
          to:invitation,
          subject: "test email",
          text: "email test",
        };
        
        transport.sendMail(mailOptions, (error,response) => {
          if(error) {
            res.send(error)
          }
          else{
            res.send('Success')
          }
        });
        transport.close();

      });
  
  } catch (err) {
    res.status(500).json(err);
  }

});

//get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
