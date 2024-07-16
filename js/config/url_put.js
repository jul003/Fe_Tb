const urlParams = new URLSearchParams(window.location.search);
const gadgetId = urlParams.get('gadgetId');

export let urlPUT = "https://tb-2024-2df3fc45e2ad.herokuapp.com/updategadget/" + gadgetId;

export function AmbilResponse(result) {
    console.log(result); //menampilkan response API pada console
    alert(result.message); //menampilkan response API pada alert
    window.location.href = "data.html"; //reload halaman setelah klik ok pada alert
}