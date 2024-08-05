
export const UPDATE = "/update"

export const CATEGORY = "/category"

export const BASKET = "/basket"
export const UPDATE_BASKET = UPDATE + BASKET
export const UPDATE_BASKET_WITH_COMPETITION = UPDATE + '/:competitionId' + BASKET

export const PLAYERS = "/players"
export const LIST_BASKET_PLAYERS = PLAYERS + BASKET + '/:teamId'
export const UPDATE_BASKET_PLAYERS_STATS = UPDATE + PLAYERS + BASKET + '/:teamId'

export const LOL = '/lol'
export const UPDATE_LOL = UPDATE + LOL
export const LIST_LOL_STATS = PLAYERS + LOL + '/:teamId'
export const UPDATE_LOL_PLAYERS_STATS = UPDATE + PLAYERS + LOL + '/:teamId'

export const COMPETITION = "/competition"
export const LIST_COMPETITION = '/:competitionId/:categoryUrl'
export const COMPETITION_UPDATE_BASKET = COMPETITION + UPDATE_BASKET
export const COMPETITION_UPDATE_LOL = COMPETITION + UPDATE_LOL
export const UPDATE_LOL_WITH_COMPETITION = UPDATE + '/:competitionId' + LOL

export const LIST_SEASON = '/seasons/:categoryUrl'
export const LIST_SEASON_BY_CATEGORY = '/competition/:season/:categoryUrl'
export const LIST_COMPETITION_BY_CATEGORY = '/competition/:categoryUrl'