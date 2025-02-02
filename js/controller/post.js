import { postData } from "https://bukulapak.github.io/api/process.js";
import { onClick, getValue } from "https://bukulapak.github.io/element/process.js";
import { urlPOST, AmbilResponse } from "../config/url_post.js";

async function pushData() {
    try {
        const nama = sanitizeInput(getValue("nama"));
        const merk = sanitizeInput(getValue("merk"));
        let harga = sanitizeInput(getValue("harga"));
        const spesifikasiProsesor = sanitizeInput(getValue("spesifikasiProsesor"));
        let spesifikasiRAM = sanitizeInput(getValue("spesifikasiRAM"));
        let spesifikasiStorage = sanitizeInput(getValue("spesifikasiStorage"));
        const deskripsi = sanitizeInput(getValue("deskripsi"));

        // Validasi input kosong
        if (!nama || !merk || !harga || !deskripsi) {
            alert('Silakan isi semua kolom.');
            return;
        }

        // Validasi panjang input
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

        // Validasi pola input (regex)
        const validNamePattern = /^[a-zA-Z0-9\s]+$/;
        if (!validNamePattern.test(nama)) {
            alert('Nama hanya boleh mengandung huruf, angka, dan spasi.');
            return;
        }

        if (!validNamePattern.test(merk)) {
            alert('Merk hanya boleh mengandung huruf, angka, dan spasi.');
            return;
        }

        harga = parseFloat(stripRupiahFormatting(harga));
        spesifikasiRAM = parseInt(spesifikasiRAM);
        spesifikasiStorage = parseInt(spesifikasiStorage);

        // Validasi angka dan rentang
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

        await postData(urlPOST, data, AmbilResponse);

        console.log('Data berhasil dikirim:', data);

        document.getElementById('dataForm').reset();
    } catch (error) {
        console.error('Terjadi kesalahan saat mengirim data:', error);
        alert('Terjadi kesalahan saat mengirim data. Silakan coba lagi.');
    }
}

onClick("button", pushData);

document.getElementById('harga').addEventListener('input', function (e) {
    this.value = formatRupiah(this.value);
});

// Fungsi untuk memformat harga dalam format rupiah
function formatRupiah(value) {
    let numberString = value.replace(/[^,\d]/g, '').toString();
    let split = numberString.split(',');
    let sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    let ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    return `Rp ${rupiah}`;
}

// Fungsi untuk menghapus format rupiah
function stripRupiahFormatting(value) {
    return value.replace(/[^0-9,-]+/g, '').replace(',', '.');
}

// Fungsi untuk sanitasi input
function sanitizeInput(value) {
    return value.replace(/<|>|"|'/g, '');
}
