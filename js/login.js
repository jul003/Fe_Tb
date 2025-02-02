// Data pengguna
var admin = [
    {
        id: "1",
        name: "qinthar",
        email: "qintharhahay@gmail.com",
        passwordHash: CryptoJS.SHA256("garut").toString()
    },
    {
        id: "2",
        name: "Dzulkifli",
        email: "dzulkiflifaiz11@gmail.com",
        passwordHash: CryptoJS.SHA256("ganteng").toString()
    }
];

// Variabel untuk menyimpan percobaan login
var loginAttempts = {}; // Format: { email: { count: 0, lastAttempt: timestamp } }

// Fungsi untuk login
function getLogin() {
    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value;

    // Validasi jika field kosong
    if (!email || !password) {
        alert("Harap isi semua bidang!");
        return;
    }

    // Validasi format email menggunakan regex
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Format email tidak valid!");
        return;
    }

    // Inisialisasi rate limiting
    const MAX_ATTEMPTS = 3; // Maksimal percobaan
    const LOCK_TIME = 5 * 60 * 1000; // Waktu blokir: 5 menit

    // Cek apakah ada data untuk email ini
    if (!loginAttempts[email]) {
        loginAttempts[email] = { count: 0, lastAttempt: Date.now() };
    }

    const attemptsData = loginAttempts[email];
    const timeSinceLastAttempt = Date.now() - attemptsData.lastAttempt;

    // Jika dalam waktu blokir
    if (attemptsData.count >= MAX_ATTEMPTS && timeSinceLastAttempt < LOCK_TIME) {
        alert("Anda telah mencapai batas percobaan login. Silakan coba lagi nanti.");
        window.location.href = "index.html"; // Redirect ke halaman login
        return;
    }

    // Reset percobaan jika sudah melewati waktu blokir
    if (timeSinceLastAttempt >= LOCK_TIME) {
        attemptsData.count = 0;
    }

    // Hash password input untuk pencocokan
    var passwordHash = CryptoJS.SHA256(password).toString();

    // Cek keberadaan user
    var user = admin.find((user) => user.email === email && user.passwordHash === passwordHash);

    if (user) {
        // Jika login berhasil, reset percobaan dan simpan sesi
        attemptsData.count = 0;
        sessionStorage.setItem("isAuthenticated", true);
        sessionStorage.setItem("userRole", "admin");
        sessionStorage.setItem("userId", user.id);
        sessionStorage.setItem("sessionStartTime", Date.now());

        alert(`Selamat datang, ${user.name}!`);
        window.location.href = "data.html"; // Redirect ke halaman dashboard
    } else {
        // Jika login gagal, tambah jumlah percobaan
        attemptsData.count++;
        attemptsData.lastAttempt = Date.now();

        if (attemptsData.count >= MAX_ATTEMPTS) {
            alert("Anda telah mencapai batas percobaan login. Silakan coba lagi nanti.");
            window.location.href = "index.html"; // Redirect ke halaman login
        } else {
            alert("Email atau password salah.");
        }
    }
}

// Fungsi untuk validasi sesi
function validateSession() {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    const sessionStartTime = sessionStorage.getItem("sessionStartTime");

    // Periksa apakah sesi valid
    if (!isAuthenticated || !sessionStartTime) {
        alert("Sesi Anda telah kedaluwarsa, silakan login kembali.");
        sessionStorage.clear();
        window.location.href = "index.html";
        return;
    }

    // Periksa waktu kedaluwarsa (30 menit = 1800000 ms)
    const sessionDuration = Date.now() - sessionStartTime;
    if (sessionDuration > 1800000) {
        alert("Sesi Anda telah berakhir karena inaktivitas.");
        sessionStorage.clear();
        window.location.href = "index.html";
    }
}

// Fungsi untuk logout
function logout() {
    sessionStorage.clear();
    alert("Anda telah keluar.");
    window.location.href = "index.html";
}
