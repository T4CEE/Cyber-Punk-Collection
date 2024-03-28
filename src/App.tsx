import { ConnectWallet } from '@thirdweb-dev/react'
import Banner from './components/Banner'
import UnclaimedNFTs from './components/UnclaimedNFTs'

type Props = {}

function App({}: Props) {
  return (
    <div className='container mx-auto pb-10'>
      <div className="py-5 flex justify-between">
        <ConnectWallet btnTitle='Connect' />
      </div>
      <div className='mb-16'>
      <Banner />
      </div>
      <UnclaimedNFTs/>
    </div>
  )
}

export default App