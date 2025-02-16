import { Suspense } from 'react';
import WrappedSearchOverlay from '@/components/SearchOverlay'; // Adjust the import as necessary
import { useState } from 'react';

export default function Custom404() {
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);

  return (
    <>
      {/* Other content for your 404 page */}
      <Suspense fallback={<div>Loading...</div>}>
        <WrappedSearchOverlay 
          isOpen={isSearchOverlayOpen} 
          onClose={() => setIsSearchOverlayOpen(false)} 
        />
      </Suspense>
    </>
  );
} 