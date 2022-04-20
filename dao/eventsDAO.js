import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let events

export default class EventsDAO {
    static async injectDB(conn) {
        if (events) {
            return
        }

        try {
            events = await conn.db(process.env.EVENTPLANNER_NS).collection("Events")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle for eventsDAO: ${e}`
            )
        }
    }

    static async getEvents({
        filters = null,
        page = 0,
        eventsPerPage = 20,
    } = {}) {
        let query

        if (filters) {
            if ("type" in filters) {
                // show all events of a specific type
                query = { "type" : { $eq: filters["type"] } }
            } else if ("organizer" in filters) {
                // show all events of a specific organizer
                query = { "organizer" : { $eq: filters["organizer"] } }
            }
        }

        let cursor

        try {
            cursor = await events.find(query)
        } catch (e) {
            console.error(
                `Unable to query events: ${e}`
            )

            return { eventsList: [], NrOfEvents: 0 }
        }

        const displayCursor = cursor.limit(eventsPerPage).skip(page * eventsPerPage)

        try {
            const eventsList = await displayCursor.toArray()
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

    static async getEventTypes() {
        let eventTypes = []

        try {
            eventTypes = await events.distinct("type")
            return eventTypes
        } catch (e) {
            console.error(`Unable to get event types, ${e}`)
            return eventTypes
        }
    }
    
}