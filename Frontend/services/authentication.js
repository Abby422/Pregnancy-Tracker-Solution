import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebase";

const auth = FIREBASE_AUTH;

export const signIn = async (email, password) => {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        const user = response.user;
        console.log("User signed in successfully" + user);
        return user;
    } catch (error) {
        console.log(
        "Error Code is " + error.code + "Error Message is " + error.message
        );
        alert("Login in failed" + error.message);
    }
    };

export const register = async (email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        console.log("User registered successfully" + user);
        return user;
    } catch (error) {
        console.log(
        "Error Code is " + error.code + "Error Message is " + error.message
        );
        alert("Registration failed" + error.message);
    }
    };

