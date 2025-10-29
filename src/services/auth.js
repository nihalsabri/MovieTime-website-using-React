import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";


export function userRegister(email, password) {
    return createUserWithEmailAndPassword(auth, email, password); // return built in function of firebase
}

export function userLogin(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function userLogout() {
    return auth.signOut();
}   