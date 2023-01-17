
const mongoose = require('./')

const Schema = mongoose.Schema;

const PositionSchema = new Schema({
   x: Number,
   y: Number 
})

const DataSchema = new Schema({
    label: String,
    isEdit: Boolean,
    newImg: Boolean,
    img: String
})

const NodeSchema = new Schema({
    id: String, 
    type: String,
    data: {
        type: DataSchema,
        default: {}
    },
    position: {
        type: PositionSchema,
        default: {}
    },
})

const EdgeSchema = new Schema({
   id: String,
   source: String,
   target: String,
   sourceHandle: String,
   targetHandle: String,
   type: String
})


const FlowChartSchema = new Schema({
    title: String,
    user: String,
    nodes: [NodeSchema],
    edges: [EdgeSchema]
})

const FlowCharts = mongoose.model('FlowChart', FlowChartSchema)

module.exports = FlowCharts