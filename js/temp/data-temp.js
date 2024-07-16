export let dataTempRow =
`
<tr>
    <td>#IDGadget#</td>
    <td>#NamaGadget#</td>
    <td>#MerkGadget#</td>
    <td>#HargaGadget#</td>
    <td>#Deskripsi#</td>
    <td class="w-10/12 text-left py-3 px-8 col-span-1 flex items-center space-x-4">
    <button type="button"
        id="editbtn"
        class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal bg-blue-600 text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
        Edit
    </button>
    <button type="button"
        id="del_button"
        onclick="confirmDelete('#IDHAPUS#')"
        class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal bg-orange-600 text-white shadow-[0_4px_9px_-4px_#ea580c] transition duration-150 ease-in-out hover:bg-orange-700 hover:shadow-[0_8px_9px_-4px_rgba(234,88,12,0.3),0_4px_18px_0_rgba(234,88,12,0.2)] focus:bg-orange-700 focus:shadow-[0_8px_9px_-4px_rgba(234,88,12,0.3),0_4px_18px_0_rgba(234,88,12,0.2)] focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-[0_8px_9px_-4px_rgba(234,88,12,0.3),0_4px_18px_0_rgba(234,88,12,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(234,88,12,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(234,88,12,0.2),0_4px_18px_0_rgba(234,88,12,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(234,88,12,0.2),0_4px_18px_0_rgba(234,88,12,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(234,88,12,0.2),0_4px_18px_0_rgba(234,88,12,0.1)]">
        Hapus
</button>

    </td>
</tr>`;