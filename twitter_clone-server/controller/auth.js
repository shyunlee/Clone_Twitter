import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import * as authRepo from '../data/auth.js'

dotenv.config()

const accessKey = process.env.ACCESS_SECRET
const refreshKey = process.env.REFRESH_SECRET
const bcryptSaltRounds = 12
const jwtExpDay = '2d'

export const signup = async (req, res) => {
    const {username, password} = req.body
    const isRegistered = await authRepo.findByUsername(username)
    if (isRegistered) {
        return res.status(400).json({message:'user already registered'})
    }
    let hashed = await bcrypt.hash(password, bcryptSaltRounds)
    const newUserInfo = {
        ...req.body,
        password: hashed,
    }
    const userId = await authRepo.createUser(newUserInfo)
    console.log(userId)
    const token = createJwtToken(userId)
    res.status(201).json({data: {token, username}, message:'Signup Completed'})
}

export const login = async (req, res) => {
    const {username, password} = req.body
    const userFound = await authRepo.findByUsername(username)
    if (userFound) {
        const isMatched = await bcrypt.compare(password, userFound.password)
        if (isMatched) {
            const token = createJwtToken(userFound.id)
            return res.status(200).json({data:{token, username}, message:'login succeded'})
        }
    }
    res.status(401).json({message:'login info is invaild'})
}

export const me = async (req, res) => {
    const userFound = await authRepo.findById(req.userId)
    if (!userFound) {
        return res.status(404).json({message: 'User not found'})
    }
    res.status(200).json({username:userFound.username})
}

function createJwtToken (id) {
    return jwt.sign({id}, accessKey, {expiresIn: jwtExpDay})
}