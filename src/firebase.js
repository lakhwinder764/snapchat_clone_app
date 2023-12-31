import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDJA8HOtsc8iVflGSe3DjGc_daqx7990YE',
  authDomain: 'snapchat-21eea.firebaseapp.com',
  projectId: 'snapchat-21eea',
  storageBucket: 'snapchat-21eea.appspot.com',
  messagingSenderId: '210411912469',
  appId: '1:210411912469:web:842b2e4a087613ed04bd1c',
  measurementId: 'G-T1MY4RJ03Y',
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const storage = getStorage(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, storage, db, provider };
