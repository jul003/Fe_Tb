export let dataTempRow =
`
<tr>
    <td>#IDGadget#</td>
    <td>#NamaGadget#</td>
    <td>#MerkGadget#</td>
    <td>#HargaGadget#</td>
    <td>#Deskripsi#</td>
    <td class="w-10/12 text-left py-3 px-8 col-span-1 flex items-center space-x-4">
    <th class="whitespace-nowrap pr-4 bg-white text-sm font-medium text-coolGray-800">
    <a type="button" href="edit_data.html?gadgetId=#IDEDIT#" style="color: blue;"> Edit </a>
    |
    <button type="button" id="del_button" onclick="confirmDelete('#IDHAPUS#')" style="color: red;"> Delete </button>
</th>


    </td>
</tr>`;