// Daftar data pengguna
var admin = [
    {
        id: "1",
        name: "qinthar",
        email: "qinthar@gmail.com",
        passwordHash: CryptoJS.SHA256("garut").toString(),
        role: "restricted" // Hanya bisa akses data.html
    },
    {
        id: "2",
        name: "Dzulkifli",
        email: "dzulkiflifaiz11@gmail.com",
        passwordHash: CryptoJS.SHA256("ganteng").toString(),
        role: "unlimited" // Bisa akses semua halaman
    }
];

// Fungsi untuk mendapatkan URL redirect dari query parameter
function getRedirectUrl(userRole) {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get("redirect");

    // Jika tidak ada query parameter redirect, return URL default berdasarkan role
    if (!redirectUrl) {
        return userRole === "restricted" ? "data.html" : "data.html"; // Qinthar hanya ke data.html
    }

    // Validasi URL redirect berdasarkan role
    const allowedRedirectUrls = userRole === "restricted" ? ["data.html"] : ["data.html", "edit_data.html"];

    return allowedRedirectUrls.includes(redirectUrl) ? redirectUrl : "data.html";
}

// Fungsi untuk redirect dengan validasi role
function safeRedirect(targetUrl) {
    const userRole = sessionStorage.getItem("userRole");

    // Debugging
    console.log(`safeRedirect() - User Role: ${userRole}, Target URL: ${targetUrl}`);

    // Jika user role "restricted", hanya boleh akses data.html
    if (userRole === "restricted" && targetUrl !== "data.html") {
        alert("Akses ditolak. Anda hanya dapat mengakses halaman data.");
        window.location.href = "data.html";
    } else {
        window.location.href = targetUrl;
    }
}

// Fungsi untuk validasi sesi pengguna
function validateSession() {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    const sessionStartTime = sessionStorage.getItem("sessionStartTime");
    const userRole = sessionStorage.getItem("userRole");

    // Periksa apakah sesi valid
    if (!isAuthenticated || !sessionStartTime) {
        alert("Sesi Anda telah kedaluwarsa, silakan login kembali.");
        sessionStorage.clear();
        window.location.href = "index.html";
        return;
    }

    // Periksa waktu kedaluwarsa (1 menit = 60000 ms)
    const sessionDuration = Date.now() - parseInt(sessionStartTime);
    if (sessionDuration > 60000) { // Jika lebih dari 1 menit
        alert("Sesi Anda telah berakhir karena inaktivitas.");
        sessionStorage.clear();
        window.location.href = "index.html";
        return;
    }

    // Blokir akses ke edit_data.html jika user "restricted"
    if (userRole === "restricted" && window.location.pathname.includes("edit_data.html")) {
        alert("Akses ditolak. Anda hanya dapat mengakses halaman data.");
        window.location.href = "data.html";
    }
}

// Fungsi untuk login
function getLogin() {
    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value;

    // Validasi jika field kosong
    if (!email || !password) {
        alert("Harap isi semua bidang!");
        return;
    }

    // Validasi format email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Format email tidak valid!");
        return;
    }

    // Hash password input
    var passwordHash = CryptoJS.SHA256(password).toString();

    // Cek keberadaan user
    var user = admin.find((user) => user.email === email && user.passwordHash === passwordHash);

    if (user) {
        // Simpan sesi
        sessionStorage.setItem("isAuthenticated", true);
        sessionStorage.setItem("userRole", user.role);
        sessionStorage.setItem("userId", user.id);
        sessionStorage.setItem("sessionStartTime", Date.now());

        alert(`Selamat datang, ${user.name}!`);

        // Redirect ke halaman yang sesuai berdasarkan role
        const redirectUrl = getRedirectUrl(user.role);
        safeRedirect(redirectUrl);
    } else {
        alert("Email atau password salah.");
    }
}

// Fungsi untuk logout
function logout() {
    sessionStorage.clear();
    alert("Anda telah keluar.");
    window.location.href = "index.html";
}
