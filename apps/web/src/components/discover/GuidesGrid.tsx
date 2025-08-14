import { Guide } from '@travel-app/domain';
import GuideCard from './GuideCard';

interface GuidesGridProps {
  guides: Guide[];
}

const GuidesGrid = ({ guides }: GuidesGridProps) => {
  if (guides.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
        <p className="text-gray-500 dark:text-gray-400">No guides found</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {guides.map((guide) => (
        <GuideCard key={guide.id} guide={guide} />
      ))}
    </div>
  );
};

export default GuidesGrid;

