import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD19lror1y_OpB6Sx4P2566X5HiuBYEHfY",
  authDomain: "nexora-chat.firebaseapp.com",
  projectId: "nexora-chat",
  storageBucket: "nexora-chat.firebasestorage.app",
  messagingSenderId: "105991412301",
  appId: "1:105991412301:web:902b1573bb7f572f23da04",
  databaseUrl:'https://nexora-chat-default-rtdb.firebaseio.com/'
};


export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
