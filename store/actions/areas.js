import HttpCache from '../HttpCache';

export const FETCH_AREAS = 'FETCH_AREAS';

export function fetchAreas() {
   return {
      type: FETCH_AREAS,
      payload: HttpCache.get('areas', '/areas', {days: '1'})
   };
}
