export const TEAM_SELECTOR = 'table > tbody > tr > td:nth-child(1) > a'
export const COMPETITION_SELECTOR = 'table > tbody > tr > td:nth-child(1) > a'
export const MATCH_RESULT_SELECTOR = 'body > div > main > div:nth-child(7) > div > div.row.rowbreak.fond-main-cadre > div > div > div > table > tbody > tr'
export const BLUE_SIDE_TEAM_SELECTOR = 'div:nth-child(4) > div > div:nth-child(4) > div > div > div > div:nth-child(1) > div > div > div:nth-child(2) > div:nth-child(1)'
export const MATCH_TIME_SELECTOR = 'div:nth-child(4) > div > div:nth-child(4) > div > div > div > div:nth-child(1) > div > div > div:nth-child(1) > div.col-6.text-center > h1'
export const MATCH_VERSION_SELECTOR = 'body > div > main > div:nth-child(4) > div > div:nth-child(4) > div > div > div > div:nth-child(1) > div > div > div:nth-child(1) > div.col-3.text-right'
export const MATCH_STATS_SELECTOR = (teamSide: number) => `div:nth-child(4) > div > div:nth-child(4) > div > div > div > div:nth-child(1) > div > div > div:nth-child(2) > div:nth-child(${teamSide}) > div`
export const MATCH_VOIDS_SELECTOR = (teamSide: number) => `body > div > main > div:nth-child(4) > div > div:nth-child(4) > div > div > div > div:nth-child(6) > div > table > tbody > tr:nth-child(2) > td > div > div > div:nth-child(2)>div:nth-child(${teamSide + 1})`
export const MATCH_DATE_SELECTOR = 'body > div > main > div:nth-child(4) > div > div:nth-child(2) > div.col-12.col-sm-5.text-right'
export const MATCH_GAME_TAB_SELECTOR = '#gameMenuToggler > ul > li > a'
export const MATCH_TEAM_NAME_SELECTOR = (teamSide: number) => 'div:nth-child(4) > div > div:nth-child(4) > div > div > div > div:nth-child(1) > div > div > div:nth-child(2) > div:nth-child(' + teamSide + ')'
