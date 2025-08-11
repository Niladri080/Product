import {Star, ShoppingCart, User} from 'lucide-react';
const AboutPage=()=>{
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Products</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are dedicated to bringing you the finest selection of products from around the world, 
            combining quality, innovation, and exceptional customer service.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop" 
              alt="Our team" 
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2020, Products began as a small startup with a big vision: to revolutionize 
              online shopping by curating only the best products and providing an unmatched customer experience.
            </p>
            <p className="text-gray-600 mb-4">
              Today, we serve thousands of customers worldwide, offering everything from cutting-edge technology 
              to lifestyle essentials, all backed by our commitment to quality and satisfaction.
            </p>
            <p className="text-gray-600">
              Our team of experts carefully selects each product to ensure it meets our high standards 
              for quality, innovation, and value.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality First</h3>
            <p className="text-gray-600">Every product is carefully tested and verified to meet our strict quality standards.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Shopping</h3>
            <p className="text-gray-600">Intuitive interface and seamless checkout process for a hassle-free experience.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Focus</h3>
            <p className="text-gray-600">24/7 support and satisfaction guarantee because your happiness is our priority.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AboutPage;