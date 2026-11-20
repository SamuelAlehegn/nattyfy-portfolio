import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { ProjectDetailPage } from './ProjectDetailPage';
import { WorksPage } from './WorksPage';

function renderWorks(initialEntry = '/works') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/works" element={<WorksPage />} />
        <Route path="/works/:slug" element={<ProjectDetailPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('WorksPage', () => {
  it('renders the stacked title and the default All view', () => {
    renderWorks();

    expect(screen.getByRole('heading', { level: 1, name: 'MY WORKS' })).toBeInTheDocument();
    expect(screen.getByText('Some of')).toBeInTheDocument();

    const tabs = screen.getAllByRole('tab');
    expect(tabs.map((tab) => tab.textContent)).toEqual(['All', 'Brands', 'Logos', 'Social Media']);
    expect(screen.getByRole('tab', { name: 'All' })).toHaveAttribute('aria-selected', 'true');

    expect(screen.getByRole('heading', { level: 2, name: 'Brands' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Logos' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Social Media Posts' }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /^View project:/ })).toHaveLength(8);
    expect(screen.getByRole('link', { name: 'View project: Golden Hour' })).toHaveAttribute(
      'href',
      '/works/golden-hour',
    );
    expect(screen.getByRole('link', { name: 'View project: Project Name' })).toHaveAttribute(
      'href',
      '/works/project-name',
    );
  });

  it('filters between the brand and logo grids', () => {
    renderWorks();

    fireEvent.click(screen.getByRole('tab', { name: 'Logos' }));

    expect(screen.getByRole('tab', { name: 'Logos' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('heading', { level: 2, name: 'Logos' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 2, name: 'Brands' })).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: /sweden/i })).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(18);

    fireEvent.click(screen.getByRole('tab', { name: 'Brands' }));

    expect(screen.getByRole('heading', { level: 2, name: 'Brands' })).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: /sweden/i })).not.toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /^View project:/ })).toHaveLength(8);
  });

  it('moves the tab selection with the arrow keys', () => {
    renderWorks();

    const allTab = screen.getByRole('tab', { name: 'All' });
    allTab.focus();

    fireEvent.keyDown(allTab, { key: 'ArrowRight' });

    expect(screen.getByRole('tab', { name: 'Brands' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Brands' })).toHaveFocus();

    fireEvent.keyDown(screen.getByRole('tab', { name: 'Brands' }), { key: 'End' });

    expect(screen.getByRole('tab', { name: 'Social Media' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByRole('tab', { name: 'Social Media' })).toHaveFocus();
  });

  it('supports linking directly to a filtered view', () => {
    renderWorks('/works?view=logos');

    expect(screen.getByRole('tab', { name: 'Logos' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('heading', { level: 2, name: 'Logos' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 2, name: 'Brands' })).not.toBeInTheDocument();
  });

  it('renders the tilted social media posts collage', () => {
    renderWorks('/works?view=social');

    expect(
      screen.getByRole('heading', { level: 2, name: 'Social Media Posts' }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument();

    expect(document.querySelectorAll('article')).toHaveLength(9);
    expect(screen.getAllByRole('article')).toHaveLength(3);

    expect(screen.getByRole('img', { name: /Ovid Real Estate post/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Miawa Spring Water post/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /HayaSebat post/i })).toBeInTheDocument();

    expect(screen.getAllByText('FOLLOW')).toHaveLength(9);
    expect(screen.getAllByText('1992 likes')).toHaveLength(9);
    expect(screen.getAllByText('#NICE #cats #fine #lovely #family')).toHaveLength(9);
  });

  it('shows a fallback when social post artwork fails to load', () => {
    renderWorks('/works?view=social');

    fireEvent.error(screen.getByRole('img', { name: /Ovid Real Estate post/i }));

    expect(screen.getByText('Post artwork unavailable')).toBeInTheDocument();
  });

  it('navigates from a brand card to its project page', () => {
    renderWorks();

    fireEvent.click(screen.getByRole('link', { name: 'View project: Golden Hour' }));

    expect(screen.getByRole('heading', { level: 1, name: 'Golden Hour' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Next project: Project Name' })).toHaveAttribute(
      'href',
      '/works/project-name',
    );
  });
});
