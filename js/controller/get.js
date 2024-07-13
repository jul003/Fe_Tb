import { addInner } from "https://bukulapak.github.io/element/process.js";
import { tempList } from "../temp/index-temp.js";

export function isiGadget(results) {
    results.forEach(isiListGadget)
    console.log(results)
}

function isiListGadget(value) {
    let content =
    tempList.replace('<h5 id="nameGadget" class="card-title">Xiaomi Note 8 Pro</h5>', '<h5 id="nameGadget" class="card-title">'+ value.nama +'</h5>')
            .replace('<p id="descGadget" class="card-text">Some quick example text to build on the card title.</p>', '<p id="descGadget" class="card-text">'+ value.deskripsi +'</p>')
            .replace('<h5 id="priceGadget">$299</h5>','<h5 id="priceGadget">$'+ value.harga +'</h5>')
    addInner("listGadget", content)
}