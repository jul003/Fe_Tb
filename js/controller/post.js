import { postData } from "https://bukulapak.github.io/api/process.js";
import { onClick, getValue } from "https://bukulapak.github.io/element/process.js";
import { urlPOST, AmbilResponse } from "../config/url_post.js";

// Fetch CSRF token
async function getCsrfToken() {
    try {
        const response = await fetch('http://127.0.0.1:8080/csrf-token', {  
            method: 'GET',
            credentials: 'include'  // Mengizinkan pengiriman cookie
        });

        if (!response.ok) {
            throw new Error('Failed to fetch CSRF token');
        }

        const data = await response.json();
        return data.csrf_token;  // Mengembalikan CSRF token
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
        alert('Gagal mengambil token CSRF');
        return null;
    }
}

// Function to sanitize input
function sanitizeInput(input) {
    if (typeof input === 'string') {
        return input.trim(); // Menghapus spasi ekstra di awal dan akhir string
    }
    return input; // Mengembalikan input apa adanya jika bukan string
}

// Function to remove non-numeric characters from currency format (e.g., 'Rp 1.000' -> '1000')
function stripRupiahFormatting(input) {
    return input.replace(/[^\d]/g, ''); // Hapus semua karakter selain angka
}

// Function to push data to the backend
async function pushData() {
    try {
        // Get the values from the form fields
        const nama = sanitizeInput(getValue("nama"));
        const merk = sanitizeInput(getValue("merk"));
        let harga = sanitizeInput(getValue("harga"));
        const spesifikasiProsesor = sanitizeInput(getValue("spesifikasiProsesor"));
        let spesifikasiRAM = sanitizeInput(getValue("spesifikasiRAM"));
        let spesifikasiStorage = sanitizeInput(getValue("spesifikasiStorage"));
        const deskripsi = sanitizeInput(getValue("deskripsi"));

        // Validation for empty inputs
        if (!nama || !merk || !harga || !deskripsi) {
            alert('Silakan isi semua kolom.');
            return;
        }

        // Length validation for inputs
        if (nama.length > 50) {
            alert('Nama tidak boleh lebih dari 50 karakter.');
            return;
        }

        if (merk.length > 30) {
            alert('Merk tidak boleh lebih dari 30 karakter.');
            return;
        }

        if (deskripsi.length > 200) {
            alert('Deskripsi tidak boleh lebih dari 200 karakter.');
            return;
        }

        // Pattern validation for valid name and merk (letters, numbers, and spaces only)
        const validNamePattern = /^[a-zA-Z0-9\s]+$/;
        if (!validNamePattern.test(nama)) {
            alert('Nama hanya boleh mengandung huruf, angka, dan spasi.');
            return;
        }

        if (!validNamePattern.test(merk)) {
            alert('Merk hanya boleh mengandung huruf, angka, dan spasi.');
            return;
        }

        // Convert harga, RAM, and storage to their appropriate types
        harga = parseFloat(stripRupiahFormatting(harga)); // Strips non-numeric characters from 'harga'
        spesifikasiRAM = parseInt(spesifikasiRAM);
        spesifikasiStorage = parseInt(spesifikasiStorage);

        // Numeric validation for harga, RAM, and storage
        if (isNaN(harga) || harga < 1000 || harga > 100000000) {
            alert('Harga harus berupa angka dan berada di antara Rp 1.000 dan Rp 100.000.000.');
            return;
        }

        if (isNaN(spesifikasiRAM) || spesifikasiRAM < 1 || spesifikasiRAM > 128) {
            alert('RAM harus berupa angka antara 1 GB dan 128 GB.');
            return;
        }

        if (isNaN(spesifikasiStorage) || spesifikasiStorage < 1 || spesifikasiStorage > 2000) {
            alert('Storage harus berupa angka antara 1 GB dan 2000 GB.');
            return;
        }

        // Prepare the data object
        const data = {
            nama: nama,
            merk: merk,
            harga: harga,
            spesifikasi: {
                prosesor: spesifikasiProsesor,
                ram: spesifikasiRAM,
                storage: spesifikasiStorage
            },
            deskripsi: deskripsi
        };

        // Fetch CSRF token
        const csrfToken = await getCsrfToken();
        if (!csrfToken) {
            console.error('Token CSRF tidak ditemukan');
            return;
        }

        console.log("CSRF Token yang akan dikirim:", csrfToken);

        // Add CSRF token to the request headers
        const headers = {
            'Content-Type': 'application/json',
            'X-Csrf-Token': csrfToken  // Add CSRF token in the header
        };

        // Send data using the postData function
        await postData(urlPOST, data, AmbilResponse, headers);  // Send data with CSRF header

        console.log('Data berhasil dikirim:', data);

        // Reset the form after successful submission
        document.getElementById('dataForm').reset();
    } catch (error) {
        console.error('Terjadi kesalahan saat mengirim data:', error);
        alert('Terjadi kesalahan saat mengirim data. Silakan coba lagi.');
    }
}

// Make sure you call pushData on the appropriate event, e.g., form submission or button click
document.getElementById('submitButton').addEventListener('click', pushData);
