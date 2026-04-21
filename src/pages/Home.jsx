import { useEffect, useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import BlogCard from '../components/BlogCard';


export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock data
  const mockBlogs = [
    {
      id: 1,
      title: 'Getting Started with React Hooks',
      content: "<p>Learn the fundamentals of React Hooks and transform the way you write React components...</p>",
      author: 'Sarah Chen',
      category: 'React',
      createdAt: new Date('2024-01-15'),
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      title: 'Mastering Tailwind CSS',
      content: "<p>Discover advanced techniques for building responsive and beautiful UIs with Tailwind CSS...</p>",
      author: 'John Developer',
      category: 'CSS',
      createdAt: new Date('2024-01-14'),
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
    },
    {
      id: 3,
      title: 'JavaScript Best Practices in 2024',
      content: "<p>Explore modern JavaScript patterns and practices that will make your code cleaner and more efficient...</p>",
      author: 'Emma Watson',
      category: 'JavaScript',
      createdAt: new Date('2024-01-13'),
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
    },
    {
      id: 4,
      title: 'Web Performance Optimization Guide',
      content: "<p>Boost your website's performance with proven strategies and tools...</p>",
      author: 'Mike Johnson',
      category: 'Performance',
      createdAt: new Date('2024-01-12'),
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
    },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setBlogs(mockBlogs);
      setFilteredBlogs(mockBlogs);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = blogs;

    if (search) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== 'all') {
      filtered = filtered.filter(blog => blog.category === category);
    }

    setFilteredBlogs(filtered);
  }, [search, category, blogs]);

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center mb-12 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral mb-4">
          Welcome to <span className="text-accent">BlogHub</span>
        </h1>
        <p className="text-neutral text-opacity-80 text-lg max-w-2xl mx-auto">
          Discover insightful articles on web development, design, and technology trends.
        </p>
      </section>

      {/* Search & Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-3 text-accent opacity-60" size={20} />
          <input 
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-secondary bg-opacity-50 border border-accent border-opacity-20 rounded-lg pl-10 pr-4 py-2 text-neutral focus:outline-none focus:border-accent focus:border-opacity-60 transition"
          />
        </div>

        <div className="flex items-center gap-2">
          <FiFilter size={20} className="text-accent opacity-60" />
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-secondary bg-opacity-50 border border-accent border-opacity-20 rounded-lg px-4 py-2 text-neutral focus:outline-none focus:border-accent focus:border-opacity-60 transition"
          >
            <option value="all">All Categories</option>
            <option value="React">React</option>
            <option value="CSS">CSS</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Performance">Performance</option>
          </select>
        </div>
      </div>

      {/* Blog Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-neutral text-opacity-60 text-lg">
            No articles found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}