export type WorksView = 'all' | 'brands' | 'logos' | 'social';

export const worksViews: ReadonlyArray<{ id: WorksView; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'brands', label: 'Brands' },
  { id: 'logos', label: 'Logos' },
  { id: 'social', label: 'Social Media' },
];
