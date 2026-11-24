import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { WorksHero } from '@/components/works/WorksHero';
import { WorksShowcase } from '@/components/works/WorksShowcase';
import { isWorksView } from '@/components/works/works-views';
import type { WorksView } from '@/components/works/works-views';
import { usePageTitle } from '@/lib/usePageTitle';

/**
 * My Works page. The active category lives in `?view=` so logo and social
 * views are linkable and the back button returns to the previous filter.
 */
export function WorksPage() {
  usePageTitle('My Works');

  const [searchParams, setSearchParams] = useSearchParams();
  const viewParam = searchParams.get('view');
  const activeView: WorksView = isWorksView(viewParam) ? viewParam : 'all';

  const handleViewChange = useCallback(
    (view: WorksView) => {
      if (view === activeView) {
        return;
      }

      const nextParams = new URLSearchParams(searchParams);

      if (view === 'all') {
        nextParams.delete('view');
      } else {
        nextParams.set('view', view);
      }

      setSearchParams(nextParams);
    },
    [activeView, searchParams, setSearchParams],
  );

  return (
    <>
      <WorksHero />
      <WorksShowcase activeView={activeView} onViewChange={handleViewChange} />
    </>
  );
}
