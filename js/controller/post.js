import { postData } from "https://bukulapak.github.io/api/process.js";
import { onClick, getValue } from "https://bukulapak.github.io/element/process.js";
import { urlPOST, } from "../config/url_post.js";


function pushData(){
    let data = {
        "nama": getValue("nama"),
        "merk": getValue("merk"),
        "harga": getValue("harga"),
        "deskripsi": getValue("deskripsi")
    }
    postData(urlPOST, data);
    cons.result = console.log()
    alert(result)

}

onClick("button", pushData);
