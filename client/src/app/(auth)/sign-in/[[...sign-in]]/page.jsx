import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return(
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
      <div>
        <Image src={'/home.png'} alt='login' width={500} height={2000} className='w-full h-full object-contain'/>
      </div>
      <div className='flex justify-center items-center h-screen'>
        <SignIn/>
      </div>
    </div>
  )
}