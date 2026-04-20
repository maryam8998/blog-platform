import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiEdit2, FiTrash2, FiCalendar, FiUser, FiMessageCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function BlogDetail() {
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    setTimeout(() => {
      setBlog({
        id,
        title: 'Getting Started with React Hooks',
        author: 'Sarah Chen',
        createdAt: new Date('2024-01-15'),
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
        content: '<h2>Introduction</h2><p>React Hooks have revolutionized how we write React components...</p><h2>Benefits</h2><p>They allow you to use state and other React features without writing class components...</p>',
        category: 'React',
      });

      setComments([
        {
          id: 1,
          author: 'John Doe',
          text: 'Great article! Very helpful.',
          createdAt: new Date('2024-01-15'),
        },
      ]);

      setLoading(false);
    }, 500);
  }, [id]);

  const handleAddComment = () => {
    if (!commentText.trim()) {
      toast.error('Please write a comment');
      return;
    }

    if (!user) {
      toast.error('Please login to comment');
      navigate('/login');
      return;
    }

    const newComment = {
      id: comments.length + 1,
      author: user.name,
      text: commentText,
      createdAt: new Date(),
    };

    setComments([...comments, newComment]);
    setCommentText('');
    toast.success('Comment added!');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      toast.success('Post deleted!');
      navigate('/');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-accent"></div></div>;
  }

  if (!blog) {
    return <div className="text-center py-12"><p className="text-neutral">Blog post not found</p></div>;
  }

  return (
    <div>
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-accent hover:text-blue-400 transition mb-6"
      >
        <FiArrowLeft /> Back to Home
      </button>

      <article className="max-w-4xl bg-secondary bg-opacity-50 backdrop-blur-sm border border-accent border-opacity-20 rounded-lg p-8">
        {/* Header */}
        <div className="mb-8">
          {blog.image && (
            <img src={blog.image} alt={blog.title} className="w-full h-96 object-cover rounded-lg mb-6" />
          )}

          <div className="flex gap-2 mb-4">
            <span className="inline-block bg-accent bg-opacity-20 text-accent px-3 py-1 rounded-full text-sm">
              {blog.category}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-neutral mb-4">{blog.title}</h1>

          <div className="flex flex-col md:flex-row gap-4 text-neutral text-opacity-70 mb-6">
            <span className="flex items-center gap-2"><FiUser size={16} /> {blog.author}</span>
            <span className="flex items-center gap-2"><FiCalendar size={16} /> {blog.createdAt.toLocaleDateString()}</span>
          </div>

          {user && user.email === 'admin@example.com' && (
            <div className="flex gap-3">
              <Link 
                to={`/edit/${id}`}
                className="flex items-center gap-2 bg-accent bg-opacity-20 text-accent px-4 py-2 rounded-lg hover:bg-opacity-40 transition"
              >
                <FiEdit2 size={18} /> Edit
              </Link>
              <button 
                onClick={handleDelete}
                className="flex items-center gap-2 bg-danger bg-opacity-20 text-danger px-4 py-2 rounded-lg hover:bg-opacity-40 transition"
              >
                <FiTrash2 size={18} /> Delete
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div 
          className="text-neutral prose prose-invert max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Comments Section */}
        <div className="border-t border-accent border-opacity-20 pt-8 mt-8">
          <h2 className="text-2xl font-bold text-neutral mb-6 flex items-center gap-2">
            <FiMessageCircle /> Comments ({comments.length})
          </h2>

          {user ? (
            <div className="mb-6">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts..."
                rows="4"
                className="w-full bg-primary bg-opacity-50 border border-accent border-opacity-20 rounded-lg px-4 py-3 text-neutral focus:outline-none focus:border-accent focus:border-opacity-60 transition resize-none"
              />
              <button 
                onClick={handleAddComment}
                className="mt-3 bg-accent hover:bg-blue-600 text-primary font-bold px-6 py-2 rounded-lg transition"
              >
                Post Comment
              </button>
            </div>
          ) : (
            <div className="bg-primary bg-opacity-50 border border-accent border-opacity-20 rounded-lg p-4 mb-6 text-center">
              <Link to="/login" className="text-accent hover:text-blue-400 font-semibold">
                Sign in
              </Link>
              {' '}to leave a comment
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-neutral text-opacity-60">No comments yet. Be the first to comment!</p>
            ) : (
              comments.map(comment => (
                <div key={comment.id} className="bg-primary bg-opacity-50 border border-accent border-opacity-20 rounded-lg p-4">
                  <p className="font-semibold text-neutral">{comment.author}</p>
                  <p className="text-neutral text-opacity-70 text-sm mb-2">{comment.createdAt.toLocaleDateString()}</p>
                  <p className="text-neutral">{comment.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </article>
    </div>
  );
}