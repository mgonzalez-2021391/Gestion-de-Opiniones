'use strict'

import { checkUpdatePublication } from "../utils/validate.js"
import Publication from "./publication.model.js"
import Comment from "../comment/comment.model.js"

export const save = async(req, res) => {
    try {
        let data = req.body
        let publication = new Publication(data)
        await publication.save()
        return res.send({message: 'Has made a publication'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'ERROR: '})
    }
}

export const update = async(req, res) => {
    try{
        let userId = req.user._id
        let { id } = req.params
        let data = req.body
        let update = checkUpdatePublication(data, id)
        if(!update) return res.status(400).send({message: 'ERROR: Data not updateable'})
        let updatedPublication = await Publication.findOneAndUpdate({_id: id, user: userId}, data, {new: true})
        if(!updatedPublication) return res.status(404).send({message: 'ERROR: Publication not updated because this not found'})
        return res.send({message: 'Publication has been updated'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'ERROR: Publication has not been updated'})
    }
}

export const deleteP = async (req, res) => {
    try {
        let userId = req.user._id
        let publicationId = req.params.id
        let deletedPublication = await Publication.findOneAndDelete({_id: publicationId, user: userId})
        if(!deletedPublication) return res.status(403).send({message: 'ERROR: You dont have access or the comment has not been found'})
        await Comment.deleteMany({publication: publicationId})
        return res.send({message: 'Publication has been eliminated successfully'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'ERROR: Comment has not been deleted'})
    }
};

export const getPublications = async(req, res) => {
    try {
        let publications = await Publication.find().populate('comments', ['title', 'text']).populate('user', 'username').populate('category', 'name')
        return res.send({publications})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'ERROR: All publications not found'})
    }
}

export const getPublicationsWithID = async(req, res) => {
    try {
        let { id } = req.params
        let publications = await Publication.find({user: id}).populate('comments', ['title', 'text']).populate('user', 'username').populate('category', 'name')
        return res.send({publications})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'ERROR: All publications with your id not found'})
    }
}