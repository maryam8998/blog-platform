import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiImage } from 'react-icons/fi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';

export default function CreateBlog() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'React',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      toast.error('Please fill in title and content');
      return;
    }

    if (formData.title.length < 5) {
      toast.error('Title must be at least 5 characters');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      toast.success('Blog post published!');
      navigate('/');
    }, 1000);
  };

  return (
    <div>
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-accent hover:text-blue-400 transition mb-6"
      >
        <FiArrowLeft /> Back to Home
      </button>

      <div className="bg-secondary bg-opacity-50 backdrop-blur-sm border border-accent border-opacity-20 rounded-lg p-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-neutral mb-8">Create New Blog Post</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-neutral font-semibold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              className="w-full bg-primary bg-opacity-50 border border-accent border-opacity-20 rounded-lg px-4 py-3 text-neutral focus:outline-none focus:border-accent focus:border-opacity-60 transition"
            />
          </div>

          {/* Category */}
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
              <option value="Performance">Performance</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-neutral font-semibold mb-2">Featured Image</label>
            <label className="flex items-center justify-center gap-2 bg-primary bg-opacity-50 border border-accent border-opacity-20 border-dashed rounded-lg px-4 py-8 cursor-pointer hover:border-accent hover:border-opacity-60 transition">
              <FiImage size={20} className="text-accent" />
              <span className="text-neutral">Click to upload image</span>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
            {formData.image && (
              <img src={formData.image} alt="Preview" className="mt-4 max-h-48 rounded-lg object-cover" />
            )}
          </div>

          {/* Content - FIXED */}
          <div>
            <label className="block text-neutral font-semibold mb-2">Content</label>
            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
              placeholder="Write your blog content..."
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

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:bg-blue-600 disabled:opacity-50 text-primary font-bold py-3 rounded-lg transition"
          >
            {loading ? 'Publishing...' : 'Publish Post'}
          </button>
        </form>
      </div>
    </div>
  );
}