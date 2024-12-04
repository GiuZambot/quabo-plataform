import { createClient } from '@supabase/supabase-js'

// Configuração do Supabase
const supabaseUrl = 'https://zrizsuzqweypqymbyjys.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  // Verificar o método HTTP
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Only GET requests are allowed' })
  }

  // Parâmetros de entrada
  const { page = 0, size = 20, genre = [], title = '' } = req.query

  // Converter parâmetros para tipos apropriados
  const pageInt = parseInt(page, 10)
  const sizeInt = parseInt(size, 10)
  const genreArray = Array.isArray(genre) ? genre.map(Number) : []
  const titleLike = title ? `%${title}%` : null

  try {
    let query = supabase
      .from('games_list')
      .select('*')
      .range(pageInt * sizeInt, pageInt * sizeInt + sizeInt - 1)

    if (genreArray.length > 0) {
      query = query.in('genre', genreArray)
    }

    if (titleLike) {
      query = query.ilike('title', titleLike)
    }

    const { data, error, count } = await query

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json({
      page: pageInt,
      size: sizeInt,
      data: data,
      total: count,
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
