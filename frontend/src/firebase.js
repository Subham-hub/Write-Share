import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBpZQur3q4YQosv_MCTRhXSg3cB0LdPBhc',
  authDomain: 'blogs-5bda6.firebaseapp.com',
  projectId: 'blogs-5bda6',
  storageBucket: 'blogs-5bda6.appspot.com',
  messagingSenderId: '793219743435',
  appId: '1:793219743435:web:8bec9f929d3695df3de54e',
}

export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
