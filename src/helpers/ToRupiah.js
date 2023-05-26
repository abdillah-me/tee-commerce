function formatRupiah(number) {
   let rupiah = number.toLocaleString("id-ID");
   rupiah = "Rp " + rupiah;
   return rupiah;
}

export default formatRupiah