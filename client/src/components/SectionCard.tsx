 import React from 'react';

 interface SectionCardProps {
    children: React.ReactNode;
    className?: string;
 };

 const SectionCard = ({ children, className }: SectionCardProps) => {
    return(
        <div className = {`bg-mint shadow-xl p-12 md:p-15 rounded-xl mx-auto max-w-7xl ${className || ''}`}>
            {children}
        </div>
    );
 }

 export default SectionCard;