// Returns a random DNA base
const returnRandBase = (dnaBases = ['A', 'T', 'C', 'G']) => {
  return dnaBases[Math.floor(Math.random() * dnaBases.length)];
};

// controlled to return a random DNA base object 
const ctrlReturnRandBase = (dnaBases=['A', 'T', 'C', 'G']) => {
  let random = Math.floor(Math.random() * dnaBases.length)
  return {
    singleBaseNumber: random,
    singleBase : dnaBases[random]
  } 
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//the array represents the dna whilst the number should represent the number of dna;
let pAequorFactory=(array,number=1)=>{
  return {
    _specimenNum : number,
    _dna : array,
    genFromUnique(aValue){//used to generate a unique random dna base compliment to the argument 'aValue'
      const dnaBases = ['A', 'T', 'C', 'G'];      
      return returnRandBase(dnaBases.filter((e)=> e != aValue))
    },
    mutate(){
      let newMutate = [...this._dna];
      let randomBase = ctrlReturnRandBase(newMutate);
      // console.log(newMutate) for testing
      // console.log(randomBase) for testing
      let replacement = this.genFromUnique(randomBase.singleBase)  
      // 40 - 41 for testing
      // let purity = {singleBaseNumber:randomBase.singleBaseNumber,replacement:replacement} 
      // console.log(purity)
      newMutate[randomBase.singleBaseNumber] = replacement;
      return newMutate
    },
    compareDNA(pAequorObj){
      let this_Dna = this._dna;
      let obj_Dna = pAequorObj._dna;
      let similarity = this_Dna.filter(e=> obj_Dna.includes(e));
      let outData = [];
      similarity.forEach((e)=> {
        if(!outData.includes(e)){
          outData.push(e);
        }
      })
      let simPcent = Math.ceil((outData.length/4)*100);
      return `specimen #1 and specimen #2 have ${simPcent}% DNA in common`
    },
     willLikelySurvive(){
      let likees = this._dna.filter((e)=> (e == 'C' || e == 'G'))//filtering this ._dna base similar to c or G
      likeesPercent = Math.ceil((likees.length/this._dna.length)*100)//the results percentage
      // console.log(likeesPercent) testing to see
      return likeesPercent >= 60 ? true : false;
    }
  }
}

let multiplePaequorFactory = () =>{
  let outData = [];
  for(let i = 0; i < 30; i++){
    outData.push(pAequorFactory(mockUpStrand));
  }
  return outData
}
console.log(pAequorFactory(mockUpStrand()).willLikelySurvive());




