/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as SingleAlgo} from './single-algo'
export {default as AllAlgos} from './all-algos'
export {default as AlgoPass} from './algoPass'
export {default as AlgoFail} from './algoFail'
export {default as UserProfile} from './profile'
export {default as Game} from './game'
export {default as Footer} from './footer'
export {default as ErrorPage} from './errorPage'
export {default as Leaderboard} from './leaderboard'
