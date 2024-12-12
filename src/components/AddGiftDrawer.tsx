import { useState } from 'react'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { PlusCircle, ShoppingCart } from 'lucide-react'
import GiftIdea from "@/types/GiftIdea"
type AddGiftDrawerProps = {
    isDrawerOpen: boolean
    setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddGiftDrawer = ({ isDrawerOpen, setIsDrawerOpen }: AddGiftDrawerProps) => {
    const [newGift, setNewGift] = useState<Partial<GiftIdea>>({ name: "", price: 0, image: "", buyLink: "" })
    console.log('Adding gift drawer');

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
                            <Button onClick={() => { }}>
                                <ShoppingCart className="mr-2 h-4 w-4" /> Add Gift Idea
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div >
    )
}

export default AddGiftDrawer;