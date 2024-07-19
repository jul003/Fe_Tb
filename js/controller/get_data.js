import { addInner } from "https://bukulapak.github.io/element/process.js";
import { dataTempRow } from "../temp/data-temp.js";

export function isiTabelData(results) {
    resetRow();
    results.forEach(isiDataGadget);
    console.log(results);
}

function isiDataGadget(value) {
    let spesifikasi = value.spesifikasi || {};
    let spesifikasiProsesor = spesifikasi.prosesor ? spesifikasi.prosesor : "prosesor tidak tersedia";
    let spesifikasiRAM = spesifikasi.ram ? spesifikasi.ram + " GB" : "RAM tidak tersedia";
    let spesifikasiStorage = spesifikasi.storage ? spesifikasi.storage + " GB" : "Storage tidak tersedia";

    let spesifikasiContent = `
        Prosesor: ${spesifikasiProsesor}<br>
        RAM: ${spesifikasiRAM}<br>
        Storage: ${spesifikasiStorage}
    `;

    let content = dataTempRow
        .replace('#IDGadget#', value._id)
        .replace('#NamaGadget#', value.nama ? value.nama : "nama tidak tersedia")
        .replace('#MerkGadget#', value.merk)
        .replace('#HargaGadget#', formatRupiah(value.harga))
        .replace('#Spesifikasi#', spesifikasiContent)
        .replace('#Deskripsi#', value.deskripsi)
        .replace("#IDEDIT", value._id)
        .replace("#IDHAPUS", value._id);

    // Tambahkan konten ke dalam tabel
    addInner("tabelGadget", content);
}

function resetRow() {
    let tabelGadget = document.getElementById("tabelGadget");
    if (tabelGadget) {
        tabelGadget.innerHTML = '';
    }
}

function formatRupiah(value) {
    let numberString = value.toString().replace(/[^,\d]/g, '');
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
