const postsControllers = require ('./posts.controllers')

const getAllPosts = (req, res) => {
    postsControllers.findAllPost()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

const getPostsById = (req, res) => {
    const id = Number (req.params.id)
    postsControllers.findPostById(id)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json ({message: 'ID Not Found'})
            }
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

const postNewPost = (req,res) => {
    const postObject = req.body
    postsControllers.createPost(postObject)

        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

const patchPost = (req, res) => {
    const id = req.params.id
    const postObj = req.body 
    postsControllers.updatePost(id, postObj)
    .then(data => {
        if (data[0]){
        res.status(200).json({message: `Post with id ${id} updated successfully`})
        } else  {
        res.status(404).json({message: 'Post not found'})
        }
    })
    .catch(err => {
        res.status(400).json(err)
    })
}

const deletePost = (req, res) => {
    const id = req.params.id 
    postsControllers.deletePost(id)
        .then(data => {
        if (data){
            res.status(204).json()
        } else {
            res.status(404).json({message: 'Post not found'})
        }
        })
        .catch(err => {
        res.status(400).json(err) 
        })
    }


module.exports = {
    getAllPosts,
    getPostsById,
    postNewPost,
    patchPost,
    deletePost
}