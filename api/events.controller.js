// Imports
import EventsDAO from "../dao/eventsDAO.js"

/**
 * Events Controller Class
 * 
 */
export default class EventsController {

  /**
   * Method Name: apiGetEvents()   
   * Method Scope:
   * 
   * @param {*} req   => request
   * @param {*} res   => response
   * @param {*} next  => next middleware
   */
  static async apiGetEvents(req, res, next) {
    const eventsPerPage = req.query.eventsPerPage ? parseInt(req.query.eventsPerPage, 10) : 20

    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}

    if (req.query.type) {
      filters.type = req.query.type
    } else if (req.query.organizer) {
      filters.organizer = req.query.organizer
    }

    const { eventsList, NrOfEvents } = await EventsDAO.getEvents({
      filters,
      page,
      eventsPerPage,
    })

    let response = {
      events: eventsList,
      page: page,
      filters: filters,
      entries_per_page: eventsPerPage,
      total_results: NrOfEvents,
    }

    res.json(response)
  }

  static async apiGetEventByID(req, res, next) {
    // TODO: check if needed
  }

  static async apiGetEventTypes(req, res, next) {
    try {
      let eventTypes = await EventsDAO.getEventTypes()

      res.json(eventTypes)
    } catch (e) {
      console.log(
        `API: ${e}`
      )

      res.status(500).json({ error: e })
    }
  }
}