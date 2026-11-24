import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { ProjectDetail } from '@/components/project/ProjectDetail';
import type { Project } from '@/types/content';
import { ProjectDetailPage } from './ProjectDetailPage';

function renderDetail(slug: string) {
  return render(
    <MemoryRouter initialEntries={[`/works/${slug}`]}>
      <Routes>
        <Route path="/works/:slug" element={<ProjectDetailPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('ProjectDetailPage', () => {
  it('renders the title, description, gallery, and next project', () => {
    renderDetail('golden-hour');

    expect(screen.getByRole('heading', { level: 1, name: 'Golden Hour' })).toBeInTheDocument();
    expect(screen.getByText(/boutique photography studio/i)).toBeInTheDocument();
    expect(
      screen.getByText(/stationery, packaging, and a flexible social toolkit/i),
    ).toBeInTheDocument();

    const zoomButtons = screen.getAllByRole('button', {
      name: /view golden hour image \d larger/i,
    });
    expect(zoomButtons).toHaveLength(2);
    expect(screen.getAllByRole('img', { name: /golden hour brand mockup \d/i })).toHaveLength(2);

    expect(screen.getByRole('link', { name: 'Next project: Project Name' })).toHaveAttribute(
      'href',
      '/works/project-name',
    );
    expect(document.title).toBe('Golden Hour — Natnael Fikreyesus');
  });

  it('cycles the next-project link from the last project back to the first', () => {
    renderDetail('hen');

    expect(screen.getByRole('link', { name: 'Next project: Golden Hour' })).toHaveAttribute(
      'href',
      '/works/golden-hour',
    );
  });

  it('shows the not-found page for an unknown slug', () => {
    renderDetail('not-a-project');

    expect(screen.getByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument();
    expect(document.title).toBe('Page not found — Natnael Fikreyesus');
  });

  it('opens the lightbox, navigates with the keyboard, and restores focus on close', () => {
    renderDetail('golden-hour');

    const firstZoomButton = screen.getAllByRole('button', {
      name: /view golden hour image \d larger/i,
    })[0];

    if (!firstZoomButton) {
      throw new Error('Expected at least one gallery image button');
    }

    firstZoomButton.focus();
    fireEvent.click(firstZoomButton);

    const dialog = screen.getByRole('dialog', { name: 'Golden Hour image viewer' });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close image viewer' })).toHaveFocus();
    expect(screen.getByText('1 / 2')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'ArrowRight' });

    expect(screen.getByText('2 / 2')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(firstZoomButton).toHaveFocus();
  });

  it('shows a fallback when a gallery image fails to load', () => {
    renderDetail('golden-hour');

    const firstImage = screen.getAllByRole('img', { name: /golden hour brand mockup 1/i })[0];

    if (!firstImage) {
      throw new Error('Expected a gallery image');
    }

    fireEvent.error(firstImage);

    expect(screen.getByText(/this image could not be loaded/i)).toBeInTheDocument();
  });

  it('falls back gracefully when copy, imagery, and a next project are missing', () => {
    const sparseProject: Project = {
      id: 'sparse-project',
      title: 'Sparse Project',
      href: '/works/sparse-project',
      image: {
        src: '/mock.webp',
        srcSet: '/mock.webp 800w',
        width: 1400,
        height: 998,
      },
    };

    render(
      <MemoryRouter>
        <ProjectDetail project={sparseProject} nextProject={null} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Sparse Project' })).toBeInTheDocument();
    expect(
      screen.getByText(/full case study for this project is coming soon/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/project imagery is on its way/i)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /next project:/i })).not.toBeInTheDocument();
  });
});
