import { postData } from "https://bukulapak.github.io/api/process.js";
import { onClick, getValue } from "https://bukulapak.github.io/element/process.js";
import { urlPOST, AmbilResponse } from "../config/url_post.js";

function pushData() {
    
    var nama = getValue("nama");
    var merk = getValue("merk");
    var harga = getValue("harga");
    var deskripsi = getValue("deskripsi");

    
    if (!nama || !merk || !harga || !deskripsi) {
        alert('Silakan isi semua kolom.');
        return;
    }


harga = parseFloat(harga);
if (isNaN(harga)) {
    alert('Harga harus berupa angka.');
    return;
}

    
    let data = {
        nama: nama,
        merk: merk,
        harga: harga,
        deskripsi: deskripsi
    };

    
    postData(urlPOST, data, AmbilResponse);

   
    console.log('Data berhasil dikirim:', data);

    
    document.getElementById('dataForm').reset();
}

onClick("button", pushData);
