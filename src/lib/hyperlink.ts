/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-useless-escape */
import { typeTextByLanguage, mapExtensionToType } from '../enum/hyperlink';
import { ExceptTextRange } from '../types/index';

export const listUnuseText = (text: string) => {
  // regex exec muti (?:<a.*?<\/a>) and return an array that contain start and end index
  const regex = /aria-label=(\\"|")[^"]*(\\"|")/g;
  let match: RegExpExecArray | null;
  const matches: ExceptTextRange[] = [];
  while ((match = regex.exec(text)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (match.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    // get the start and end index of the match and store it in the array
    const start = match.index;
    const end = regex.lastIndex;
    matches.push({ start, end, text: match[0] });
  }
  return matches;
};

export const listLinkTag = (text: string) => {
  // regex exec muti (?:<a.*?<\/a>) and return an array that contain start and end index
  const regex = /<a.*?<\/a>/g;
  let match: RegExpExecArray | null;
  const matches: ExceptTextRange[] = [];
  while ((match = regex.exec(text)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (match.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    // get the start and end index of the match and store it in the array
    const start = match.index;
    const end = regex.lastIndex;
    matches.push({ start, end, text: match[0] });
  }
  return matches;
};

export const listImgTag = (text: string) => {
  // regex exec muti  (?:<img.*?\/>) and return an array that contain start and end index
  const regex = /<img.*?\/>/g;
  let match: RegExpExecArray | null;
  const matches: ExceptTextRange[] = [];
  while ((match = regex.exec(text)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (match.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    // get the start and end index of the match and store it in the array
    const start = match.index;
    const end = regex.lastIndex;
    matches.push({ start, end, text: match[0] });
  }
  return matches;
};
export const replaceTextLinkToSpecialHyperlink = (text: string) => {
  const regex =
    /(?:http[s]*:\/\/)(?:[a-zA-Z\-_0-9\/.]+)\.(?:[a-zA-Z.]{2,3})\/(?:[a-zA-Z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)(?:[a-zA-Z0-9]+\.)(jpg|jpeg|png|svg|gif|avif|webp|bmp|ico|docx|doc|xlsx|xlsm|xlsb|xls|pptx|ppt|pdf)+(?:[\/,\?][^\s]{2,}|(?![\/,\?][^\s]{2,}))/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (match.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    const exceptRanges = [...listLinkTag(text), ...listImgTag(text), ...listUnuseText(text)];
    const isExcept = exceptRanges.some(({ start, end }) => {
      return start <= match.index && match.index <= end;
    });
    if (isExcept) continue;
    const { 0: url, 1: type } = match;
    const linkType = mapExtensionToType[type] || 'other';
    const anchorText = typeTextByLanguage[linkType].default;
    let link = `<a href="${url}" rel="nofollow">${anchorText}</a>`;
    if (linkType === 'image')
      link = `<img src="${url}"  alt="${anchorText}" width="100%" height="100%"/>`;
    text = text.slice(0, match.index) + link + text.slice(regex.lastIndex);
    regex.lastIndex = match.index + link.length;
  }
  return text;
};
export const replaceTextLinkToOtherHyperlink = (text: string) => {
  const regex =
    /(?:https?:\/\/(?:www\.|(?!www))(?:[a-zA-Z0-9][a-zA-Z0-9-]+(?:\.|(?!\.)))+(?:[\/,\?][^\s]{2,}|(?![\/,\?][^\s]{2,}))|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[a-zA-Z0-9]+(?:[\/,\?][^\s]{2,}|(?![\/,\?][^\s]{2,}))|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[a-zA-Z0-9]+(?:[\/,\?][^\s]{2,}|(?![\/,\?][^\s]{2,}))|www\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+(?:[\/,\?][^\s]{2,}|(?![\/,\?][^\s]{2,})))/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (match.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    const exceptRanges = [...listLinkTag(text), ...listImgTag(text), ...listUnuseText(text)];
    const isExcept = exceptRanges.some(({ start, end }) => {
      return start <= match.index && match.index <= end;
    });
    if (isExcept) {
      continue;
    }
    const url = match[0];
    const link = `<a href="${url}" rel="nofollow">${url}</a>`;
    text = text.slice(0, match.index) + link + text.slice(regex.lastIndex);
    regex.lastIndex = match.index + link.length;
  }
  return text;
};

export const replaceTextLinkToEmailHyperlink = (text: string) => {
  const regex =
    /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)/g;
  let match: RegExpMatchArray | null;
  while ((match = regex.exec(text)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (match.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    const exceptRanges = [...listLinkTag(text), ...listImgTag(text), ...listUnuseText(text)];
    const isExcept = exceptRanges.some(({ start, end }) => {
      return start <= match.index && match.index <= end;
    });
    if (isExcept) continue;
    const { 0: email } = match;
    const link = `<a href="mailto:${email}" rel="nofollow">${email}</a>`;
    text = text.slice(0, match.index) + link + text.slice(regex.lastIndex);
    regex.lastIndex = match.index + link.length;
  }
  return text;
};

export const replaceTextLinkToAddressHyperlink = (text: string) => {
  const regex =
    /(?:〒[0-9０-９]{3}[-－−][0-9０-９]{4}[\n\s　]*)?(?:[^\n\s　;<>。、,，.:]{2,5}[都道府県市区町村]){1,3}(?:[^\n;<>。、.,，]{2,}?[0-9０-９一二三四五六七八九十]+(?:-|－|−|丁目|地割|部|番町|号)[0-9０-９一二三四五六七八九十]+(?:-|－|−|番地|番)?(?:[0-9０-９一二三四五六七八九十]+号?)?)(?:[^\n;<>。、.,，]+ビル)?(?:[^\n;<>。、.,，]*?[0-9０-９一二三四五六七八九]+[階F])?/g;
  let match: RegExpMatchArray | null;
  while ((match = regex.exec(text)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (match.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    const exceptRanges = [...listLinkTag(text), ...listImgTag(text), ...listUnuseText(text)];
    const isExcept = exceptRanges.some(({ start, end }) => {
      return start <= match.index && match.index <= end;
    });
    if (isExcept) continue;
    const { 0: address } = match;
    const link = `<a href="https://www.google.co.jp/maps/place/${address}" rel="nofollow">${address}</a>`;
    text = text.slice(0, match.index) + link + text.slice(regex.lastIndex);
    regex.lastIndex = match.index + link.length;
  }
  return text;
};

export const replaceTextLinkToPhoneHyperlink = (text: string) => {
  const regex =
    /[+＋]?[(]{0,1}[0-9０-９]{1,4}[)]{0,1}[-‐―−ー－0-9０-９]{9,12}/g;
  let match: RegExpMatchArray | null;
  while ((match = regex.exec(text)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (match.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    const exceptRanges = [...listLinkTag(text), ...listImgTag(text), ...listUnuseText(text)];

    const isExcept = exceptRanges.some(({ start, end }) => {
      return start <= match.index && match.index <= end;
    });
    if (isExcept) continue;
    const { 0: phone } = match;
    const link = `<a href="tel:${phone}" rel="nofollow">${phone}</a>`;
    text = text.slice(0, match.index) + link + text.slice(regex.lastIndex);
    regex.lastIndex = match.index + link.length;
  }
  return text;
};

const linkRegex = {
  byExtension:
    /(?:http[s]*:\/\/)(?:[a-zA-Z\-_0-9\/.]+)\.(?:[a-zA-Z.]{2,3})\/(?:[a-zA-Z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)(?:[a-zA-Z0-9]+\.)(jpg|jpeg|png|svg|gif|avif|webp|bmp|ico|docx|doc|xlsx|xlsm|xlsb|xls|pptx|ppt|pdf)+(?:[\/,\?][^\s]{2,}|(?![\/,\?][^\s]{2,}))/g,
  byOther:
    /(?:https?:\/\/(?:www\.|(?!www))(?:[a-zA-Z0-9][a-zA-Z0-9-]+(?:\.|(?!\.)))+(?:[\/,\?][^\s]{2,}|(?![\/,\?][^\s]{2,}))|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[a-zA-Z0-9]+(?:[\/,\?][^\s]{2,}|(?![\/,\?][^\s]{2,}))|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[a-zA-Z0-9]+(?:[\/,\?][^\s]{2,}|(?![\/,\?][^\s]{2,}))|www\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+(?:[\/,\?][^\s]{2,}|(?![\/,\?][^\s]{2,})))/g,
};
export const replaceTextLinkToText = (text: string) => {
  const byExtensionRegex = linkRegex.byExtension;
  const matchs = text.matchAll(byExtensionRegex);
  for (const match of matchs) {
    const { 0: url, 1: type } = match;
    const linkType = mapExtensionToType[type] || 'other';
    const anchorText = typeTextByLanguage[linkType].default;
    text = text.replace(url, anchorText);
  }
  const byOtherRegex = linkRegex.byOther;
  const matchs2 = text.matchAll(byOtherRegex);
  for (const match of matchs2) {
    const { 0: url } = match;
    const anchorText = typeTextByLanguage['other'].default;
    text = text.replace(url, anchorText);
  }
  return text;
};
