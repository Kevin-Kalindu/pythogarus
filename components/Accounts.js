import { deleteDoc, doc } from "firebase/firestore"
import { HiBan } from "react-icons/hi"
import { modalState } from "../atoms/modalAtoms"
import { db } from "../firbase"
import { useRecoilState } from "recoil";

function Accounts ({id, expense, amount, type, date, month}){
    const[open,setOpen] = useRecoilState(modalState)
    function delete1(){
        const doc1 = doc(db, open, id)
        deleteDoc(doc1)
        .catch((err) => console.log(err.message))
    }

    return(
        <tr className="text-sm text-gray-500">
            <td className="py-4">{expense}</td>
            <td className="py-4">{amount}</td>
            <td className="py-4">{date}</td>
            <td className="py-4">{type}</td>
            <td className="py-4 cursor-pointer" onClick={() => delete1()}><HiBan/></td>
        </tr>
    )
}

export default Accounts