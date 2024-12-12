import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from 'lucide-react'

const GiftList = ({ gifts }) => {
    return (<div className="grid grid-cols-4 gap-4">
        {gifts?.map((gift) => {
            return (
                <Card key={gift._id}>
                    <CardHeader>
                        <CardTitle>{gift.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{gift.description}</p>
                        <a href={gift.buyLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Purchase</a><ExternalLink size={14} />
                    </CardContent>
                </Card>
            )
        })}
    </div>)
}

export default GiftList;