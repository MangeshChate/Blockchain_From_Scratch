const Block = require('./block');
const cryptoHash = require('./crypto-hash');

class Blockchain{
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock({data}){
        const newBlock = Block.mineBlock({
            prevBlock:this.chain[this.chain.length-1],
            data
        })
        this.chain.push(newBlock)
    }

    replaceChain(chain){

        if(chain.length <= this.chain.length){
            console.log("The Incomeing chain is not longer !");
            return 
        }
        if(!Blockchain.isValidChain(chain)){
            console.log("The incomeing chain is not valid !");
        }
        this.chain = chain;
    }

    static isValidChain(chain){
        if(JSON.stringify(chain[0])!== JSON.stringify(Block.genesis())){
            return false;
        }
        for(let i = 1 ; i<chain.length ; i++){
            const {timestamp , prevHash, hash,nonce,difficulty ,data } = chain[i];
            const lastDifficulty = chain[i-1].difficulty;
            const realLastHash = chain[i-1].hash;

            if(prevHash!== realLastHash) return false;

            const validatedHash = cryptoHash(timestamp ,prevHash ,nonce ,difficulty, data)
            if(hash !==validatedHash) return false;
            if(Math.abs(lastDifficulty -difficulty) > 1)return false;
        }
        return true;
        
            

    }
}

const blockchain = new Blockchain();
blockchain.addBlock({data:"block1"});
blockchain.addBlock({data:"block2"});


// console.log(blockchain)
const result = Blockchain.isValidChain(blockchain.chain)
// console.log(result)

module.exports = Blockchain;