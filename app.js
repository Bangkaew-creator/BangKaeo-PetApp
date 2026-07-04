// app.js
// 1. นำเข้าเครื่องมือจาก Firebase (เวอร์ชัน 10)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// 2. ใส่กุญแจ Firebase Config ของคุณตรงนี้ (เอามาจากหน้าเว็บ Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyCNsfEd11Yv2kNCO_T3s07WJ1eAXUyhssE",
  authDomain: "bangkaew-pet-db.firebaseapp.com",
  projectId: "bangkaew-pet-db",
  storageBucket: "bangkaew-pet-db.firebasestorage.app",
  messagingSenderId: "79581962937",
  appId: "1:79581962937:web:1a50ce4c7fe42340cc7168"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 3. เริ่มต้นเปิดใช้งาน Firebase และ Database
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 4. เขียนคำสั่งให้ "ปุ่มเข้าสู่ระบบ" ทำงาน
document.getElementById("loginBtn").addEventListener("click", async () => {
    
    // ดึงค่าจากช่องกรอกข้อมูลหน้าเว็บ
    const houseNo = document.getElementById("houseNumber").value;
    const moo = document.getElementById("mooNumber").value;
    const isRented = document.getElementById("isRented").checked;

    // เช็คว่ากรอกครบไหม
    if(!houseNo || !moo) {
        alert("⚠️ กรุณากรอกเลขที่บ้านและเลือกหมู่ให้ครบถ้วนครับ");
        return;
    }

    // เปลี่ยนข้อความปุ่มระหว่างรอโหลด
    const btn = document.getElementById("loginBtn");
    const originalText = btn.innerHTML;
    btn.innerHTML = "กำลังเชื่อมต่อระบบ...";

    try {
        // ทดสอบส่งข้อมูลไปบันทึกใน Firestore Collection ชื่อ "Test_Connection"
        const docRef = await addDoc(collection(db, "Test_Connection"), {
            houseNumber: houseNo,
            mooNumber: moo,
            isRented: isRented,
            loginTime: new Date()
        });
        
        alert(`✅ ยินดีด้วย! เชื่อมต่อหน้าเว็บกับ Firebase สำเร็จแล้ว\nข้อมูลบ้านเลขที่ ${houseNo} ถูกส่งเข้าฐานข้อมูลแล้ว`);
        
        // ล้างช่องกรอกข้อมูล
        document.getElementById("houseNumber").value = "";
        document.getElementById("mooNumber").value = "";
        document.getElementById("isRented").checked = false;

    } catch (e) {
        console.error("Error: ", e);
        alert("❌ เกิดข้อผิดพลาดในการเชื่อมต่อ: " + e.message);
    } finally {
        // คืนค่าปุ่มกลับมาเหมือนเดิม
        btn.innerHTML = originalText;
    }
});