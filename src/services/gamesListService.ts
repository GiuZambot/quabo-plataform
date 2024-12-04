import axios from 'axios'

// Configuração base do Axios
const api = axios.create({
  baseURL: '/api', // Base da URL (ajustada para o proxy ou produção)
  timeout: 10000, // Timeout de 10 segundos
})

// Tipagem dos dados de retorno da API
export interface GameList {
  id: number
  title: string
  description: string
  player_count: string
  play_time: string
  age_rating: number
  game_type: number
  game_name: string
  genre: number
}

export interface GetGamesParams {
  page?: number
  size?: number
  genre?: number[]
  title?: string
}

export interface GetGamesResponse {
  data: GameList[]
  total: number
  page: number
  size: number
}

// Função para buscar os jogos
export const getGamesList = async (
  params: GetGamesParams = {},
): Promise<GetGamesResponse> => {
  const response = await api.get<GetGamesResponse>('/games', { params })
  return response.data
}
