const urlParams = new URLSearchParams(window.location.search);
const gadgetId = urlParams.get("gadgetId");

export let urlFetch = "https://tb-2024-2df3fc45e2ad.herokuapp.com/gadget/" + gadgetId;