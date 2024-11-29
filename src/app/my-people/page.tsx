// create a react functional component called MyPeople
import mockPeople from "@/mocks/mockPeople"
import { MyPeopleRow, columns } from "./columns"
import { DataTable } from "./data-table"

function getData(): MyPeopleRow[] {

    return mockPeople.map((person) => ({
        id: person.id,
        name: person.name,
        avatar: person.avatar,
        giftsAvailable: person?.giftIdeas?.filter((gift) => !gift.purchased).length,
    }))
}

function MyPeople() {
    const data = getData();
    // initialize a state variable called people to store the mockPeople data
    return (
        <div className="w-full">
            <h1 className="text-xl font-bold">My people</h1>
            <DataTable columns={columns} data={data} />

        </div>
    )

}

export default MyPeople;