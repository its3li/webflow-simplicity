
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import TransitionLayout from '../components/TransitionLayout';

const Index = () => {
  const navigate = useNavigate();

  return (
    <TransitionLayout>
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <nav className="fixed top-0 w-full max-w-7xl mx-auto p-6">
          <Logo />
        </nav>
        
        <motion.div 
          className="max-w-3xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
            Web Development Experts
          </span>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Create Your Perfect Digital Presence
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We design and develop exceptional websites that help businesses grow, engage customers, and build lasting digital success.
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="button-primary"
            onClick={() => navigate('/login')}
          >
            Get Started NOW
          </motion.button>
        </motion.div>

        <div className="absolute bottom-0 w-full max-w-7xl mx-auto p-6 flex justify-between text-sm text-muted-foreground">
          <span>© 2024 Web+ Studio</span>
          <div className="space-x-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </TransitionLayout>
  );
};

export default Index;
