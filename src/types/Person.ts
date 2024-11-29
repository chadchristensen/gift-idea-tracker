import GiftIdea from "./GiftIdea";

type Person = {
    id: string
    name: string
    isConnected: boolean
    avatar: string
    giftIdeas: GiftIdea[]
}

export default Person;