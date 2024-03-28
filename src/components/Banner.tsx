import  { useEffect, useState } from 'react'
import NFT from '../assets/NFT.jpeg.jpg'
import { Button } from './ui/button'
import MintModal from './MintModal'
import { useAddress, useContract } from '@thirdweb-dev/react'
import { contractAddress } from '@/config'

type Props = {}

function Banner({}: Props) {

  const [ isOpen, setIsOpen] = useState(false)
  const [owner, setOwner ] = useState<string | null>(null)
  const {contract} = useContract(contractAddress, 'nft-drop')
  const address = useAddress()

  const getOwner = async () => {
    const owner = await contract?.owner.get()
    setOwner(owner || null)
  }

  useEffect( () => {
    getOwner()

  }, [contract])

  return (
    <section 
     className='rounded-2xl w-full bg-cover bg-center relative'
     style={{ backgroundImage: 'url(' + NFT + ')', height: '60vh'}}
     
    >
     <div className='h-full w-full   bg-opacity-50 flex flex-col p-5'>
        <div className='mt-auto max-w-xl'>
            <h1 className='text-white text-xl md:text-5xl'>
            Discover Cyberpunk characters NFT collection
            </h1>
            <p className='mt-4 text-sm text-slate-200'>
                Discover Cyberpunk characters NFT collection Discover Cyberpunk characters NFT collection Discover Cyberpunk characters NFT collection
            </p>
            <Button variant="default"
                className='rounded-lg bg-purple-600 md:text-xl px-8 hover:bg-purple-700'
            >
              Explore
            </Button>
            {owner === address && 
            <Button 
               onClick={() => setIsOpen(true)}
               variant="outline"
               className='rounded-lg bg-transparent hover:bg-transparent hover:text-white text-white md:text-xl px-8 ml-4 border-white'
            >
              Mint
            </Button>}
            <MintModal open={isOpen} onOpenChange={(open) => setIsOpen(open)}/>
        </div>
     </div>

    </section>
  )
}

export default Banner

