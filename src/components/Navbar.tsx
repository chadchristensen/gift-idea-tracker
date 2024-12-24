"use client"

import { useState } from "react"
import Link from "next/link"
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { LogOut, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Navbar = () => {
    const [isSignedIn, setIsSignedIn] = useState(false)
    const toggleSignIn = () => {
        setIsSignedIn(!isSignedIn)
    }
    return (
        <header className="bg-background border-b mb-6">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold">
                            Gift Tracker
                        </Link>
                        <nav className="ml-6 space-x-4 hidden md:flex">
                            <Link href="/my-people" className="text-sm font-medium hover:underline">
                                My People
                            </Link>
                        </nav>
                    </div>
                    <div className="flex items-center">
                        <SignedIn>
                            {/* <DropdownMenu> */}
                            <UserButton />
                            {/* <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt={'cc'} />
                                            <AvatarFallback>CC</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuItem className="flex items-center">
                                        <User className="mr-2 h-4 w-4" />
                                        <span>chadchristensen2@gmail.com</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex items-center" onClick={toggleSignIn}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent> */}
                            {/* </DropdownMenu> */}
                        </SignedIn>
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar;