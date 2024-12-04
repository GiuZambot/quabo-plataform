import {
  GameGenre,
  GameGenreLabels,
  GameType,
  GameTypeLabels,
} from '@shared/gameEnums'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGamesList } from '../../hooks/useGamesList'

const GamesList = () => {
  const { games, loading, error, fetchGames } = useGamesList()

  useEffect(() => {
    // Exemplo: Carregar jogos com filtro de gênero e título
    fetchGames()
  }, [fetchGames])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <p>Games List</p>
      <ul>
        {games.map((game) => {
          const gameTypeLabel = GameTypeLabels[game.game_type as GameType]
          const genreLabel = GameGenreLabels[game.genre as GameGenre]
          const gameUrl = `/games/${gameTypeLabel}/${genreLabel}/${game.game_name}`

          return (
            <li key={game.id}>
              <Link to={gameUrl}>
                <strong>{game.title}</strong>
              </Link>{' '}
              - {game.description}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default GamesList
