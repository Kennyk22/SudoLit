const jwt = require('jsonwebtoken');
const FlowChart = require('../Models/Flowchart');
const SKEY = process.env.SECRET || 'not secure'

const authMiddleware = async (req, res, next) => {
    const authHead = req.headers['authorization'];
    if (!authHead) return res.status(403).send();
    const token = authHead.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, SKEY);
        const flowChart = await FlowChart.find({ _id });
        if (!flowChart) return res.status(401).send()
        req.flowchart = flowChart
        next();
    } catch (error) {
        res.status(401).send()
    }
}

module.export = authMiddleware