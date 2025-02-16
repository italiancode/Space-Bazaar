import React from 'react';

interface FadeGlowEffectProps {
  className?: string; // Add className as an optional prop
}

const FadeGlowEffect: React.FC<FadeGlowEffectProps> = ({ className }) => {
  return (
    <div className={`fade-glow-effect ${className}`} style={{ pointerEvents: 'none' }}>
      {/* Bottom fade & glow effect */}
      <div className="absolute inset-x-0 bottom-0 h-10">
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-background via-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#4F46E5]/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#4F46E5]/20 to-transparent" />
      </div>
    </div>
  );
};

export default FadeGlowEffect; 