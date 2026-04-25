import { supabase } from './supabase'

export async function uploadImage(file, bucket = 'images') {
  if (!file) return null

  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
  const filePath = `${fileName}`

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file)

  if (uploadError) {
    throw uploadError
  }

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath)

  return data.publicUrl
}
