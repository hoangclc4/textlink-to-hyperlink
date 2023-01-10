import {
  replaceTextLinkToSpecialHyperlink,
  replaceTextLinkToOtherHyperlink,
  replaceTextLinkToEmailHyperlink,
  replaceTextLinkToAddressHyperlink,
  replaceTextLinkToPhoneHyperlink,
} from '../lib/hyperlink';

export const textLinkToHyperlink = (text: string) => {
  text = replaceTextLinkToSpecialHyperlink(text);

  text = replaceTextLinkToOtherHyperlink(text);

  text = replaceTextLinkToEmailHyperlink(text);

  text = replaceTextLinkToAddressHyperlink(text);

  text = replaceTextLinkToPhoneHyperlink(text);
  return text;
};
