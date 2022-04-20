// Imports
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

// Variable that will be used as reference to Events Collection
let events

/**
 * Events Data Access Object Class
 * 
 *  */ 
export default class EventsDAO {

    /**
     * Method Name: injectDB()   
     * Method Scope:
     *  - injects the database reference to events variable
     *  - called as soon as the server is running
     * 
     * @param {*} conn (database reference)
     * @returns NA
     */
    static async injectDB(conn) {
        // If events exists => do nothing
        if (events) {
            return
        }

        // Else, create events collection
        try {
            events = await conn.db(process.env.EVENTPLANNER_NS).collection("Events")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle for eventsDAO: ${e}`
            )
        }
    }

    /**
     * Method Name: getEvents()   
     * Method Scope:
     *  - returns a list of all events based on selected filters
     *  - if no filter is selected, returns all events
     *  - called by apiGetEvents()
     * 
     * @param {*} filters 
     * @returns { eventsList, NrOfEvents }
     */
    static async getEvents({
        filters = null,
        page = 0,
        eventsPerPage = 20,
    } = {}) {
        // Query based on filters
        let query

        /* TODO: Add more filters */

        // If filters exists
        if (filters) {
            // Query by Type or by Organizer
            if ("type" in filters) {
                // show all events of a specific type
                query = { "type" : { $eq: filters["type"] } }
            } else if ("organizer" in filters) {
                // show all events of a specific organizer
                query = { "organizer" : { $eq: filters["organizer"] } }
            }
        }

        // Cursor variable used to iterate through events from a specific query
        let cursor

        try {
            cursor = await events.find(query)
        } catch (e) {
            console.error(
                `Unable to query events: ${e}`
            )

            return { eventsList: [], NrOfEvents: 0 }
        }

        // TODO: Check if we need the page and eventsPerPage system
        
        // displayCursor is used to display all events from query, limited to eventsPerPage
        const displayCursor = cursor.limit(eventsPerPage).skip(page * eventsPerPage)

        try {
            // Convert displayCursor to array
            const eventsList = await displayCursor.toArray()

            // Count number of documents in events collection in order to find out the number of events
            const NrOfEvents = await events.countDocuments(query)

            return { eventsList, NrOfEvents }
        } catch (e) {
            console.error(
                `Unable to get events: ${e}`
            )

            return { eventsList: [], NrOfEvents: 0 }
        }
    }

    static async getEventByID(id) {
        // TODO: check if needed
    }

    /**
     * Method Name: getEventTypes()   
     * Method Scope:
     *  - returns a list of all distinct event types
     *  - called by apiGetEventTypes()
     * 
     * @returns { eventTypes }
     */
    static async getEventTypes() {
        let eventTypes = []

        try {
            // Get all distinct event types
            eventTypes = await events.distinct("type")
            
            return eventTypes
        } catch (e) {
            console.error(`Unable to get event types, ${e}`)
            return eventTypes
        }
    }
    
}