// src/components/3d/ServiceCard3D.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiStar, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { formatPrice, getCategoryInfo } from '../../utils/helpers';
import Badge from '../ui/Badge';

const ServiceCard3D = ({ service, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const {
    _id,
    serviceName,
    category,
    price,
    description,
    imageUrl,
    providerName,
    providerEmail,
    reviews = [],
  } = service;

  const categoryInfo = getCategoryInfo(category);
  
  // Calculate average rating
  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="perspective-1000"
    >
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: -mousePosition.y,
          rotateY: mousePosition.x,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative preserve-3d"
      >
        <div className="relative bg-light-100 dark:bg-dark-200 rounded-2xl overflow-hidden border border-light-400 dark:border-dark-100 shadow-xl">
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden">
            <motion.img
              src={imageUrl || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500'}
              alt={serviceName}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-dark-400/40"
              animate={{ opacity: isHovered ? 0.6 : 0.3 }}
            />

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <Badge variant="primary">
                <span className="mr-1">{categoryInfo.icon}</span>
                {categoryInfo.label}
              </Badge>
            </div>

            {/* Price Tag */}
            <motion.div
              className="absolute top-4 right-4 px-4 py-2 rounded-xl bg-light-100 dark:bg-dark-200 shadow-lg"
              animate={{ y: isHovered ? 0 : 0 }}
            >
              <span className="font-heading font-bold text-primary-600 dark:text-primary-400">
                {formatPrice(price)}
              </span>
            </motion.div>

            {/* Rating */}
            {reviews.length > 0 && (
              <div className="absolute bottom-4 left-4 flex items-center gap-1 px-3 py-1 rounded-full bg-dark-400/80 text-white text-sm">
                <FiStar className="text-amber-400 fill-amber-400" />
                <span className="font-medium">{avgRating}</span>
                <span className="text-gray-300">({reviews.length})</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-lg font-heading font-bold text-dark-300 dark:text-light-100 mb-2 line-clamp-1">
              {serviceName}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
              {description}
            </p>

            {/* Provider Info */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-light-400 dark:border-dark-100">
              <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
                <span className="text-primary-600 dark:text-primary-400 font-bold">
                  {providerName?.charAt(0) || 'P'}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-dark-300 dark:text-light-100">
                  {providerName}
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <FiMapPin size={10} />
                  Service Provider
                </p>
              </div>
            </div>

            {/* Action Button */}
            <Link to={`/services/${_id}`}>
              <motion.button
                whileHover={{ x: 5 }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-400 font-semibold hover:bg-primary-500/20 transition-colors"
              >
                View Details
                <FiArrowRight />
              </motion.button>
            </Link>
          </div>

          {/* 3D Shadow Effect */}
          <motion.div
            className="absolute -z-10 inset-4 rounded-2xl bg-primary-500/20 blur-2xl"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ServiceCard3D;