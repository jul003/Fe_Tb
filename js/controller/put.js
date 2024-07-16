import { putData } from "https://bukulapak.github.io/api/process.js";
import { onClick, getValue } from "https://bukulapak.github.io/element/process.js";
import { urlPUT, AmbilResponse} from "../config/url_put.js";


function pushData(){
    let data = {
        "nama": getValue("nama"),
        "merk": getValue("merk"),
        "harga": getValue("harga"),
        "deskripsi": getValue("deskripsi")
    }
    putData(urlPUT, data, AmbilResponse);

}

onClick("button", pushData);