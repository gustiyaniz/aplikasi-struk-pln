let selectedFile = null

document
.getElementById('imageInput')
.addEventListener('change', function(e){

  selectedFile = e.target.files[0]

  if(selectedFile){

    document
    .getElementById('preview')
    .src =
    URL.createObjectURL(selectedFile)

  }

})

async function scanOCR(){

  if(!selectedFile){
    alert('Pilih screenshot dulu')
    return
  }

  try{

    const result =
    await Tesseract.recognize(
      selectedFile,
      'eng'
    )

    const text = result.data.text

    console.log(text)

    const tokenRegex =
    /(\d{4}\s\d{4}\s\d{4}\s\d{4}\s\d{4})/

    const tokenMatch =
    text.match(tokenRegex)

    if(tokenMatch){
      document.getElementById('token').value =
      tokenMatch[0]
    }

    const meterRegex =
    /Nomor Meter\s*(\d{11,12})/i

    const meterMatch =
    text.match(meterRegex)

    if(meterMatch){
      document.getElementById('meter').value =
      meterMatch[1]
    }

    const pelangganRegex =
    /Nama Pelanggan\s*([A-Z\*]+)/i

    const pelangganMatch =
    text.match(pelangganRegex)

    if(pelangganMatch){
      document.getElementById('pelanggan').value =
      pelangganMatch[1]
    }

    const tarifRegex =
    /R1\s*\/\s*\d+\s*VA/i

    const tarifMatch =
    text.match(tarifRegex)

    if(tarifMatch){
      document.getElementById('tarif').value =
      tarifMatch[0]
    }

    const nominalRegex =
    /Token PLN\s([\d\.]+)/i

    const nominalMatch =
    text.match(nominalRegex)

    if(nominalMatch){
      document.getElementById('nominal').value =
      'Token PLN ' + nominalMatch[1]
    }

    document.getElementById('kwh').value = '38,7'

    alert('OCR berhasil')

  }catch(err){

    console.error(err)
    alert('OCR gagal')

  }

}

function printReceipt(){

  document.getElementById('rToken').innerText =
  document.getElementById('token').value

  document.getElementById('rPelanggan').innerText =
  document.getElementById('pelanggan').value

  document.getElementById('rTarif').innerText =
  document.getElementById('tarif').value

  document.getElementById('rMeter').innerText =
  document.getElementById('meter').value

  document.getElementById('rKwh').innerText =
  document.getElementById('kwh').value

  document.getElementById('rNominal').innerText =
  document.getElementById('nominal').value

  document.getElementById('rHarga').innerText =
  document.getElementById('harga').value

  document.getElementById('dateNow').innerText =
  new Date().toLocaleString('id-ID')

  window.print()

}
