import { get } from "https://bukulapak.github.io/api/process.js";
import { isiTabelData } from "./controller/get_data.js";
import { urlAPI } from "./config/url.js";
get(urlAPI, isiTabelData);