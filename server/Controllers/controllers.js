const FlowCharts =  require("../Models/Flowchart");
const cloudinary = require('../config')

exports.cloudUp = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.image, {
      folder: 'storyimg',
      width: 300,
      crop: 'scale'
    })
    res.status(201).send(result)
  } catch (error) {
    console.error(error)
    res.status(500).send()
  }
}

exports.getOne = async (req, res) => {
  try {
    const flowGet = await FlowCharts.findOne({_id: req.params._id})
    if (flowGet) return res.status(200).send(flowGet)
    return res.status(200).send(false)
  } catch (error) {
    console.error(error);
    res.status(500).send()
  }
}
exports.getAll = async (req, res) => {
  try {
    const flowGet = await FlowCharts.find({user: req.params.email})
    if (flowGet) return res.status(200).send(flowGet)
    return res.status(200).send(false)
  } catch (error) {
    console.error(error);
    res.status(500).send()
  }
}

exports.postOne = async (req, res) => {
  try {
    const completeSave = await FlowCharts.create(req.body)
    return res.status(201).send(completeSave)
  } catch (error) {
    console.error(error);
    res.status(500).send()
  }
}

exports.saveOne = async (req, res) => {
  try {
    const completeSave = await FlowCharts.findOneAndUpdate({_id: req.body._id}, {title: req.body.title, nodes:req.body.nodes, edges: req.body.edges}, {new:true})
    return res.status(201).send(completeSave)
  } catch (error) {
    console.error(error);
    res.status(500).send()
  }
}
