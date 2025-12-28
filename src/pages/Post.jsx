import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);
    // Use post.authorID (Appwrite schema) and user.$id
    const isAuthor = post && user ? post.authorID === user.userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);
    const [url, setUrl] = useState('');

    useEffect(() => {
         const fetchPreview = async () => {
            if (post && post.featuredImage) {
                const previewUrl = await appwriteService.getFilePreview(post.featuredImage);
                setUrl(previewUrl);
            }
        };
        fetchPreview();
    },[post]);


    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 w-full bg-gray-50 min-h-screen">
            <Container>
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 relative">
                    <div className="w-full flex flex-col gap-4 mb-6">
                        {url && (
                            <img
                                src={url+"&mode=admin"}
                                alt={post.title}
                                className="rounded-xl w-full max-w-full h-auto max-h-112 object-cover shadow-md border border-gray-200"
                            />
                        )}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-2">
                            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-0">{post.title}</h1>
                            {isAuthor && (
                                <div className="flex gap-2">
                                    <Link to={`/edit-post/${post.$id}`}>
                                        <Button
                                            className="mr-2 px-4 py-1 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors duration-200 shadow-none"
                                        >
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button
                                        onClick={deletePost}
                                        className="px-4 py-1 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition-colors duration-200 shadow-none"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="prose max-w-none text-gray-800">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}