import HttpCache from '../../utils/HttpCache';

export function fetchAreas() {
   return {
      type: 'FETCH_AREAS',
      payload: HttpCache.get('areas', '/areas', {days: '1'}),
      meta: {
         data: 'areas'
      }
   };
}
