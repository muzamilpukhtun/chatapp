import { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import axios from "axios";

const IMAGE_BB_API_KEY = "76773900054a30b55622684d13f1cb6a"; 

export default function ChatWindow({ user, selectedChat }) {
  const [messages, setMessages] = useState([]);
  const [msgInput, setMsgInput] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const videoRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    if (!selectedChat) return;

    const q = query(
      collection(db, "chats", selectedChat.id, "message"),
      orderBy("time", "asc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const msgList = snapshot.docs.map(doc => doc.data());
      setMessages(msgList);
    });

    return () => unsub();
  }, [selectedChat]);

  const uploadImageToImageBB = async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    const res = await axios.post(`https://api.imgbb.com/1/upload?key=${IMAGE_BB_API_KEY}`, formData);
    return res.data.data.url;
  };

  const sendMessage = async () => {
    if (!msgInput && !imgFile) return;
    if (!selectedChat) return;

    let imgUrl = "";

    if (imgFile) {
      try {
        imgUrl = await uploadImageToImageBB(imgFile);
      } catch (err) {
        console.error("Image upload failed:", err);
        return;
      }
    }

    await addDoc(collection(db, "chats", selectedChat.id, "message"), {
      msgId: Date.now().toString(),
      senderId: user.uid,
      content: msgInput || "",
      imgUrl: imgUrl || "",
      time: serverTimestamp(),
      read: false,
      farwarded: false,
      reaction: []
    });

    setMsgInput("");
    setImgFile(null);
  };

  const handleFileChange = (e) => {
    setImgFile(e.target.files[0]);
  };

  const openCamera = () => {
    setShowCamera(true);
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch(err => console.error("Camera access denied:", err));
  };

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);

    canvas.toBlob(async (blob) => {
      try {
        const imgUrl = await uploadImageToImageBB(blob);
        await addDoc(collection(db, "chats", selectedChat.id, "message"), {
          msgId: Date.now().toString(),
          senderId: user.uid,
          content: "",
          imgUrl: imgUrl || "",
          time: serverTimestamp(),
          read: false,
          farwarded: false,
          reaction: []
        });
      } catch (err) {
        console.error("Image upload failed:", err);
      }
    }, "image/jpeg");

    stopCamera();
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  if (!selectedChat) {
    return <div style={{ flex: 1, padding: "10px", color: "#fff", backgroundColor: "#1a1a1a" }}>Select a chat to start messaging</div>;
  }

  const isSelfChat = selectedChat.user1?.email === selectedChat.user2?.email;
  const displayName = isSelfChat
    ? "Message Yourself"
    : selectedChat.user1?.email === user.email
    ? selectedChat.user2?.email
    : selectedChat.user1?.email;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: "#1a1a1a", color: "#fff", height: "100vh" }}>
      
      <div style={{ padding: "15px", borderBottom: "1px solid #333", backgroundColor: "#222" }}>
        <h3 style={{ margin: 0 }}>Chat with: {displayName}</h3>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "15px" }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: "15px",
              textAlign: msg.senderId === user.uid ? "right" : "left"
            }}
          >
            {msg.content && (
              <div style={{
                display: "inline-block",
                backgroundColor: "#333",
                padding: "8px 12px",
                borderRadius: "10px",
                maxWidth: "60%",
                wordBreak: "break-word"
              }}>
                {msg.content}
              </div>
            )}
            {msg.imgUrl && (
              <div style={{ marginTop: "5px" }}>
                <img src={msg.imgUrl} alt="sent" style={{ maxWidth: "200px", borderRadius: "6px" }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {showCamera && (
        <div style={{ position: "relative", padding: "10px", backgroundColor: "#111" }}>
          <video ref={videoRef} style={{ width: "100%", borderRadius: "8px" }}></video>
          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
            <button onClick={captureImage} style={{ flex: 1, padding: "10px", backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
              Capture & Send
            </button>
            <button onClick={stopCamera} style={{ flex: 1, padding: "10px", backgroundColor: "#f87171", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
              Close Camera
            </button>
          </div>
        </div>
      )}

      <div style={{ padding: "15px", borderTop: "1px solid #333", display: "flex", gap: "10px", backgroundColor: "#222" }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ color: "#fff" }}
        />
        <button onClick={openCamera} style={{ backgroundColor: "#444", color: "#fff", border: "none", padding: "10px", borderRadius: "4px", cursor: "pointer" }}>
          📷 Camera
        </button>
        <input
          value={msgInput}
          onChange={(e) => setMsgInput(e.target.value)}
          placeholder="Type a message"
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #555",
            backgroundColor: "#2a2a2a",
            color: "#fff"
          }}
        />
        <button onClick={sendMessage} style={{ backgroundColor: "#3b82f6", color: "#fff", border: "none", padding: "10px 15px", borderRadius: "4px", cursor: "pointer" }}>
          Send
        </button>
      </div>
    </div>
  );
}
