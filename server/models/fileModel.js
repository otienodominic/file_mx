const mongoose = require('mongoose');

const File = mongoose.model(
  'File',
  new mongoose.Schema({
    patientNumber: {
      type: Number,
      required: true,
      unique: true
    },
    patientName: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: Number,
      required: false
    }, 
    // dateOfBirth: {
    //   type: Date, 
    //   required: false
    // },
    age: {
      type: Number, 
      required: true
    },
    gender: {
      type: String,
      required: true
    }, 
    viralLoad: [{
      type: String,
      required: true
    }], 
    checkedInBy: 
      [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }]
    ,
    visitDate:[{ 
      type: Date, 
      default: Date.now 
    }],
    checkedOutBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    appointmentDate:[{ type: Date }],
    isBooked: {
      type: Boolean,
      default: false
    }
  }),
);

module.exports = File;
