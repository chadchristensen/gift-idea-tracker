"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ExternalLink, PlusCircle, ShoppingCart } from 'lucide-react'

// Mock data structure
interface GiftIdea {
    id: string
    name: string
    price: number
    image: string
    buyLink: string
    purchased: boolean
    purchased_by: string | null
}

interface Person {
    id: string
    name: string
    isConnected: boolean
    giftIdeas: GiftIdea[]
}

const mockPeople: Person[] = [
    {
        id: "1",
        name: "Sarah (Wife)",
        isConnected: true,
        giftIdeas: [
            { id: "1", name: "New cookbook", price: 25.99, image: "/placeholder.svg?height=100&width=100", buyLink: "https://example.com/cookbook", purchased: false, purchased_by: "2" },
            { id: "2", name: "Spa day package", price: 150, image: "/placeholder.svg?height=100&width=100", buyLink: "https://example.com/spa", purchased: false, purchased_by: null },
        ],
    },
    {
        id: "2",
        name: "Mom",
        isConnected: true,
        giftIdeas: [
            { id: "3", name: "Gardening tools", price: 49.99, image: "/placeholder.svg?height=100&width=100", buyLink: "https://example.com/gardening", purchased: false, purchased_by: "1" },
            { id: "4", name: "Family photo album", price: 35, image: "/placeholder.svg?height=100&width=100", buyLink: "https://example.com/photoalbum", purchased: false, purchased_by: "3" },
        ],
    },
]

const currentUser = {
    id: "1"
};

export default function GiftIdeaTracker() {
    const [people, setPeople] = useState<Person[]>(mockPeople)
    const [selectedPersonId, setSelectedPersonId] = useState<string>(people[0].id)
    const [newGift, setNewGift] = useState<Partial<GiftIdea>>({ name: "", price: 0, image: "", buyLink: "" })
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const selectedPerson = people.find(person => person.id === selectedPersonId)

    const addGiftIdea = () => {
        if (newGift.name?.trim() === "") return

        setPeople(currentPeople =>
            currentPeople.map(person =>
                person.id === selectedPersonId
                    ? {
                        ...person,
                        giftIdeas: [
                            ...person.giftIdeas,
                            {
                                id: '1',
                                name: newGift.name!,
                                price: newGift.price || 0,
                                image: newGift.image || "/placeholder.svg?height=100&width=100",
                                buyLink: newGift.buyLink || "",
                                purchased: false,
                                purchased_by: newGift.purchased_by || null,
                            },
                        ],
                    }
                    : person
            )
        )

        setNewGift({ name: "", price: 0, image: "", buyLink: "" })
        setIsDrawerOpen(false)
    }

    const togglePurchased = (giftId: string) => {
        setPeople(currentPeople =>
            currentPeople.map(person =>
                person.id === selectedPersonId
                    ? {
                        ...person,
                        giftIdeas: person.giftIdeas.map(gift =>
                            gift.id === giftId ? { ...gift, purchased: !gift.purchased } : gift
                        ),
                    }
                    : person
            )
        )
    }

    const sortedGiftIdeas = selectedPerson?.giftIdeas.sort((a, b) => {
        if (a.purchased === b.purchased) return 0
        return a.purchased ? 1 : -1
    })

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Gift Idea Tracker</h1>
            <div className="flex justify-between items-center mb-4">
                <Select value={selectedPersonId} onValueChange={setSelectedPersonId}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select a person" />
                    </SelectTrigger>
                    <SelectContent>
                        {people.filter(person => person.isConnected).map(person => (
                            <SelectItem key={person.id} value={person.id}>
                                {person.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                    <SheetTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Gift Idea
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[90vh] sm:h-[60vh]">
                        <SheetHeader>
                            <SheetTitle>Add New Gift Idea</SheetTitle>
                            <SheetDescription>Fill in the details for the new gift idea.</SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            <Input
                                placeholder="Gift name"
                                value={newGift.name}
                                onChange={e => setNewGift(prev => ({ ...prev, name: e.target.value }))}
                            />
                            <Input
                                type="number"
                                placeholder="Price"
                                value={newGift.price || ""}
                                onChange={e => setNewGift(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                            />
                            <Input
                                type="url"
                                placeholder="Image URL"
                                value={newGift.image}
                                onChange={e => setNewGift(prev => ({ ...prev, image: e.target.value }))}
                            />
                            <Input
                                type="url"
                                placeholder="Buy link"
                                value={newGift.buyLink}
                                onChange={e => setNewGift(prev => ({ ...prev, buyLink: e.target.value }))}
                            />
                            <Button onClick={addGiftIdea}>
                                <ShoppingCart className="mr-2 h-4 w-4" /> Add Gift Idea
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
            {selectedPerson && (
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>{selectedPerson.name}</CardTitle>
                        <CardDescription>
                            {selectedPerson.giftIdeas.length} gift ideas
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                            {sortedGiftIdeas?.map(gift => (
                                <>
                                    <div key={gift.id} className={`flex items-center gap-4 mb-4 ${gift.purchased ? 'opacity-50' : ''}`}>
                                        <Image src={gift.image} alt={gift.name} width={100} height={100} className="rounded-md" />
                                        <div className="flex-grow">
                                            <h3 className={`font-semibold ${gift.purchased ? 'line-through' : ''}`}>{gift.name}</h3>
                                            <p className="text-sm text-gray-500">${gift.price.toFixed(2)}</p>
                                            <a href={gift.buyLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
                                                Buy <ExternalLink size={14} />
                                            </a>
                                        </div>
                                        {
                                            gift.purchased_by && gift.purchased_by === currentUser.id
                                                ? <Button variant="outline" size="sm" onClick={() => togglePurchased(gift.id)}>
                                                    Undo Purchased
                                                </Button>
                                                : gift.purchased_by && gift.purchased_by !== currentUser.id
                                                    ? <p>Purchased</p>
                                                    : <Button variant="outline" size="sm" onClick={() => togglePurchased(gift.id)}>
                                                        Mark Purchased
                                                    </Button>
                                        }

                                    </div>
                                    <Separator />
                                </>
                            ))}
                        </ScrollArea>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}