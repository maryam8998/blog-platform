import { Link } from 'react-router-dom';
import { FiCalendar, FiUser, FiArrowRight } from 'react-icons/fi';

export default function BlogCard({ blog }) {
  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  return (
    <article className="bg-secondary bg-opacity-50 backdrop-blur-sm border border-accent border-opacity-20 rounded-lg p-6 hover:border-accent hover:border-opacity-60 transition-all hover:shadow-xl hover:shadow-blue-500/10 group">
      {/* Image */}
      {blog.image && (
        <div className="mb-4 overflow-hidden rounded-md h-48">
          <img 
            src={blog.image} 
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Meta */}
      <div className="flex gap-4 text-sm text-neutral mb-3 text-opacity-70">
        <span className="flex items-center gap-1"><FiUser size={14} /> {blog.author}</span>
        <span className="flex items-center gap-1"><FiCalendar size={14} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-neutral mb-3 group-hover:text-accent transition">
        {blog.title}
      </h2>

      {/* Description */}
      <p className="text-neutral text-opacity-80 mb-4">
        {truncateText(blog.content.replace(/<[^>]*>/g, ''), 100)}
      </p>

      {/* Read More */}
      <Link 
        to={`/blog/${blog.id}`}
        className="inline-flex items-center gap-2 text-accent hover:text-blue-400 transition font-semibold"
      >
        Read More <FiArrowRight size={16} />
      </Link>

      {/* Category */}
      {blog.category && (
        <div className="mt-4">
          <span className="inline-block bg-accent bg-opacity-20 text-accent px-3 py-1 rounded-full text-xs">
            {blog.category}
          </span>
        </div>
      )}
    </article>
  );
}