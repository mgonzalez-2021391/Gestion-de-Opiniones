'use strict'

import Comment from './comment.model.js'
import Publication from '../publication/publication.model.js'
import User from '../user/user.model.js'
import { checkUpdateComment } from '../utils/validate.js'

export const save = async (req, res) => {
    try {
        let data = req.body
        let { publication } = req.body
        let publications = await Publication.findOne({_id: publication})
        if(!publications) return res.status(404).send({message: 'ERROR: Publication not found'})
        let comment = new Comment(data)
        await comment.save()
        publications.comments.push(comment._id)
        await publications.save()
        return res.send({message: 'You have commented on this publication'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'ERROR: Oh! an unexpected event has occurred.'})
    }
}

export const update = async(req, res) => {
    try {
        let userId = req.user._id
        let data = req.body
        let { id } = req.params
        let update = checkUpdateComment(data, id)
        if(!update) return res.status(400).send({message: 'ERROR: Data not updateable'})
        let updatedComment = await Comment.findOneAndUpdate({_id: id, user: userId}, data, {new: true})
        if(!updatedComment) return res.status(404).send({message: 'ERROR: You dont have access or the comment has not been found'})
        return res.send({message: 'Comment has been updated'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'ERROR: Comment has not been updated'})
    }
}

export const deleteC = async(req, res) => {
    try {
        let userId = req.user._id
        let commentId = req.params.id
        let comment = await Comment.findOneAndDelete({ _id: req.params.id, user: userId })
        if (!comment) {
            return res.status(404).send({message: 'ERROR: You dont have access or the comment has not been found'})
        }
        await Publication.findOneAndUpdate({ comments: commentId }, { $pull: { comments: commentId } }, { new: true })
        return res.send({message: 'Comment has been eliminated successfully'})
    } catch (error) {
        console.error(error);
        return res.status(500).send({message: 'ERROR: Comment has not been deleted'})
    }
}  

export const getComments = async(req, res) => {
    try {
        let comments = await Comment.find()//.populate('publication', ['user', 'title', 'text'])
        return res.send({comments})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'ERROR: All comments not found'})
    }
}

export const getCommentWhitID = async(req, res) => {
    try {
        let { id } = req.params
        let comments = await Comment.find({user: id})//.populate('publication', ['user', 'title', 'text'])
        return res.send({comments})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'ERROR: All comments with your id not found'})
    }
}