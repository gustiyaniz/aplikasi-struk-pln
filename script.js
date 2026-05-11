let selectedFile

document
.getElementById('imageInput')
.addEventListener('change', function(e){

  selectedFile = e.target.files[0]

  document
  .getElementById('preview')
  .src = URL.createObjectURL(selectedFile)

})

async function scanOCR(){

  if(!selectedFile){
    alert('Pilih screenshot dulu')
    return
  }

  const result = await Tesseract.recognize(
    selectedFile,
    'eng'
  )

  const text = result.data.text

  // cari token 20 digit
  const tokenRegex = /\\b\\d{20}\\b/g
  const tokenMatch = text.match(tokenRegex)

  if(tokenMatch){
    document
    .getElementById('token')
    .value = tokenMatch[0]
  }

  // cari nominal
  const nominalRegex = /Rp\\s?[\\d\\.]+/i
  const nominalMatch = text.match(nominalRegex)

  if(nominalMatch){
    document
    .getElementById('nominal')
    .value = nominalMatch[0]
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

  const date = new Date()

  document
  .getElementById('dateNow')
  .innerText =
  date.toLocaleString('id-ID')

  window.print()

}
