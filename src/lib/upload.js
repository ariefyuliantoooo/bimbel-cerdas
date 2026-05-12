export async function uploadImage(file) {
  if (!file) return null

  const formData = new FormData()
  formData.append('image', file)

  try {
    const response = await fetch('http://localhost:5001/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Upload failed')
    }

    const data = await response.json()
    return data.url
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}
