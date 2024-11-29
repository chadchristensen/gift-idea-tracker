type GiftIdea = {
    id: string
    name: string
    price: number
    image: string
    buyLink: string
    purchased: boolean
    purchased_by: string | null
}

export default GiftIdea;