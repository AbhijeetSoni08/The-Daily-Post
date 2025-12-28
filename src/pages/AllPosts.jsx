import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import { useSelector } from 'react-redux';

function AllPosts() {
    const [posts, setPosts] = useState([])
    const postsFromStore = useSelector((state) => state.posts.posts);
    useEffect(() => {
        setPosts(postsFromStore);
    }, [postsFromStore])

    return (
        <div className="py-8 w-full bg-gray-50 min-h-screen">
            <Container>
                <h2 className="text-2xl font-serif font-bold text-gray-800 mb-8 text-center">All Posts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
                {posts.length === 0 && (
                    <div className="text-center text-gray-400 py-16 text-lg">No posts found.</div>
                )}
            </Container>
        </div>
    )
}

export default AllPosts