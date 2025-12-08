"use client";

export function DottedPattern() {
  return (
    <div className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(163, 25, 91, 0.4) 1px, transparent 1px)`,
          backgroundSize: '12px 12px',
          backgroundPosition: '0 0',
        }}
      />
      {/* Gradient fade to blend with background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, var(--background) 0%, transparent 30%, transparent 100%)',
        }}
      />
    </div>
  );
}



