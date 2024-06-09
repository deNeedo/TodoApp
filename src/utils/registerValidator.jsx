import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase.js'

const fetchUsers = async (username) => {
    try {
        let status = 0
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            if (doc.data().username === username) {
                status = 1
            }
        })
        return status
    } catch (error) {
        throw error
    }
}

export const registerValidator = async (username, password, repeated) => {
    // verify username
    const isUnique = (str) => fetchUsers(str)
    // verify password
    const longEnough = (str) => str.length >= 8
    const containsDigit = (str) => /\d/.test(str)
    // verify repeated password
    const areEqual = (str, str2) => str === str2
    // return status code
    let response = await isUnique(username)
    if (response == 0) {
        if (longEnough(password) & containsDigit(password)) {
            if (areEqual(password, repeated)) {
                return 0
            } else {
                return 1
            }
        } else {
            return 2
        }
    } else {
        return 3
    }
}