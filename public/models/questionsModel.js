import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const questionSchema = new Schema({
  
    name : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    questions : {
        type: Array,
        required: true
    },
    options : {
        type: Object,
        required: true
    }

})