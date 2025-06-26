// // import { useEffect, useState } from "react";
// // import { db } from "../firebase";
// // import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

// // export default function Sidebar({ user, selectChat, selectedChatId }) {
// //   const [chats, setChats] = useState([]);
// //   const [emailInput, setEmailInput] = useState("");

// //   useEffect(() => {
// //     fetchChats();
// //   }, []);

// //   const fetchChats = async () => {
// //     try {
// //       const q1 = query(collection(db, "chats"), where("user1.userId", "==", user.uid));
// //       const q2 = query(collection(db, "chats"), where("user2.userId", "==", user.uid));

// //       const [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);
// //       const chatsList = [
// //         ...snap1.docs.map(doc => ({ id: doc.id, ...doc.data() })),
// //         ...snap2.docs.map(doc => ({ id: doc.id, ...doc.data() }))
// //       ];

// //       setChats(chatsList);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// // //   const handleAddChat = async () => {
// // //     if (!emailInput) return;

// // //     try {
// // //       const usersRef = collection(db, "users");
// // //       const q = query(usersRef, where("email", "==", emailInput));
// // //       const snap = await getDocs(q);

// // //       let otherUser = null;
// // //       const isSelfChat = emailInput === user.email;

// // //       if (!snap.empty) {
// // //         otherUser = snap.docs[0].data();
// // //       } else if (!isSelfChat) {
// // //         alert("User not found!");
// // //         return;
// // //       }

// // //       const chatExists = chats.some(c =>
// // //         (c.user1?.email === emailInput || c.user2?.email === emailInput)
// // //       );

// // //       if (chatExists) {
// // //         alert("Chat already exists!");
// // //         return;
// // //       }

// // //       const chatData = {
// // //         last: null,
// // //         user1: {
// // //           userId: user.uid,
// // //           userName: user.name,
// // //           email: user.email,
// // //           ppUrl: user.photo,
// // //           bio: "",
// // //           status: true,
// // //           typing: false,
// // //           unread: 0
// // //         },
// // //         user2: isSelfChat
// // //           ? {
// // //               userId: user.uid,
// // //               userName: user.name,
// // //               email: user.email,
// // //               ppUrl: user.photo,
// // //               bio: "",
// // //               status: true,
// // //               typing: false,
// // //               unread: 0
// // //             }
// // //           : otherUser
// // //       };

// // //       await addDoc(collection(db, "chats"), chatData);
// // //       setEmailInput("");
// // //       fetchChats();
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };

// // const handleAddChat = async () => {
// //   if (!emailInput) return;

// //   try {
// //     const isSelfChat = emailInput === user.email;
// //     let otherUser = null;

// //     if (isSelfChat) {
// //       otherUser = {
// //         userId: user.uid,
// //         userName: user.name,
// //         email: user.email,
// //         ppUrl: user.photo,
// //         bio: "",
// //         status: true,
// //         typing: false,
// //         unread: 0
// //       };
// //     } else {
// //       const usersRef = collection(db, "users");
// //       const q = query(usersRef, where("email", "==", emailInput));
// //       const snap = await getDocs(q);

// //       if (snap.empty) {
// //         alert("User not found!");
// //         return;
// //       }
// //       otherUser = snap.docs[0].data();
// //     }

// //     // Improved chatExists check
// //     const chatExists = chats.some(c => {
// //       const isSelfChatInList = c.user1?.email === c.user2?.email && c.user1?.email === user.email;
// //       const isOtherChatInList =
// //         (c.user1?.email === emailInput && c.user2?.email === user.email) ||
// //         (c.user2?.email === emailInput && c.user1?.email === user.email);
// //       return isSelfChat ? isSelfChatInList : isOtherChatInList;
// //     });

// //     if (chatExists) {
// //       alert("Chat already exists!");
// //       return;
// //     }

// //     const chatData = {
// //       last: null,
// //       user1: {
// //         userId: user.uid,
// //         userName: user.name,
// //         email: user.email,
// //         ppUrl: user.photo,
// //         bio: "",
// //         status: true,
// //         typing: false,
// //         unread: 0
// //       },
// //       user2: otherUser
// //     };

// //     await addDoc(collection(db, "chats"), chatData);
// //     setEmailInput("");
// //     fetchChats();
// //   } catch (err) {
// //     console.error(err);
// //   }
// // };

// //   return (
// //     <div
// //       style={{
// //         width: "100%",
// //         maxWidth: "300px",
// //         height: "100vh",
// //         backgroundColor: "#1a1a1a",
// //         color: "#fff",
// //         display: "flex",
// //         flexDirection: "column",
// //         padding: "15px",
// //         borderRight: "1px solid #333",
// //         boxSizing: "border-box",
// //       }}
// //     >
// //       {/* Profile */}
// //       <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
// //         <img
// //           src={user.photo}
// //           alt="avatar"
// //           style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px", border: "1px solid #555" }}
// //         />
// //         <div>
// //           <h3 style={{ margin: "0", fontSize: "18px" }}>{user.name}</h3>
// //           <p style={{ margin: "0", color: "limegreen", fontSize: "12px" }}>Online</p>
// //         </div>
// //       </div>

// //       {/* Input */}
// //       <div style={{ marginBottom: "20px" }}>
// //         <input
// //           type="text"
// //           placeholder="Enter Gmail"
// //           value={emailInput}
// //           onChange={(e) => setEmailInput(e.target.value)}
// //           style={{
// //             width: "100%",
// //             padding: "8px",
// //             marginBottom: "10px",
// //             borderRadius: "4px",
// //             border: "1px solid #555",
// //             backgroundColor: "#2a2a2a",
// //             color: "#fff",
// //           }}
// //         />
// //         <button
// //           onClick={handleAddChat}
// //           style={{
// //             width: "100%",
// //             padding: "10px",
// //             backgroundColor: "#3b82f6",
// //             color: "#fff",
// //             border: "none",
// //             borderRadius: "4px",
// //             cursor: "pointer",
// //           }}
// //         >
// //           Add Chat
// //         </button>
// //       </div>

// //       {/* Chats */}
// //       <h4 style={{ margin: "10px 0", color: "#ccc" }}>Chats</h4>
// //       <div style={{ flex: 1, overflowY: "auto" }}>
// //         {chats.map((chat, index) => {
// //           const isSelfChat = chat.user1?.email === chat.user2?.email;
// //           const displayName = isSelfChat
// //             ? "Message Yourself"
// //             : chat.user1?.email === user.email
// //             ? chat.user2?.email
// //             : chat.user1?.email;

// //           return (
// //             <div
// //               key={index}
// //               onClick={() => selectChat(chat)}
// //               style={{
// //                 padding: "10px",
// //                 borderRadius: "4px",
// //                 marginBottom: "5px",
// //                 backgroundColor: selectedChatId === chat.id ? "#3b82f6" : "#2a2a2a",
// //                 cursor: "pointer",
// //                 color: selectedChatId === chat.id ? "#fff" : "#ddd",
// //               }}
// //             >
// //               <strong>{displayName}</strong>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }






// // // design this component properly give it a simple and classy dark theme look and make it responsive for all type of screens 


// import { useEffect, useState } from "react";
// import { db } from "../firebase";
// import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

// export default function Sidebar({ user, selectChat, selectedChatId }) {
//   const [chats, setChats] = useState([]);
//   const [emailInput, setEmailInput] = useState("");

//   useEffect(() => {
//     fetchChats();
//   }, []);

//   const fetchChats = async () => {
//     try {
//       const q1 = query(collection(db, "chats"), where("user1.userId", "==", user.uid));
//       const q2 = query(collection(db, "chats"), where("user2.userId", "==", user.uid));
//       const [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);
//       const chatsList = [...snap1.docs.map(doc => ({ id: doc.id, ...doc.data() })), ...snap2.docs.map(doc => ({ id: doc.id, ...doc.data() }))];
//       setChats(chatsList);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleAddChat = async () => {
//     if (!emailInput) return;
//     try {
//       const isSelfChat = emailInput === user.email;
//       let otherUser = null;
//       if (isSelfChat) {
//         otherUser = {
//           userId: user.uid,
//           userName: user.name,
//           email: user.email,
//           ppUrl: user.photo,
//           bio: "",
//           status: true,
//           typing: false,
//           unread: 0
//         };
//       } else {
//         const usersRef = collection(db, "users");
//         const q = query(usersRef, where("email", "==", emailInput));
//         const snap = await getDocs(q);
//         if (snap.empty) return alert("User not found!");
//         otherUser = snap.docs[0].data();
//       }

//       const chatExists = chats.some(c => (c.user1?.email === emailInput && c.user2?.email === user.email) || (c.user2?.email === emailInput && c.user1?.email === user.email));
//       if (chatExists || (isSelfChat && chats.some(c => c.user1?.email === c.user2?.email && c.user1?.email === user.email))) {
//         return alert("Chat already exists!");
//       }

//       const chatData = {
//         last: null,
//         user1: {
//           userId: user.uid,
//           userName: user.name,
//           email: user.email,
//           ppUrl: user.photo,
//           bio: "",
//           status: true,
//           typing: false,
//           unread: 0
//         },
//         user2: otherUser
//       };

//       await addDoc(collection(db, "chats"), chatData);
//       setEmailInput("");
//       fetchChats();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="h-screen max-w-[300px] w-full flex flex-col bg-[#1a1a1a] border-r border-gray-700 text-white">
//       <div className="flex items-center gap-3 p-4 border-b border-gray-700">
//         <img src={user.photo} alt="avatar" className="w-12 h-12 rounded-full border border-gray-600" />
//         <div>
//           <h3 className="text-lg font-semibold">{user.name}</h3>
//           <p className="text-green-500 text-xs">Online</p>
//         </div>
//       </div>

//       <div className="p-4">
//         <input
//           type="text"
//           placeholder="Enter Gmail"
//           value={emailInput}
//           onChange={(e) => setEmailInput(e.target.value)}
//           className="w-full px-3 py-2 rounded bg-[#2a2a2a] border border-gray-600 text-white mb-2"
//         />
//         <button onClick={handleAddChat} className="w-full py-2 bg-blue-600 text-white rounded">Add Chat</button>
//       </div>

//       <h4 className="px-4 text-gray-400">Chats</h4>
//       <div className="flex-1 overflow-y-auto px-2 space-y-2 mt-2">
//         {chats.map((chat) => {
//           const isSelfChat = chat.user1?.email === chat.user2?.email;
//           const displayName = isSelfChat ? "Message Yourself" : chat.user1?.email === user.email ? chat.user2?.email : chat.user1?.email;
//           return (
//             <div
//               key={chat.id}
//               onClick={() => selectChat(chat)}
//               className={`p-3 rounded cursor-pointer ${selectedChatId === chat.id ? "bg-blue-600 text-white" : "bg-[#2a2a2a] text-gray-300"}`}
//             >
//               <strong>{displayName}</strong>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }



// Sidebar.js (Clean Responsive Dark Theme)
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

export default function Sidebar({ user, selectChat, selectedChatId }) {
  const [chats, setChats] = useState([]);
  const [emailInput, setEmailInput] = useState("");

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const q1 = query(collection(db, "chats"), where("user1.userId", "==", user.uid));
      const q2 = query(collection(db, "chats"), where("user2.userId", "==", user.uid));
      const [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);
      const chatsList = [...snap1.docs.map(doc => ({ id: doc.id, ...doc.data() })), ...snap2.docs.map(doc => ({ id: doc.id, ...doc.data() }))];
      setChats(chatsList);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddChat = async () => {
    if (!emailInput) return;
    try {
      const isSelfChat = emailInput === user.email;
      let otherUser = null;

      if (isSelfChat) {
        otherUser = {
          userId: user.uid,
          userName: user.name,
          email: user.email,
          ppUrl: user.photo,
          bio: "",
          status: true,
          typing: false,
          unread: 0
        };
      } else {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", emailInput));
        const snap = await getDocs(q);
        if (snap.empty) return alert("User not found!");
        otherUser = snap.docs[0].data();
      }

      const chatExists = chats.some(c => {
        const isSelf = c.user1?.email === c.user2?.email && c.user1?.email === user.email;
        const isOther = (c.user1?.email === emailInput && c.user2?.email === user.email) || (c.user2?.email === emailInput && c.user1?.email === user.email);
        return isSelfChat ? isSelf : isOther;
      });

      if (chatExists) return alert("Chat already exists!");

      await addDoc(collection(db, "chats"), {
        last: null,
        user1: { userId: user.uid, userName: user.name, email: user.email, ppUrl: user.photo, bio: "", status: true, typing: false, unread: 0 },
        user2: otherUser
      });

      setEmailInput("");
      fetchChats();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: 300, height: "100vh", backgroundColor: "#1a1a1a", color: "#fff", display: "flex", flexDirection: "column", padding: 15, borderRight: "1px solid #333", boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <img src={user.photo} alt="avatar" style={{ width: 50, height: 50, borderRadius: "50%", marginRight: 10, border: "1px solid #555" }} />
        <div>
          <h3 style={{ margin: 0, fontSize: 18 }}>{user.name}</h3>
          <p style={{ margin: 0, color: "limegreen", fontSize: 12 }}>Online</p>
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <input type="text" placeholder="Enter Gmail" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} style={{ width: "100%", padding: 8, marginBottom: 10, borderRadius: 4, border: "1px solid #555", backgroundColor: "#2a2a2a", color: "#fff" }} />
        <button onClick={handleAddChat} style={{ width: "100%", padding: 10, backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>Add Chat</button>
      </div>

      <h4 style={{ margin: "10px 0", color: "#ccc" }}>Chats</h4>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {chats.map((chat, index) => {
          const isSelfChat = chat.user1?.email === chat.user2?.email;
          const displayName = isSelfChat ? "Message Yourself" : chat.user1?.email === user.email ? chat.user2?.email : chat.user1?.email;
          return (
            <div key={index} onClick={() => selectChat(chat)} style={{ padding: 10, borderRadius: 4, marginBottom: 5, backgroundColor: selectedChatId === chat.id ? "#3b82f6" : "#2a2a2a", cursor: "pointer", color: selectedChatId === chat.id ? "#fff" : "#ddd" }}>
              <strong>{displayName}</strong>
            </div>
          );
        })}
      </div>
    </div>
  );
}
