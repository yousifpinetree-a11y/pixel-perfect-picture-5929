import { describe, expect, it } from 'vitest';
import { filterEvidence } from './investigation';

describe('Evidence search and filtering', () => {
  it('finds warehouse footage from realistic input', () => {
    expect(filterEvidence('warehouse', 'Video').map(item => item.id)).toEqual(['047']);
  });
  it('combines text search and evidence type without unrelated results', () => {
    expect(filterEvidence('warehouse', 'Document')).toEqual([]);
    expect(filterEvidence('  FINANCIAL  ', 'All').map(item => item.id)).toEqual(['046']);
  });
  it('allows searching an evidence identifier', () => {
    expect(filterEvidence('045', 'All').map(item => item.id)).toEqual(['045']);
  });
});