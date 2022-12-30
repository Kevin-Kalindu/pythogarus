import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { app } from "../firbase"

function hello(){
  const router = useRouter()
  const auth = getAuth(app)
  const [user, setUser] = useState('')

  useEffect(() => {
    onAuthStateChanged(auth, (data) =>{
      if(data){
        setUser(auth.currentUser)   
      }else{
        router.push('./')
      }
    })
  },[auth])
    return(
        <div className="w-screen h-screen justify-center text-white text-6xl bg-gray-800 flex items-center">
          <header className=''>
                <title>Pythogarus</title>
          </header>
          <h1>Sorry {user.displayName} Unavailable page</h1>
        </div>
    )
}

export default hello
