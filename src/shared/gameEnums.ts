export enum GameType {
  MFE = 0,
  IFRAME = 1,
}

export enum GameGenre {
  PUZZLE = 1,
  STRATEGY = 2,
  ADVENTURE = 3,
  ACTION = 4,
  PARTY = 5,
}

// Labels para URLs amigáveis
export const GameTypeLabels: Record<GameType, string> = {
  [GameType.MFE]: 'mfe',
  [GameType.IFRAME]: 'iframe',
}

export const GameGenreLabels: Record<GameGenre, string> = {
  [GameGenre.PUZZLE]: 'puzzle',
  [GameGenre.STRATEGY]: 'strategy',
  [GameGenre.ADVENTURE]: 'adventure',
  [GameGenre.ACTION]: 'action',
  [GameGenre.PARTY]: 'party',
}
