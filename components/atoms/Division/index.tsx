import React from 'react';

interface DivisionProps {
    className?: string;
}

function DivisionBar({ className }: DivisionProps) {
  return (
    <div>
      <hr className={className} />
    </div>
  );
}

export default DivisionBar;