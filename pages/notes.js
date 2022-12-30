import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Loading from "../components/Loading"
import Sidebar from "../components/Sidebar"
import { app } from "../firbase"

function notes(){
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
                <title>Pythogarus</title>
                <script src="../components/script.js"></script>
          </header>
      {logged ? (
        <div className="flex w-full min-h-screen font-sans">
        <Sidebar page={'notes'}/>
        <main className="flex flex-col flex-1 gap-6 p-4">
            <h1 className="font-bold">POS Daily Accounting Dashboard</h1>
            <h2 className="font-semibold">By Kevin.</h2>
            <br />
            <h2 className="font-semibold">Made Using:</h2>
            <p><span>*</span>React JS <br />
            <span>*</span>Next Js <br />
            <span>*</span>TailwindCSS <br />
            <span>*</span>React-Paralax <br />
            <span>*</span>React-icons <br />
            <span>*</span>Next Auth <br />
            <span>*</span>Firebase fireStore <br />
            <span>*</span>Firebase Database <br />
            <span>*</span>Vercel</p>
        </main>

        </div>
      ) : (<Loading/>)}
  </div>
    )
}

export default notes