export let urlPOST = "https://tb-2024-2df3fc45e2ad.herokuapp.com/insertgadget"

export function AmbilResponse(result) {
    console.log(result); //menampilkan response API pada console
    alert(result.message); //menampilkan response API pada alert
    window.location.reload(); //reload halaman setelah klik ok pada alert
    window.location.href = "data.html";
}