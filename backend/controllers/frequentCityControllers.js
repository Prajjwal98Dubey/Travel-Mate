const cityCount = require('../models/cityAnalyticsModel')
const frequentVisitedCities = async(req,res)=>{
    const data  = await cityCount.find()
    data.sort((a,b)=>a.occurence-b.occurence).reverse()
    let ans = []
    for(let i=0;i<3;i++)
    {
        ans.push(data[i])
    }
    res.json({freqCities:ans})
}

module.exports={frequentVisitedCities}