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


export default function Home() {
  const auth = getAuth(app)
  const router = useRouter()
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

   return(
     <div>
           <header className=''>
                <title>Download</title>
                <script src="../components/script.js"></script>
          </header>
                <div>
                    <div className="flex w-full min-h-screen font-sans bg-gray-800">
                        <Sidebar page={'main'}/>
                        <main className=" flex flex-col flex-1 gap-6 p-4">
                          <header>
                            <h1 className="text-3xl font-semibold leading-loose text-white">Console</h1>
                            <div className="text-gray-200">Made by Kevin</div>
                          </header>
                          <hr className="border-gray-700"/>
                          <StatusCard/>
                          <div className="p-6 bg-gray-900 rounded-lg">
                            <table className="w-full">
                              <thead>
                                  <tr className="text-sm font-semibold text-white">
                                      <td className="py-4 border-b border-gray-700">Expense</td>
                                      <td className="py-4 border-b border-gray-700">Amount</td>
                                      <td className="py-4 border-b border-gray-700">Date</td>
                                      <td className="py-4 border-b border-gray-700">Type</td>
                                  </tr>
                              </thead>
                              <tbody>
                                {posts.map((item) => {
                                  return(
                                    <Accounts id={item.id} month={item.month} expense={item.expense} amount={item.amount} type={item.type} date={item.date}/>
                                  )
                                })}
                              </tbody>
                          </table>
                          </div>
                        </main>
                    </div>)}
                </div>
        )
}
