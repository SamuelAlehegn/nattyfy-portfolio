import { useSearchParams } from 'react-router-dom';
import { WorksHero } from '@/components/works/WorksHero';
import { WorksShowcase } from '@/components/works/WorksShowcase';
import { worksViews } from '@/components/works/works-views';
import type { WorksView } from '@/components/works/works-views';

function isWorksView(value: string | null): value is WorksView {
  return worksViews.some((view) => view.id === value);
}

/**
 * My Works page. The active category lives in `?view=` so logo and social
 * views are linkable and the back button returns to the previous filter.
 */
export function WorksPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const viewParam = searchParams.get('view');
  const activeView: WorksView = isWorksView(viewParam) ? viewParam : 'all';

  const handleViewChange = (view: WorksView) => {
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
  };

  return (
    <>
      <WorksHero />
      <WorksShowcase activeView={activeView} onViewChange={handleViewChange} />
    </>
  );
}
