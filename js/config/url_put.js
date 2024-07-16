const urlParams = new URLSearchParams(window.location.search);
const gadgetId = urlParams.get('gadgetId');

export let urlPUT = "https://tb-2024-2df3fc45e2ad.herokuapp.com/update/" + gadgetId;

export function getResponse(result) {
    console.log(result);  
    window.location.href = "add_data_gadget.html";
}