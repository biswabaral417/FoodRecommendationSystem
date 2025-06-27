import React, { useState, useEffect, useRef } from 'react';

const LazyImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [showImage, setShowImage] = useState(false);
  
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShowImage(true);
        observer.disconnect();
      }
    });
    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={className}>
      {showImage ? (
        <img src={src} alt={alt} className={className} loading="lazy" />
      ) : (
        <div className="w-full h-40 bg-gray-200 rounded animate-pulse" />
      )}
    </div>
  );
};

export default LazyImage
