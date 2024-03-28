import { Card, CardContent, CardTitle, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { useAddress, useClaimNFT, useContract } from '@thirdweb-dev/react';
import { contractAddress } from '@/config';


type Props = {
    name: string,
    description: string, 
    id: string,
    image: string
}

const NFTCard = ({name, description, id, image}: Props) => {
    const { contract } = useContract( contractAddress, 'nft-drop')
    const address = useAddress()
    const { mutateAsync: claim, isLoading} = useClaimNFT(contract)

    const handleClaim = (id: string) => {
        try{
            claim({
                to: address,
                tokenId: id,
                quantity: 1,
            })
        } catch (err) {
            throw new Error('failed to claim')
        }
    } 

  return (
        <Card className='rounded-3xl p-3 text-gray-200 bg-slate-800 border-slate-700 flex flex-col'>
            {/* image */}
            <CardContent className='w-full p-0 rounded-3xl'>
                <img src={image} alt={name} className='w-full h-46 object-cover rounded-3xl'/>
            </CardContent>
            {/* Title */}
            <CardTitle className='mt-4 text-sm md:text-lg '>
                {name}
            </CardTitle>
            {/* Footer */}
            <CardFooter className='text-slate-300 p-0 flex-col text-xs md:text-sm mt-2 '>
                <div className="mr-auto">{description}</div>
                <div className="ml-auto mt-4">
                    <Button
                    variant="default"
                    className='rounded-xl'
                    onClick={() => handleClaim(id)}
                    >
                        {isLoading ? 'Claiming...' : 'claim NFT'}
                    </Button>
                </div>
            </CardFooter>

        </Card>
  )
}

export default NFTCard;