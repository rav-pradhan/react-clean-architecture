import ChangeBookDetails from '../usecases/ChangeBookDetails'
import PickUpBook from '../usecases/PickUpBook'
import RecordBook from '../usecases/RecordBook'
import ToggleBookReadStatus from '../usecases/ToggleBookReadStatus'
import JsonServerGateway from '../gateway/JsonServerGateway'

export const make = () => {
    const gateway: JsonServerGateway = new JsonServerGateway()
    return {
        changeBookDetails: new ChangeBookDetails(gateway),
        pickUpBook: new PickUpBook(gateway),
        recordBook: new RecordBook(gateway),
        toggleBookReadStatus: new ToggleBookReadStatus(gateway)
    }
}
