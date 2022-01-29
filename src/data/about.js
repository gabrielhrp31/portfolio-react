
const calculateCurrentDiff= (dateStr, roundTo = 0)=>{
    let date1 = new Date(dateStr);
    let date2 = new Date();
    let Difference_In_Time = date2.getTime() - date1.getTime();
    return ((Difference_In_Time / (1000 * 3600 * 24)) / 30 / 12).toFixed(roundTo);

}

const about =  {
    name: "Gabriel Henrique Rodrigues Pinto",
    xp:calculateCurrentDiff("06/30/2018",1),
    english:"Inglês Intermediário",
    city:"Arcos",
    state:"MG",
    age:calculateCurrentDiff("01/31/2000"),
}

export default about