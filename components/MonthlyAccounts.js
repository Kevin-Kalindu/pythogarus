import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {app, db} from '../firbase'
import { useEffect, useState } from "react"
import {useRouter} from 'next/router'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { HiArrowLeft, HiArrowRight, HiArrowDown, HiArrowUp, HiBan } from "react-icons/hi"
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtoms'
import Accounts from './Accounts'

function MonthlyAccounts({amount, name, number, color1, month}){
    const[open,setOpen] = useRecoilState(modalState)
    const collectionRef = collection(db, open)
    const date = new Date()
    const dd = date.getDate()
    const mm = date.getMonth()
    const [posts, setPosts] = useState([])
    const [clicked, setClicked] = useState(false)
    const [loading, setLoading] = useState(true)

    function delete1(id){
        const doc1 = doc(db, open, id)
        deleteDoc(doc1)
        .catch((err) => console.log(err.message))
    }

    function showData(){
        setClicked(!clicked)
        const daily = query(collectionRef, where('month', '==', month), where('type','==',name))
        onSnapshot(daily, (data) => {
          setPosts(data.docs.map((item) => {
            return {...item.data(), id: item.id}
          }))
         })
        setLoading(false)
    }

    const color = 'blue-300'
    return(
        <div>
        <div className={`grid grid-cols-4 rounded-full text-lg bg-gray-800 text-gray-100`}>
        <p className="py-2">{name}</p>
        <p className="py-2">{amount}</p>
        <p className="py-2">{number}</p>
        <div className='py-4 pl-16 cursor-pointer' onClick={() => showData()}>
            {clicked ? (<HiArrowUp/>):  (<HiArrowDown/>)}
        </div>
        </div>
        <div>
            {clicked ? (<div className='text-gray-100 bg-gray-600 mt-4 p-2'>
            {posts.map((item) => {
                    return(
                        <div className='grid grid-cols-5 bg-gray-700 mt-2 rounded-full'>
                            <p className="py-4">{item.expense}</p>
                            <p className="py-4">{item.amount}</p>
                            <p className="py-4">{item.date}</p>
                            <p className="py-4">{item.type}</p>
                            <p className="py-4 pl-4 cursor-pointer" onClick={() => delete1(item.id)}><HiBan/></p>
                        </div>
                )})}
            </div>) : (<div></div>)}
        </div>
    </div>
    )
}

export default MonthlyAccounts
