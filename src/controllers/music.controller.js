const Music = require('../models/music.model')
const jwt = require('jsonwebtoken')
const { uploadFile } = require('../services/storage.service')
const albumModel = require('../models/album.model')

async function createMusic(req, res) {

        const {title} = req.body
        const file = req.file

        if(!file){
            return res.status(400).json({
                message:"music file required"
            })
        }

        const result = await uploadFile(file.buffer.toString('base64'))

        const music = await Music.create({
            uri: result.url,
            title,
            artist: req.user.id
        })

        res.status(201).json({
            message:"music created successfully",
            music:{
                id: music._id,
                title: music.title,
                uri: music.uri,
                artist: music.artist
            }
        })
}

async function createAlbum(req, res) {
    
        const {title, music} = req.body

        const album = await albumModel.create({
            title,
            artist: req.user.id,
            music
        })

        res.status(201).json({
            message:"album created successfully",
            album:{
                id: album._id,
                title: album.title,
                artist: album.artist,
                music: album.music
            }
        })
}

async function getAllMusic(req, res) {
    const music = await Music.find().populate('artist')
    res.status(200).json({
        message: "music fetched successfully",
        music
    })
}

async function getAllalbum(req,res) {
    const album = await albumModel.find().select('title artist').populate('artist')
    res.status(200).json({
        message: "album fetched successfully",
        album
    })
}

async function getAlbumByID(req, res) {
    const albumId = req.params.albumId

    const album = await albumModel.findById(albumId).populate('artist', '-password').populate('music')

    return res.status(200).json({
        message: "album fetched successfully",
        album: album
    })
}


module.exports = { createMusic, createAlbum, getAllMusic, getAllalbum, getAlbumByID }