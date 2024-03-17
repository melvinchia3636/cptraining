import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'cptraining-b0eca.firebaseapp.com',
  projectId: 'cptraining-b0eca',
  storageBucket: 'cptraining-b0eca.appspot.com',
  messagingSenderId: '282246056646',
  appId: '1:282246056646:web:0fc7b2824c07fca092a5c7'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db as firestore, auth }
