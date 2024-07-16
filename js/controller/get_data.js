import { addInner } from "https://bukulapak.github.io/element/process.js";
import { dataTempRow } from "../temp/data-temp.js";

export function isiTabelData(results) {
    resetRow()
    results.forEach(isiDataGadget)
    console.log(results)
}

function isiDataGadget(value) {
    let content =
    dataTempRow.replace('#IDGadget#', value._id)
            .replace('#NamaGadget#', value.nama? value.nama : "nama tidak tersedia")
            .replace('#MerkGadget#', value.merk)
            .replace('#HargaGadget#', value.harga)
            .replace('#Deskripsi#', value.deskripsi)
    addInner("tabelGadget", content)
}

function resetRow() {
    document.getElementById("tabelGadget").innerHTML = '';
}