import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';

export default function EditBlog() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'React',
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setFormData({
        title: 'Sample Blog Post',
        content: '<p>Your blog content here...</p>',
        category: 'React',
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast.success('Blog post updated!');
      navigate(`/blog/${id}`);
    }, 1000);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-accent"></div></div>;
  }

  return (
    <div>
      <button 
        onClick={() => navigate(`/blog/${id}`)}
        className="flex items-center gap-2 text-accent hover:text-blue-400 transition mb-6"
      >
        <FiArrowLeft /> Back to Post
      </button>

      <div className="bg-secondary bg-opacity-50 backdrop-blur-sm border border-accent border-opacity-20 rounded-lg p-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-neutral mb-8">Edit Blog Post</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-neutral font-semibold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-primary bg-opacity-50 border border-accent border-opacity-20 rounded-lg px-4 py-3 text-neutral focus:outline-none focus:border-accent focus:border-opacity-60 transition"
            />
          </div>

          <div>
            <label className="block text-neutral font-semibold mb-2">Category</label>
            <select 
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-primary bg-opacity-50 border border-accent border-opacity-20 rounded-lg px-4 py-3 text-neutral focus:outline-none focus:border-accent focus:border-opacity-60 transition"
            >
              <option value="React">React</option>
              <option value="CSS">CSS</option>
              <option value="JavaScript">JavaScript</option>
            </select>
          </div>

          <div>
            <label className="block text-neutral font-semibold mb-2">Content</label>
            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
              modules={{
                toolbar: [
                  ['bold', 'italic', 'underline', 'strike'],
                  ['blockquote', 'code-block'],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  ['link'],
                  ['clean']
                ]
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent hover:bg-blue-600 text-primary font-bold py-3 rounded-lg transition"
          >
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
}