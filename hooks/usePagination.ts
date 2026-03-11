'use client';

import { useState } from 'react';
import { ITEMS_PER_PAGE } from '@/utils/constants';

interface UsePaginationOptions {
  initialPage?: number;
  pageSize?: number;
}

export function usePagination({ initialPage = 1, pageSize = ITEMS_PER_PAGE }: UsePaginationOptions = {}) {
  const [page, setPage] = useState(initialPage);

  const reset = () => setPage(1);

  return { page, setPage, pageSize, reset };
}
