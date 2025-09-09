import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer
      className="relative z-10 mt-16 pb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div className="glass-card max-w-md mx-auto text-center">
        <div className="flex items-center justify-center gap-2 text-white/80">
          <span className="text-sm font-medium">Developed with</span>
          <Heart className="w-4 h-4 text-red-400 animate-pulse" />
          <span className="text-sm font-medium">by</span>
          <span className="text-sm font-bold text-white">Adiseshu Jeenepally</span>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;