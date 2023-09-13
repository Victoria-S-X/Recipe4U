const mongoose = require("./db").mongoose
const ValidationError = require("mongoose").Error.ValidationError


function ResCodeObj(number){
    this.number = number
    this.toString = () => {
        return this.number.toString()
    }
    this.resCode = this
}


const ResCode = {
    SUCCESS: new ResCodeObj(0),
    ERROR: new ResCodeObj(1),
    MISSING_ARGUMENT: new ResCodeObj(2),
    NOT_FOUND: new ResCodeObj(3),
    ITEM_ALREADY_EXISTS: new ResCodeObj(4),
    ALREADY_FULL: new ResCodeObj(5),
    NOT_FOUND_1: new ResCodeObj(6),
    BAD_INPUT: new ResCodeObj(7),
    UNAUTHORIZED: new ResCodeObj(8),
    MISSING_RESPONSE_CODE: new ResCodeObj(9),
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