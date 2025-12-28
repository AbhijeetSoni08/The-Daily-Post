import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
    return post ? (
        <div className="py-8 w-full bg-gray-50 min-h-screen">
            <Container>
                <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6 text-center">Edit Post</h2>
                    <PostForm post={post} />
                </div>
            </Container>
        </div>
    ) : null
}

export default EditPost