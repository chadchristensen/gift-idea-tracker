"use client"

import { useState } from "react"
import { useParams } from 'next/navigation'
import { useQuery } from "convex/react";
import { Button } from "@/components/ui/button"
import GiftList from "@/components/GiftList"
import AddGiftDrawer from "@/components/AddGiftDrawer"
import mockPeople from "@/mocks/mockPeople"
import { api } from "../../../../convex/_generated/api";

export default function GiftIdeaTracker() {
    const { id: listId } = useParams<{ id: string }>();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const selectedPerson = mockPeople.find(person => person.id === listId)
    const gifts = useQuery(api.gifts.get);


    if (gifts?.loading) return <p>Loading...</p>

    return (
        <>
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">{selectedPerson?.name}</h2 >
            <p>Gift Ideas: {gifts?.length || 0}</p>
            <Button onClick={() => setIsDrawerOpen(true)}>Add gift</Button>
            <GiftList gifts={gifts} />
            <AddGiftDrawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
        </>
    )
}