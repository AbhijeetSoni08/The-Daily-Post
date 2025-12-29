import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'

function PostCard({$id, title, featuredImage, author, publishedDate, category}) {
    const [url, setUrl] = useState('');

    useEffect(() => {
        async function fetchUrl() {
            if (featuredImage) {
                const result = await appwriteService.getFileView(featuredImage);
                setUrl(result);
            }
        }
        fetchUrl();
    }, [featuredImage]);
  return (
    <Link to = {`/post/${$id}`}>
        <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            {url && (
                <img 
                    src={url}
                    alt={title}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
            )}
            <div className="p-6 bg-white flex flex-col grow">
                <div className="text-xs font-bold text-blue-500 uppercase tracking-wide mb-2">
                    {category}
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                    {title}
                </h3>
                <div className="flex items-center text-xs text-gray-400 mt-auto pt-4 border-t border-gray-100">
                    <span className="font-medium text-gray-600">{author}</span>
                    <span className="mx-2">•</span>
                    <span>{publishedDate}</span>
                </div>
            </div> 
        </div>
    </Link>   
  )
}

export default PostCard