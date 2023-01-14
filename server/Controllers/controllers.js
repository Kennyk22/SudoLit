import FlowCharts from "../Models/Flowchart"

exports.getOne = async (req, res) => {
    try {
        const flowGet = await FlowCharts.find()
        return res.status(200).send(flowGet)
    } catch (error) {
        console.log(error);
        res.status(500).send()
    }
}

exports.saveOne = async (req, res) => {
    try {
        const completeSave = await FlowCharts.findOneAndUpdate({}, req.body)\
        res.status(201).send(completeSave)
    } catch (error) {
        console.log(error);
        res.status(500).send()
    }
}
