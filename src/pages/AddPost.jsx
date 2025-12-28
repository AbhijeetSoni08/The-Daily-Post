import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className="py-8 w-full bg-gray-50 min-h-screen">
      <Container>
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6 text-center">Add New Post</h2>
          <PostForm />
        </div>
      </Container>
    </div>
  )
}

export default AddPost