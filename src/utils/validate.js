'use strict'

import { hash, compare } from "bcrypt"

export const encrypt = async (password) => {
    try {
        return hash(password, 10)
    } catch (err) {
        console.error(err)
        return err
    }
}

export const checkPassword = async (password, hash) => {
    try {
        return await compare(password, hash)
    } catch (err) {
        console.error(err)
        return err
    }
}

export const checkUpdate = async (data, userId) => {
    if(userId){
        if(Object.entries(data).length === 0 ||
            data.role ||
            data.role == ''
            ) {
                return false
            }
                return true
        } else {
                return false
        }
}

 export const checkUpdatePublication = async (data, publicationId) => {
    if(publicationId){
        if(Object.entries(data).length === 0 ||
            data.comments ||
            data.comments == ''
        ) {
            return false
        }
            return true
    } else {
        return false
    }
}

export const checkUpdateComment = async (data, commentId) => {
    if(commentId){
        if(Object.entries(data).length === 0 ||
        data.publication ||
        data.publication == ''
        ) {
            return false
        }
            return true
    } else {
            return false
    }
}