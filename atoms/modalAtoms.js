import {atom} from 'recoil'

const date = new Date()
const yyyy = date.getFullYear()
const year = String(yyyy)

export const modalState = atom({
    key:'logged',
    default:year
})
