const mongoose = require("../db").mongoose


exports.ResCode = {
    SUCCESS: 0,
    ERROR: 1,
    MISSING_ARGUMENT: 2,
    NOT_FOUND: 3,
    ITEM_ALREADY_EXISTS: 4,
    ALREADY_FULL: 5,
    NOT_FOUND_1: 6,
    BAD_INPUT: 7,
    UNAUTHORIZED: 8
}


//all elements will be null if one ID is bad
exports.idsToObjs = (strIDs) => {
    let result = []
    for(const strID of strIDs){
        const objID = exports.idToObj(strID)

        if(!objID){
            const length = strIDs.length
            return Array.from({ length }, () => null) //inspired by ChatGPT
        }

        result.push(objID)
    }
    return result
}


exports.idToObj = (strID) => {
    try{
        return new mongoose.Types.ObjectId(strID)
    } catch(err){
        console.error(`Bad ID: ${strID}`)
    }
}