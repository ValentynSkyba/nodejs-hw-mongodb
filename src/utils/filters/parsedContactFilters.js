import { typeList } from '../../constants/contact-constants.js';

const parsedContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const isContactType = (contactType) => typeList.includes(contactType);
  if (isContactType(contactType)) return contactType;
};

const parsedFavourite = (favourite) => {
  if (typeof favourite !== 'string') return undefined;

  const normalized = favourite.toLowerCase();
  if (['true', 'false'].includes(normalized)) {
    return normalized === 'true';
  }

  return undefined;
};

export const parseContactFilters = ({ contactType, isFavourite }) => {
  const type = parsedContactType(contactType);
  const favourite = parsedFavourite(isFavourite);

  return {
    contactType: type,
    isFavourite: favourite,
  };
};
