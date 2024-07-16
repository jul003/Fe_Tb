import { postData } from "https://bukulapak.github.io/api/process.js";
import { onClick, getValue } from "https://bukulapak.github.io/element/process.js";
import { urlPOST, AmbilResponse} from "../config/url_post.js";


function pushData(){
    let data = {
        "nama": getValue("nama"),
        "merk": getValue("merk"),
        "harga": getValue("harga"),
        "deskripsi": getValue("deskripsi")
    }
    postData(urlPOST, data, AmbilResponse);

}

onClick("button", pushData);
