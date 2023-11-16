import Image from "next/image"
import logo from '../assets/logo.svg';

export const metadata = {
  title: "Home : Work Manager"
}

export default function Home() {
  return (
    <div>
      <h1 className='text-5xl text-center'>Welcome to Work Manager</h1>
      <div className="flex justify-center">
        <Image
          style={{
            width: 500,
            height: 500,
          }}
          src={logo}
          alt="Welcome Banner"
        />
      </div>
      
    </div>
  )
}
