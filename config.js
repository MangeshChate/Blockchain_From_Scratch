const MINE_RATE = 1000;
const INITIAL_DIFFCULTY = 2;

const GENSIS_DATA = {
    timestamp: 1,
    prevHash :'0x000',
    hash:'0x123',
    difficulty:INITIAL_DIFFCULTY,
    nonce:0,
    data:[]

}

module.exports = {GENSIS_DATA , MINE_RATE};