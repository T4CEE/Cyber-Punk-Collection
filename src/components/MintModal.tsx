import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogProps, DialogTitle } from '@radix-ui/react-dialog'
import { DialogHeader } from './ui/dialog'
import { DropContract, useContract, useLazyMint } from '@thirdweb-dev/react'
import { contractAddress } from '@/config'
import { Label } from '@radix-ui/react-label'
import { Input } from './ui/input'
import IPFSUploader from './IPFSUploader'
import { Button } from './ui/button'




function MintModal({...rest}: DialogProps) {
    const { contract } = useContract(contractAddress)
    const { mutateAsync: lazyMint, isLoading: isMinting } = useLazyMint<DropContract>(contract)
    const [owner, setOwner] = useState<string | null>(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [isLoadingOwner, setIsLoadingOwner] = useState(true) // Add loading state

    const getOwner = async () => {
        try {
            if (contract) {
                const owner = await contract.owner.get()
                setOwner(owner || null)
            }
        } catch (error) {
            console.error("Error fetching owner:", error)
            setOwner(null)
        } finally {
            setIsLoadingOwner(false)
        }
    }

    useEffect(() => {
        getOwner()
    }, [contract])

    const handleMint = async () => {
        if (name && description) {
            await lazyMint({
                metadatas: [{
                    name,
                    description,
                    image: imageUrl
                }]
            })
        }
    }

    return (
        <Dialog {...rest}>
            <DialogContent className='sm:max-w-[450px] bg-slate-800 border-slate-700 text-slate-200'>
                <DialogHeader>
                    <DialogTitle>
                        Mint Your Cyberpunk Character
                    </DialogTitle>
                </DialogHeader>
                {/* Check loading state before rendering */}
                {isLoadingOwner ? (
                    <div>Loading owner...</div>
                ) : owner ? (
                    // Minting Form
                    <>
                        <IPFSUploader onSuccess={(url) => setImageUrl(url)} />
                        {/* file uploader */}
                        {/* name */}
                        <div className='mt-2'>
                            <Label htmlFor='name' className='text-left'>
                                name
                            </Label>
                            <div className='mt-1 w-full'>
                                <Input
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    id='name'
                                    placeholder='Character Name'
                                    className='w-full bg-slate-800'
                                />
                            </div>
                        </div>
                        {/* description */}
                        <div className='mt-2'>
                            <Label htmlFor='description' className='text-left'>
                                Description
                            </Label>
                            <div className='mt-1 w-full'>
                                <Input
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                    id='description'
                                    placeholder='Describe The Character'
                                    className='w-full bg-slate-800'
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button onClick={handleMint} type='submit' disabled={isMinting}>
                                {isMinting ? 'Minting' : 'Mint'}
                            </Button>
                        </div>
                    </>
                ) : (
                    <div>Error fetching owner.</div>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default MintModal;
