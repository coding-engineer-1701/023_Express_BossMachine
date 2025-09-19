
const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body;

    // check nulls
    if (numWeeks == null || weeklyRevenue == null) {
        return res.status(400).send()
    }
    
    // coerce
    const weeks = Number(numWeeks);
    const revenue = Number(weeklyRevenue);
    const total = weeks * revenue;
    const bad    = !Number.isFinite(weeks) || !Number.isFinite(revenue);
    
    // check - infinite vals
    if (bad) {
        return res.status(400).send()
    }
    
    // check threshold and pass through on success
    if (total < 1000000) {
        return res.status(400).send()
    } else {
        next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
