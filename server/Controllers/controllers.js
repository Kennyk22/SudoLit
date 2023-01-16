const FlowCharts =  require("../Models/Flowchart");
const jwt = require('jsonwebtoken');
const SKEY = process.env.SECRET || 'not secure'

exports.getOne = async (req, res) => {
    try {
        console.log(req.params)
        const flowGet = await FlowCharts.findOne({user: req.params.email})
        console.log(flowGet)
        return res.status(200).send(flowGet)
    } catch (error) {
        console.log(error);
        res.status(500).send()
    }
}

exports.postOne = async (req, res) => {
    try {
        const completeSave = await FlowCharts.create(req.body)
        return res.status(201).send(completeSave)
    } catch (error) {
        console.log(error);
        res.status(500).send()
    }
}

exports.saveOne = async (req, res) => {
    try {
        const completeSave = await FlowCharts.findOneAndUpdate({user: req.body.user}, {nodes:req.body.nodes, edges: req.body.edges}, {new:true})
        return res.status(201).send(completeSave)
    } catch (error) {
        console.log(error);
        res.status(500).send()
    }
}
