const {JWT_SECRET} = require("../config");
const db = require("../models");
const File = db.file;


exports.SearchFile = async(req, res) => {   
    const foundFile = await File.find()
    try {
        res.json(foundFile)
    } catch (error) {
        console.log(error)
    }
}

exports.SaveFile = async(req, res) => {    
    try {
        const {patientNumber,  patientName,  phoneNumber,  dateOfBirth,  gender} = req.body
        const checkedInBy = req.user.id
        //validate

        if(!patientNumber || !patientName ){
            return res.status(400).json({ msg: "Not all fields have been entered." });
        }
        const existing_file = await File.findOne({patientNumber: patientNumber})
        if(existing_file){
            return res.status(400).json({ msg: "File Already exists"})            
        }
        const newFile = new File({
            patientNumber,  
            patientName,  
            phoneNumber,  
            dateOfBirth,  
            gender,
            checkedInBy  
        });
        const savedFile = await newFile.save();
        res.json(savedFile);
        return res.status(200).json({msg: "File added Successfully!"})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.UpdateFile = async(req,res)=>{
    File.findByIdAndUpdate(req.params.id,{
        $set:{checkedOutBy:req.user.id, 
            viralLoad: req.body.viralLoad, 
            visitDate: req.body.visitDate, 
            appointmentDate: req.body.appointmentDate, 
            isBooked: req.body.isBooked}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
}

exports.DeleteFile= async(req, res) => {
    try {
        let file =await File.findOne({_id:req.params.id})
        if(!file){
            res.status(404).json({msg: "File not found"})
        }
        await File.findByIdAndRemove(req.params.id)        
        res.status(200).json({msg: "File deleted Successfully"})

      } catch (err) {
        res.status(500).json({ msg: 'Server Error'});
        console.log(err)
      }
  }

  exports.FindFiles= async(req, res) => {
      try {
          const foundFile = await File.find()
            .populate('checkedInBy', 'name')
            .populate('checkedOutBy', 'name')
          res.json(foundFile)
      } catch (error) {
        res.status(500).json({ msg: 'Server Error'});
          console.log(error)
      }
  }
exports.CountFiles= async(req, res) => {
    try {
        const totalFiles = await File.countDocuments()
        res.json(totalFiles)
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Could not find Files'});
    }
}
  