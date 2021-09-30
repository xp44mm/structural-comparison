import { mapWith } from './mapWith';
import { getWith } from './getWith';

export const pluckWith = (attr) => mapWith(getWith(attr));