import { Suspense } from 'react';
import SearchResults from './SearchResults';

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="px-8 py-12">Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}
