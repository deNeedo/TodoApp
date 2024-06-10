import { collection, getDocs } from 'firebase/firestore'
import { verifyPassword } from '../utils/hashGenerator.jsx'
import { db } from '../firebase.js'

const fetchUser = async (username, password) => {
    try {
        let status = 1; let hash
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            if (doc.data().username === username) {
                hash = doc.data().password
            }
        })
        if (await verifyPassword(password, hash)) {
            status = 0
        }
        return status
    } catch (error) {
        return 1
    }
}

export const loginValidator = async (username, password) => {
    // verify username
    const isRegistered = (str, str2) => fetchUser(str, str2)
    // verify password
    const longEnough = (str) => str.length >= 8
    const containsDigit = (str) => /\d/.test(str)
    // return status code
    if (longEnough(password) & containsDigit(password)) {
        return await isRegistered(username, password)
    } else {
        return 1
    }
};