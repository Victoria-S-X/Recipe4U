const mongoose = require("../db").mongoose

exports.ResCode = {
    SUCCESS: 0,
    ERROR: 1,
    MISSING_ARGUMENT: 2,
    NOT_FOUND: 3,
    ITEM_ALREADY_EXISTS: 4,
    ALREADY_FULL: 5
}

exports.idToObj = (strID) => {
    try{
        return new mongoose.Types.ObjectId(strID)
    } catch(err){ }
}
