import Person from '../types/Person';

const mockPeople: Person[] = [
    {
        id: "1",
        name: "Winnie",
        isConnected: true,
        avatar: '/blob-1.svg',
        giftIdeas: [
            { id: "1", name: "New cookbook", price: 25.99, image: "/placeholder.svg?height=100&width=100", buyLink: "https://example.com/cookbook", purchased: false, purchased_by: "2" },
            { id: "2", name: "Spa day package", price: 150, image: "/placeholder.svg?height=100&width=100", buyLink: "https://example.com/spa", purchased: false, purchased_by: null },
        ],
    },
    {
        id: "2",
        name: "Mom",
        isConnected: true,
        avatar: '/blob-2.svg',
        giftIdeas: [
            { id: "3", name: "Gardening tools", price: 49.99, image: "/placeholder.svg?height=100&width=100", buyLink: "https://example.com/gardening", purchased: false, purchased_by: "1" },
            { id: "4", name: "Family photo album", price: 35, image: "/placeholder.svg?height=100&width=100", buyLink: "https://example.com/photoalbum", purchased: false, purchased_by: "3" },
        ],
    },
]

export default mockPeople;