
const { query } = require("express");
const projects = require("./Models/projectModel");

//add project

exports.addProject = async(req,res)=>{
    console.log("inside add project request");
    console.log(req.payload);
    console.log(req.body);
    console.log(req.file);
    const {title,language,overview,github,website} = req.body
    const userId = req.payload
    const projectimage = req.file.filename
    try {
        const existingProject = await projects.findOne({github})
        if (existingProject) {
            res.status(406).json("project already available in our system,kindly upload another !!")
        } else {
            const newProject = new projects({
                title,language,overview,github,website,projectimage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    } catch (err) {
            res.status(401).json(err)
    }
}

//get all project
exports.getAllProjects = async(req,res)=>{
    const serachkey =req.query.search
        const query = {
            language:{   
            $regex:serachkey,$options:'i'
    }
} 
    try {
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    } catch (err) {
       res.status(401).json(err)
    }
}

//get userprojects
exports.getUserProjects = async(req,res)=>{
    const userId = req.payload
    try {
        const userprojects = await projects.find({userId})
        res.status(200).json(userprojects)
    } catch (err) {
       res.status(401).json(err)
    }
}
//get home projects

exports.getHomeProjects = async(req,res)=>{
    try {
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    } catch (err) {
       res.status(401).json(err)
    }
}

exports.editProject = async(req,res)=>{
    console.log("Inside Edit Project");
    const {pid} = req.params
    const userId = req.payload
    const {title,language,overview,github,website,projectimage} = req.body
    const uploadImage = req.file?req.file.filename:projectimage
    try {
        const updatedProject = await projects.findByIdAndUpdate({_id:pid},{
            title,language,overview,github,website,projectimage:uploadImage,userId
        },{new:true})
        await updatedProject.save()
        res.status(200).json(updatedProject)
    } catch (err) {
        res.status(401).json(err)
    }
}

//remove

exports.removeProject = async(req,res)=>{
    console.log("Inside Remove Project");
    const {pid} = req.params
    try {
        const projectDetails = await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(projectDetails)
    } catch (err) {
        res.status(401).json(err)
    }
}