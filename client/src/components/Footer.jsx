
const Footer=({setActiveSection})=>{
  return (<footer className="bg-gray-900 text-white py-12">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="text-2xl font-bold text-blue-400 mb-4">Products</div>
          <p className="text-gray-400">Your trusted partner for quality products and exceptional shopping experience.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><button onClick={() => setActiveSection('home')} className="hover:text-white transition-colors duration-200">Home</button></li>
            <li><button onClick={() => setActiveSection('about')} className="hover:text-white transition-colors duration-200">About Us</button></li>
            <li><button onClick={() => setActiveSection('contact')} className="hover:text-white transition-colors duration-200">Contact</button></li>
            <li><button onClick={() => setActiveSection('faq')} className="hover:text-white transition-colors duration-200">FAQ</button></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors duration-200">Men</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Women</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Electronics</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Accessories</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors duration-200">Facebook</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Twitter</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Instagram</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2025 Products. All rights reserved.</p>
      </div>
    </div>
  </footer>)
} 
export default Footer;