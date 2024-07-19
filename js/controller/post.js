import { postData } from "https://bukulapak.github.io/api/process.js";
import { onClick, getValue } from "https://bukulapak.github.io/element/process.js";
import { urlPOST, AmbilResponse } from "../config/url_post.js";

async function pushData() {
    try {
        const nama = getValue("nama");
        const merk = getValue("merk");
        let harga = getValue("harga");
        const spesifikasiProsesor = getValue("spesifikasiProsesor");
        let spesifikasiRAM = getValue("spesifikasiRAM");
        let spesifikasiStorage = getValue("spesifikasiStorage");
        const deskripsi = getValue("deskripsi");

        if (!nama || !merk || !harga || !deskripsi) {
            alert('Silakan isi semua kolom.');
            return;
        }

        
        harga = parseFloat(stripRupiahFormatting(harga));
        spesifikasiRAM = parseInt(spesifikasiRAM);
        spesifikasiStorage = parseInt(spesifikasiStorage);

        if (isNaN(harga)) {
            alert('Harga harus berupa angka.');
            return;
        }

        if (isNaN(spesifikasiRAM) || isNaN(spesifikasiStorage)) {
            alert('RAM dan Storage harus berupa angka.');
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

document.getElementById('harga').addEventListener('input', function(e) {
    this.value = formatRupiah(this.value);
});

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

function stripRupiahFormatting(value) {
    return value.replace(/[^0-9,-]+/g, '').replace(',', '.');
}
