import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import {useRouter} from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { app, db, storage } from '../firbase'
import Sidebar from '../components/Sidebar'
import { useParallax } from 'react-scroll-parallax'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtoms'
import StatusCard from '../components/StatusCard'


export default function Home() {
  const auth = getAuth(app)
  const router = useRouter()
  const[name, setName] = useState('')
  const[year, setYear] = useState('')
  const[logged, setLogged] = useState(false)
  
  
  useEffect(() => {
    onAuthStateChanged(auth, (data) =>{
      if(data){
           setLogged(true)
      }else{
        router.push('./login')
      }
    })
  },[auth])

  const handleClick = (e) => {
  e.preventDefault();
  if (year === '') {
    alert('Enter year');
  } else {
    const names = Math.floor(Math.random() * 100).toString();
    setName(names)
    const url = `https://quantumkevin.pythonanywhere.com/${year}/${name}`;
    window.open(url, '_blank');
  }
};
   return (
  <div>
    <header>
      <title>Download</title>
      <script src="../components/script.js"></script>
    </header>
    <div className="flex w-full min-h-screen font-sans bg-gray-800">
      <Sidebar page={'main'} />
      <main className="flex flex-col flex-1 gap-6 p-4">
        <header>
          <h1 className="text-3xl font-semibold leading-loose text-white">Download</h1>
          <div className="text-gray-200">Made by Kevin</div>
        </header>
        <hr className="border-gray-700" />

        {/* Form Section */}
        <div className="flex justify-center items-center mt-4">
          <form className="bg-blue-500 p-4 rounded-md">
            <div className="flex items-center justify-center">
              <input
                type="text"
                className="p-2 m-2 rounded-md"
                placeholder="Enter Year"
                onChange={(e) => setYear(e.target.value)}
                // Add state and event handler for the input field
              />
              <button
                onClick={handleClick}
                className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md"
              >
                Create
              </button>
            </div>
          </form>
        </div>
        {/* End Form Section */}
      </main>
    </div>
  </div>
);

}
