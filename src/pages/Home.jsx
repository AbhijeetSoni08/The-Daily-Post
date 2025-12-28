
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import appwriteService from '../appwrite/config';
import { useSelector } from 'react-redux';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const postsFromStore = useSelector((state) => state.posts.posts);

  useEffect(() => {
    setPosts(postsFromStore);
    setLoading(false);
  }, []);  

  // Featured post: first post (or null)
  const featuredPost = posts.length > 0 ? posts[0] : null;
  // Recent posts: next 3 posts (or empty)
  const recentPosts = posts.length > 1 ? posts.slice(1, 4) : [];

  const [url, setUrl] = useState('');
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  // Handler for subscribe
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!subscriberEmail) {
      alert("Please enter a valid email address.");
      return;
    }
    setSubscribing(true);
    try {
      // Create subscriber entry
      await appwriteService.createSubscriber({ email: subscriberEmail });
      alert("Subscribed successfully! Please check your email.");
      setSubscriberEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      alert("Failed to subscribe. Please try again later.");
    } finally {
      setSubscribing(false);
    }
  };

  useEffect(() => {
    async function fetchUrl() {
      if(featuredPost && featuredPost.featuredImage) {
        const previewUrl = await appwriteService.getFilePreview(featuredPost.featuredImage);
        setUrl(previewUrl);
      }
    }
    fetchUrl();
  }, [featuredPost]);



  return (
    <div className="py-12 w-full min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* ================= HERO SECTION ================= */}
        <div className="mb-20">
          <div className="relative w-full h-[420px] md:h-[540px] rounded-3xl overflow-hidden shadow-2xl group hover:shadow-3xl transition-shadow duration-500">
            {featuredPost && (

              <>

                <img
                  src={url+"&mode=admin"}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
                {/* Text Content */}
                <div className="absolute bottom-0 left-0 p-8 md:p-14 w-full md:w-3/4 text-white">
                  <span className="bg-linear-to-r from-blue-500 to-purple-500 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-4 inline-block shadow-lg">
                    {featuredPost.category || ''}
                  </span>
                  <h1 className="text-4xl md:text-6xl font-serif font-extrabold mb-6 leading-tight drop-shadow-xl">
                    {featuredPost.title}
                  </h1>
                  <p className="text-gray-200 text-xl mb-8 line-clamp-2 font-light">
                    {featuredPost.excerpt || ''}
                  </p>
                  <Link
                    to={`/post/${featuredPost.$id}`}
                    className="inline-block bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
                  >
                    Read Article
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ================= RECENT POSTS GRID ================= */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <h2 className="text-3xl font-serif font-bold text-gray-800">Latest Stories</h2>
            <Link to="/all-posts" className="text-blue-600 hover:text-purple-600 font-semibold text-base transition-colors">View all &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {loading ? (
              <div className="col-span-full text-center text-gray-400 py-16 text-lg">Loading...</div>
            ) : recentPosts.length > 0 ? (
              recentPosts.map(post => (
                <PostCard
                  key={post.$id}
                  $id={post.$id}
                  title={post.title}
                  featuredImage={post.featuredImage}
                  author={post.author}
                  publishedDate={post.publishedDate}
                  category={post.category}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 py-16 text-lg">No recent posts found.</div>
            )}
          </div>
        </div>

        {/* ================= NEWSLETTER ================= */}
        <div id="contact" className="bg-linear-to-r from-blue-700 to-purple-700 text-white rounded-3xl p-12 md:p-16 text-center shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Subscribe to The Daily Post
          </h2>
          <p className="text-gray-200 mb-10 max-w-xl mx-auto text-lg">
            Get the latest articles, insights, and news delivered straight to your inbox once a week. No spam, we promise.
          </p>
          <form className="flex flex-col md:flex-row justify-center gap-4 max-w-lg mx-auto" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-6 py-4 rounded-xl text-gray-900 bg-white/90 border-2 border-white focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-lg placeholder-gray-500 transition-all duration-200"
              style={{ backdropFilter: 'blur(2px)' }}
              value={subscriberEmail}
              onChange={e => setSubscriberEmail(e.target.value)}
              disabled={subscribing}
            />
            <button
              type="submit"
              className="bg-white text-blue-700 font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-blue-100 hover:text-purple-700 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={subscribing}
            >
              {subscribing ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>

        {/* ================= SECTION DIVIDER ================= */}
        <div className="my-20 border-t border-dashed border-gray-300"></div>

      </div>
    </div>
  );
}

export default Home;