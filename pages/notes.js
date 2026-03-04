import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Loading from "../components/Loading"
import Sidebar from "../components/Sidebar"
import { app, db } from "../firbase"
import { getDoc, doc, updateDoc,setDoc } from "firebase/firestore"

function Notes() {
  const auth = getAuth(app)
  const router = useRouter()
  const [logged, setLogged] = useState(false)
  const [types, setTypes] = useState([])

  useEffect(() => {
    async function loadTypes() {
      const year = sessionStorage.getItem('year')
      if (!year) {
        router.push('./')
        return
      }
      const ref = doc(db, 'your_collection', year)
      const snap = await getDoc(ref)
      if (snap.exists()) {
        setTypes(snap.data().types || [])
      } else {
        const previousYear = (Number(year) - 1).toString()
        const ref2 = doc(db, 'your_collection', previousYear)
        const snap2 = await getDoc(ref2)
      
        if (snap2.exists()) {
          const previousTypes = snap2.data().types || []
      
          setTypes(previousTypes)
      
          // 🔥 CREATE the new year document
          await setDoc(ref, { types: previousTypes })
        } else {
          router.push('./')
        }
      }
    }
    loadTypes()
  }, [router])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogged(true)
      } else {
        router.push('./login')
      }
    })
  }, [auth, router])

  const handleChange = (index, value) => {
    setTypes(prevTypes => {
      const newTypes = [...prevTypes]
      newTypes[index] = value
      return newTypes
    })
  }

  const handleSave = async () => {
    const year = sessionStorage.getItem('year')
    if (!year) {
      router.push('./')
      return
    }
    const ref = doc(db, 'your_collection', year)
    await updateDoc(ref, { types: types })
    alert('Types saved successfully!')
  }

  return (
    <div>
      <header>
        <title>Pythogarus</title>
        <script src="../components/script.js"></script>
        <script async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2318083812487394"
          crossOrigin="anonymous"></script>
      </header>
      {logged ? (
        <div className="flex w-full min-h-screen font-sans bg-gray-800 text-white">
          <Sidebar page={'notes'} />
          <main className="flex flex-col flex-1 gap-6 p-6 md:p-10">
            {types.map((t, index) => (
              <input
                key={index}
                type="text"
                value={t}
                onChange={(e) => handleChange(index, e.target.value)}
                className="border border-gray-600 rounded-md px-4 py-3 bg-gray-900 text-white 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full max-w-lg transition"
                placeholder={`Type ${index + 1}`}
              />
            ))}
            <button
              onClick={handleSave}
              className="mt-6 max-w-lg w-full text-center bg-gradient-to-r from-indigo-500 to-indigo-700
                         hover:from-indigo-600 hover:to-indigo-800 focus:ring-4 focus:ring-indigo-300
                         rounded-lg px-6 py-3 font-semibold shadow-lg transition-colors duration-300"
            >
              Save
            </button>
          </main>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default Notes
