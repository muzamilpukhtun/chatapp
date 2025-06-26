// import { useState } from "react";
// import { signInWithPopup } from "firebase/auth";
// import { auth, db, provider} from "./firebase";
// import  Sidebar from "./components/Sidebar";
// import ChatWindow from "./components/ChatWindow";
// import { doc, getDoc, setDoc } from "firebase/firestore";

// // Save new user to Firestore if not exists
// const saveUserIfNew = async (userData) => {
//   const userRef = doc(db, "users", userData.uid);
//   const userSnap = await getDoc(userRef);
//   if (!userSnap.exists()) {
//     await setDoc(userRef, {
//       userId: userData.uid,
//       userName: userData.name,
//       email: userData.email,
//       ppUrl: userData.photo,
//       bio: "",
//       status: true,
//     });
//   }
// };


// export default function App() {
//   const [user, setUser] = useState(null);
//   const [selectedChat, setSelectedChat] = useState(null);

//   const handleGoogleSignIn = () => {
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         const userData = {
//           name: result.user.displayName,
//           email: result.user.email,
//           photo: result.user.photoURL,
//           uid: result.user.uid,
//         };
//         setUser(userData); 
//         saveUserIfNew(userData);// User data Firestore mein store karega agar naya hai to
//       })
//       .catch((error) => console.log(error));
//   };

//   if (!user) {
//     return (
//       <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
//         <h1>Welcome to Chat App</h1>
//         <button onClick={handleGoogleSignIn} style={{ padding: "10px 20px", marginTop: "20px" }}>
//           Continue with Google
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div style={{ display: "flex", height: "100vh",backgroundColor: "#1a1a1a"  }}>
//      <Sidebar
//         user={user}
//         selectChat={setSelectedChat}
//         selectedChatId={selectedChat?.id}
//       />  
// <ChatWindow user={user} selectedChat={selectedChat} />
//     </div>
//   );
// }


import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "./firebase";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Save new user to Firestore if not exists
const saveUserIfNew = async (userData) => {
  const userRef = doc(db, "users", userData.uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    await setDoc(userRef, {
      userId: userData.uid,
      userName: userData.name,
      email: userData.email,
      ppUrl: userData.photo,
      bio: "",
      status: true,
    });
  }
};

export default function App() {
  const [user, setUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const userData = {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
          uid: result.user.uid,
        };
        setUser(userData);
        saveUserIfNew(userData);
      })
      .catch((error) => console.log(error));
  };

  if (!user) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#1a1a1a",
          color: "#fff",
        }}
      >
        <h1>Welcome to Chat App</h1>
        <button
          onClick={handleGoogleSignIn}
          style={{
            padding: "10px 20px",
            marginTop: "20px",
            backgroundColor: "#3b82f6",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Continue with Google
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#1a1a1a" }}>
      <Sidebar user={user} selectChat={setSelectedChat} selectedChatId={selectedChat?.id} />
      <ChatWindow user={user} selectedChat={selectedChat} />
    </div>
  );
}
