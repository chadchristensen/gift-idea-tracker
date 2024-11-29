"use client";

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type MyPeopleRow = {
    id: string
    name: string
    avatar: string
    giftsAvailable: number
}

export const columns: ColumnDef<MyPeopleRow>[] = [
    {
        accessorKey: "avatar",
        header: "Avatar",
        cell: function ({ row }) {
            return (<div className="w-10 h-10 relative rounded-full overflow-hidden">
                <Image
                    src={row.original.avatar}
                    alt={`${row.original.name}'s avatar`}
                    fill
                    className="object-cover"
                />
            </div>)
        }
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "giftsAvailable",
        header: "Gifts Available",
    },
    {
        id: "actions",
        cell: function ({ row }) {
            return (
                <Button
                    variant="ghost"
                    asChild
                >
                    <Link href={`/gift-list/${row.original.id}`}>
                        View List
                    </Link>
                </Button>
            )
        },
    },
]
