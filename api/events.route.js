// Imports
import express from "express"
import EventsCtrl from "./events.controller.js"

const router = express.Router()

router.route("/").get(EventsCtrl.apiGetEvents)              
// TODO: check if needed 
// router.route("/id/:id").get(EventsCtrl.apiGetEventById) 
router.route("/eventTypes").get(EventsCtrl.apiGetEventTypes)

/*
router
  .route("/review")
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview)
*/

export default router