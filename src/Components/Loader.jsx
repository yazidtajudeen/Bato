import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Loader = ({ onLoadingComplete }) => {
  const ball1Ref = useRef(null);
  const ball2Ref = useRef(null);
  const ball3Ref = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkResourcesLoaded = () => {
      return document.readyState === 'complete';
    };

    const tl = gsap.timeline({
    });

    tl.to([ball1Ref.current, ball2Ref.current, ball3Ref.current], {
      y: -30,
      duration: 0.5,
      stagger: 0.2,
      ease: "power2.out"
    })
    .to([ball1Ref.current, ball2Ref.current, ball3Ref.current], {
      y: 0,
      duration: 0.5,
      stagger: 0.2,
      ease: "bounce.out"
    });

    const defaultTimeout = setTimeout(() => {
      if (checkResourcesLoaded()) {
        tl.pause();
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.10,
          onComplete: () => {
            if (onLoadingComplete) {
              onLoadingComplete();
            }
          }
        });
      }
    }, 4000);

    const networkCheck = setInterval(() => {
      if (checkResourcesLoaded()) {
        clearInterval(networkCheck);
        clearTimeout(defaultTimeout);
        tl.pause();
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            if (onLoadingComplete) {
              onLoadingComplete();
            }
          }
        });
      }
    }, 1000);

    return () => {
      tl.kill();
      clearTimeout(defaultTimeout);
      clearInterval(networkCheck);
    };
  }, [onLoadingComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50"
    >
      <div className="flex space-x-4 mb-4">
        <div
          ref={ball1Ref}
          className="w-4 h-4 rounded-full bg-[#AE4B68]"
        />
        <div
          ref={ball2Ref}
          className="w-4 h-4 rounded-full bg-[#AE4B68]"
        />
        <div
          ref={ball3Ref}
          className="w-4 h-4 rounded-full bg-[#AE4B68]"
        />
      </div>
      <p className="text-[#AE4B68] text-sm mt-4">Loading...</p>
    </div>
  );
};

export default Loader; 