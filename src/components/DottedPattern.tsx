"use client";

export function DottedPattern() {
  return (
    <div className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none overflow-hidden">
      <div 
        className="absolute inset-0 bg-dotted-pattern"
        suppressHydrationWarning
      />
      {/* Gradient fade to blend with background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, var(--background) 0%, transparent 30%, transparent 100%)',
        }}
        suppressHydrationWarning
      />
    </div>
  );
}




