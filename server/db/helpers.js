const mongoose = require("./db").mongoose
const ValidationError = require("mongoose").Error.ValidationError


const ResCode = {
    SUCCESS: 0,
    ERROR: 1,
    MISSING_ARGUMENT: 2,
    NOT_FOUND: 3,
    ITEM_ALREADY_EXISTS: 4,
    ALREADY_FULL: 5,
    NOT_FOUND_1: 6,
    BAD_INPUT: 7,
    UNAUTHORIZED: 8,
    MISSING_RESPONSE_CODE: 9,
}


exports.getResCode = (response) => {
    if(!response) return ResCode.MISSING_RESPONSE_CODE

    const isResCode = Object.values(ResCode).includes(response)
    if(isResCode) return response

    if("resCode" in response) return response.resCode

    console.error(`Unknown response: ${response}`)
    return ResCode.ERROR
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


exports.ResCode = ResCode
exports.ValidationError = ValidationError