const {JWT_SECRET} = require("../config");
const db = require("../models");
const File = db.file;


exports.SearchFile = async(req, res) => {
   // let filePattern = new RegExp('^'+ req.body.query)
    const foundFile = await File.find({fileNumber:{$regex : ".*"+ req.query.search +".*", $options:'1' }})
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
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.UpdateFile = async(req, res) => {
    try {
        const {
            patientNumber,  patientName,  
            phoneNumber,  dateOfBirth,  
            gender, 
            visitDate, 
            appointmentDate, 
            viralLoad,
            isBooked
        } = req.body
        const {checkedOutBy} = req.user.id

        // create a file object for update

        const fileFields = {
                    patientNumber,  
                    patientName,  
                    phoneNumber,  
                    dateOfBirth,  
                    gender, 
                    visitDate, 
                    appointmentDate, 
                    viralLoad, 
                    checkedOutBy,
                    isBooked
                }
        // Check for the file in the database
        let file = await File.findById(req.params.id)
        if(!file){
            return res.status(404).json({ msg: "File not found!"})
        }
        file = await File.findByIdAndUpdate(req.params.id,{$push:{fileFields}},{ new:true})
        res.send(file)       
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
}

exports.addViralLoad = async(req,res)=>{
    File.findByIdAndUpdate(req.body.id,{
        $push:{viralLoad:req.body.viralLoad}
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
exports.addVisitDate = async(req,res)=>{
    File.findByIdAndUpdate(req.body.id,{
        $push:{visitDate:req.body.visitDate}
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

exports.addAppointmentDate = async(req,res)=>{
    File.findByIdAndUpdate(req.body.id,{
        $push:{appointmentDate:req.body.appointmentDate, checkedOutBy:req.user}
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

exports.checkOutFile = async(req,res)=>{
    File.findByIdAndUpdate(req.body.id,{
        $push:{checkedOutBy:req.user.id}
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
        let file =await File.findById(req.body.id)
        if(!file){
            res.status(404).json({msg: "File not found"})
        }
        await File.findByIdAndRemove(req.body.id)        
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
  