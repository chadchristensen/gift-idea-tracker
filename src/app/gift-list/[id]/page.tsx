"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ExternalLink, PlusCircle, ShoppingCart } from 'lucide-react'
import GiftIdea from "@/types/GiftIdea"
import mockPeople from "@/mocks/mockPeople"

type Props = {
    params: {
        id: string
    }
}

export default function GiftIdeaTracker({ params }: Props) {
    const listId = params.id
    const [newGift, setNewGift] = useState<Partial<GiftIdea>>({ name: "", price: 0, image: "", buyLink: "" })
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const selectedPerson = mockPeople.find(person => person.id === listId)

    const addGiftIdea = () => {
        if (newGift.name?.trim() === "") return

        return (
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
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
                                {selectedPerson.giftIdeas?.map(gift => (
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
                                                gift.purchased_by && gift.purchased_by === selectedPerson.id
                                                    ? <Button variant="outline" size="sm" onClick={() => { }}>
                                                        Undo Purchased
                                                    </Button>
                                                    : gift.purchased_by && gift.purchased_by !== selectedPerson.id
                                                        ? <p>Purchased</p>
                                                        : <Button variant="outline" size="sm" onClick={() => { }}>
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