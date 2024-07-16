import { get } from "https://bukulapak.github.io/api/process.js";
import { isiDataGadget} from "./controller/edit.js";
import { urlFetch } from "./config/url_byid.js";
get(urlFetch, isiDataGadget);