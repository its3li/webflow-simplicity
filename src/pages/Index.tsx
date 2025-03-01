import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
const Index = () => {
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const handleGetStarted = () => {
    if (user) {
      navigate("/order");
    } else {
      navigate("/auth");
    }
  };
  return <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-fade-in text-gray-950 text-center mx-[15px] my-0">
              Web<span className="text-emerald-500">+</span> Studio
            </h1>
            <p className="text-xl md:text-2xl text-green-700 mb-8 max-w-3xl mx-auto">Your vision, our expertise. We transform your idea into a live website.</p>
            <Button size="lg" variant="secondary" onClick={handleGetStarted} className="px-8 py-2 h-auto bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 shadow-lg hover:shadow-green-300/40 transition-all duration-300 ease-in-out rounded-xl text-base font-semibold text-[#f7fef7] text-center">Get Started  </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-green-100">
              <h3 className="text-2xl font-semibold mb-4 text-green-800">Portfolio Websites</h3>
              <p className="text-green-600">
                Showcase your work with a professionally designed portfolio website.
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-green-100">
              <h3 className="text-2xl font-semibold mb-4 text-green-800">SaaS Applications</h3>
              <p className="text-green-600">
                Transform your ideas into powerful SaaS solutions.
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-green-100">
              <h3 className="text-2xl font-semibold mb-4 text-green-800">E-commerce Stores</h3>
              <p className="text-green-600">
                Build your online store with modern e-commerce features.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-green-900">Ready to Get Started?</h2>
          <p className="text-green-700 mb-8">
            Let's create something amazing together. Click below to begin your journey.
          </p>
          <Button onClick={handleGetStarted} size="lg" className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            Start Your Project
          </Button>
        </div>
      </section>
    </div>;
};
export default Index;