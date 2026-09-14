/**
 * Redimensiona e comprime uma imagem antes de convertê-la em data URL.
 *
 * Fotos tiradas direto do celular costumam ter vários MB — guardadas sem
 * tratamento como base64 no localStorage, poucas fotos já estouram a cota de
 * armazenamento do navegador (geralmente 5–10MB por site) e a gravação falha
 * de forma silenciosa, dando a impressão de que a foto "sumiu" ao salvar.
 * Reduzir para no máximo `maxDimension` px e recomprimir em JPEG resolve o
 * problema na raiz e ainda deixa a loja mais rápida no 4G.
 */
export function resizeImage(
  file: File,
  maxDimension = 1280,
  quality = 0.82,
  mimeType: 'image/jpeg' | 'image/png' = 'image/jpeg',
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        let { width, height } = img
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width)
            width = maxDimension
          } else {
            width = Math.round((width * maxDimension) / height)
            height = maxDimension
          }
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          resolve(reader.result as string)
          return
        }
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL(mimeType, quality))
      }
      img.onerror = () => reject(new Error('Não foi possível ler essa imagem'))
      img.src = reader.result as string
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}
