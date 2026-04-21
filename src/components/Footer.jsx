import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-secondary bg-opacity-95 border-t border-accent border-opacity-20 text-center py-8 mt-12">
      <div className="container mx-auto px-4">
        <p className="text-neutral mb-4">© 2026 BlogHub. All rights reserved.</p>
        
        <div className="flex justify-center gap-6 text-accent hover:text-blue-400">
          <a href="" className="hover:scale-110 transition"><FiGithub size={20} /></a>
          <a href="" className="hover:scale-110 transition"><FiTwitter size={20} /></a>
          <a href="" className="hover:scale-110 transition"><FiLinkedin size={20} /></a>
          <a href="" className="hover:scale-110 transition"><FiMail size={20} /></a>
        </div>
      </div>
    </footer>
  );
}