
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
    data: DataSchema,
    position: PositionSchema,
})

const EdgeSchema = new Schema({
   id: String,
   source: String,
   target: String,
   sourceHandle: String,
   targethandle: String 
})

const FlowChartSchema = new Schema({
    nodes: [NodeSchema],
    EdgeSchema: [EdgeSchema]
})

const schema = mongoose.model('FlowChart', FlowChartSchema)