import ChangeBookDetails from '../usecases/ChangeBookDetails'
import FetchBooks from '../usecases/FetchBooks'
import PickUpBook from '../usecases/PickUpBook'
import RecordBook from '../usecases/RecordBook'
import ToggleBookReadStatus from '../usecases/ToggleBookReadStatus'
import JsonServerGateway from '../gateway/JsonServerGateway'

export const initialiseUseCasesWithJsonServerImplementation = () => {
    const gateway: JsonServerGateway = new JsonServerGateway()
    return {
        changeBookDetails: new ChangeBookDetails(gateway),
        fetchBooks: new FetchBooks(gateway),
        pickUpBook: new PickUpBook(gateway),
        recordBook: new RecordBook(gateway),
        toggleBookReadStatus: new ToggleBookReadStatus(gateway)
    }
}
