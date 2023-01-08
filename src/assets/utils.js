import { testDataDisDS } from "../test-data";

export function AceJsonToAceArr(AceData) {
    let AceArr = AceData.split('\n');
    return AceArr;
}

export function DisJsonToDisArr(DisJson) {
    let DisArr = []
    DisJson.map((eachData, i) => {
        DisArr[i] = eachData.deliv_num;
    });

    return DisArr;
}

export function checkOrder(aceJson , disdsJson ){

    let ace = AceJsonToAceArr(aceJson)
    let disds = DisJsonToDisArr(disdsJson);

    console.log("DisDS  " , disds);
    console.log("Ace  " , ace);
    let missing = disds.filter(d => !ace.includes(d))
    console.log("Missing " , missing);
    
    if (missing.length == 0 ) return 'No missing Orders'

    console.log("0 < length");
    return missing.join('   ,    ');
}