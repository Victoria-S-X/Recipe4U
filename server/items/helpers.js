const mongoose = require("../db").mongoose


exports.idToObj = (strID) => {
    try{
        return new mongoose.Types.ObjectId(strID)
    } catch(err){ }
}
