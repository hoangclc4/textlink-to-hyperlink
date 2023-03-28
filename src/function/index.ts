import {
  replaceTextLinkToSpecialHyperlink,
  replaceTextLinkToOtherHyperlink,
  replaceTextLinkToEmailHyperlink,
  replaceTextLinkToAddressHyperlink,
  replaceTextLinkToPhoneHyperlink,
  replaceTextLinkToText,
} from '../lib/hyperlink';

export const textLinkToHyperlink = (text: string) => {
  text = replaceTextLinkToSpecialHyperlink(text);

  text = replaceTextLinkToOtherHyperlink(text);

  text = replaceTextLinkToEmailHyperlink(text);

  text = replaceTextLinkToAddressHyperlink(text);

  text = replaceTextLinkToPhoneHyperlink(text);
  // this function 
  // text = replaceTextLinkToText(text)
  return text;
};
