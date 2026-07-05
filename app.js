// app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCNsfEd11Yv2kNCO_T3s07WJ1eAXUyhssE",
  authDomain: "bangkaew-pet-db.firebaseapp.com",
  projectId: "bangkaew-pet-db",
  storageBucket: "bangkaew-pet-db.firebasestorage.app",
  messagingSenderId: "79581962937",
  appId: "1:79581962937:web:1a50ce4c7fe42340cc7168"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("loginBtn").addEventListener("click", async () => {
    
    const houseNo = document.getElementById("houseNumber").value;
    const moo = document.getElementById("mooNumber").value;
    const isRented = document.getElementById("isRented").checked;

    if(!houseNo || !moo) {
        alert("⚠️ กรุณากรอกเลขที่บ้านและเลือกหมู่ให้ครบถ้วนครับ");
        return;
    }

    const btn = document.getElementById("loginBtn");
    const originalText = btn.innerHTML;
    btn.innerHTML = "กำลังเชื่อมต่อระบบ...";

    try {
        await addDoc(collection(db, "Test_Connection"), {
            houseNumber: houseNo,
            mooNumber: moo,
            isRented: isRented,
            loginTime: new Date()
        });
        
        // บันทึกข้อมูลลงเครื่องมือถือเพื่อนำไปใช้ในหน้าถัดไป
        localStorage.setItem("userHouseNo", houseNo);
        localStorage.setItem("userMoo", moo);
        
        // เด้งไปหน้า Dashboard
        window.location.href = "dashboard.html";

    } catch (e) {
        console.error("Error: ", e);
        alert("❌ เกิดข้อผิดพลาดในการเชื่อมต่อ: " + e.message);
        btn.innerHTML = originalText;
    }
});
