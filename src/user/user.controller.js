'use strict'

import User from '../user/user.model.js'
import { checkPassword, encrypt, checkUpdate } from '../utils/validate.js'
import { generateJwt } from '../utils/jwt.js'

export const save = async (req, res) => {
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        let user = new User(data)
        await user.save()
        return res.send({message: 'Your account has been created successfully'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error to registering your account'})
    }
}

export const login = async (req, res) => {
    try {
        let { username, email, password} = req.body
        let user = await User.findOne({ $or: [{username}, {email}]})
        if(user && await checkPassword(password, user.password)){
            let loggedUser = {
                uid: user._id,
                name: user.name,
                surname: user.surname,
                username: user.username,
                role: user.role
            }
            let authorization = await generateJwt(loggedUser)
            return res.send({message: `Welcome to the system: ${user.username}`, loggedUser, authorization})
        }
        return res.status(404).send({message: 'ERROR: Invalid credentials'})
    } catch (err) {
        console.error(err)  
        return res.status(500).send({message: 'Oh! An unexpected event has occurred'})
    }
}

export const update = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        data.password = await encrypt(data.password)
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({ message: 'ERROR: Data from user that cannot be update || PASSWORD & ROLE'})
        let updatedUser = await User.findOneAndUpdate({_id: id}, data, {new: true})
        if(!updatedUser) return res.status(401).send({message: 'ERROR: Data from user has not been updated because not found'})
        return res.send({message: 'User updated successfully', updatedUser})
    } catch (err) {
        console.error(err)
        if(err.keyValue.username) return res.status(400).send({message: `ALERT: Username ${err.keyValue.username} is already taken`})
        return res.status(500).send({message: 'ERROR: User has not been updated'})
    }
}

export const updatePassword = async (req, res) => {
    try{
        let { id } = req.params
        let data = req.body
        let uid = req.user
        let user = await User.findOne({_id: uid})
        if(!user) return res.status(404).send({message:'ERROR: User not found'})
        if(await checkPassword(data.oldPassword, user.password)){
        data.newPassword = await encrypt(data.newPassword)
        await User.findOneAndUpdate({_id: id}, {password: data.newPassword}, {new:true})
        return res.send({message:'Password has been updated successfully'})
        } else { 
            return res.status(500).send({message: 'ERROR: User has not been updated'})
        }
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'ERROR: User has not been updated'})
    }
}