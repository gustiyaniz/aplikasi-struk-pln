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

    // TOKEN PLN
    const tokenRegex =
    /(\d{4}\s\d{4}\s\d{4}\s\d{4}\s\d{4})/

    const tokenMatch =
    text.match(tokenRegex)

    if(tokenMatch){

      document
      .getElementById('token')
      .value =
      tokenMatch[0]

    }

    // NOMOR METER
    const meterRegex =
    /Nomor Meter\s*(\d{11,12})/i

    const meterMatch =
    text.match(meterRegex)

    if(meterMatch){

      document
      .getElementById('meter')
      .value =
      meterMatch[1]

    }

    // NOMINAL
    const nominalRegex =
    /Token PLN\s([\d\.]+)/i

    const nominalMatch =
    text.match(nominalRegex)

    if(nominalMatch){

      document
      .getElementById('nominal')
      .value =
      'Rp' + nominalMatch[1]

    }

    alert('OCR berhasil')

  }catch(err){

    console.error(err)

    alert('OCR gagal')

  }

}

function printReceipt(){

  document
  .getElementById('rMeter')
  .innerText =
  document.getElementById('meter').value

  document
  .getElementById('rToken')
  .innerText =
  document.getElementById('token').value

  document
  .getElementById('rNominal')
  .innerText =
  document.getElementById('nominal').value

  document
  .getElementById('dateNow')
  .innerText =
  new Date().toLocaleString('id-ID')

  window.print()

}
