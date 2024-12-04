import { useCallback, useEffect, useState } from 'react'
import {
  GameList,
  getGamesList,
  GetGamesParams,
} from '../services/gamesListService'

interface UseGamesListReturn {
  games: GameList[]
  loading: boolean
  error: string | null
  fetchGames: (params?: GetGamesParams) => Promise<void>
}

export const useGamesList = (): UseGamesListReturn => {
  const [games, setGames] = useState<GameList[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchGames = useCallback(async (params: GetGamesParams = {}) => {
    setLoading(true)
    setError(null)

    try {
      const response = await getGamesList(params)
      if (response.data) {
        setGames(response.data)
      }
    } catch (err: any) {
      setError(
        err.response?.data?.error || err.message || 'Error fetching games',
      )
    } finally {
      setLoading(false)
    }
  }, [])

  // Carregar dados ao montar, se necessário
  useEffect(() => {
    fetchGames() // Chamada inicial sem filtros
  }, [fetchGames])

  return { games, loading, error, fetchGames }
}
