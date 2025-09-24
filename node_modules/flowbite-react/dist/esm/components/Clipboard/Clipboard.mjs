'use client';
import { jsx } from 'react/jsx-runtime';
import { forwardRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep.mjs';
import { getTheme } from '../../theme-store/index.mjs';
import { Tooltip } from '../Tooltip/Tooltip.mjs';
import { ClipboardWithIcon } from './ClipboardWithIcon.mjs';
import { ClipboardWithIconText } from './ClipboardWithIconText.mjs';
import { copyToClipboard } from './helpers.mjs';

const ClipboardComponent = forwardRef(
  ({ className, valueToCopy, label, theme: customTheme = {}, ...rest }, ref) => {
    const [isJustCopied, setIsJustCopied] = useState(false);
    const theme = mergeDeep(getTheme().clipboard.button, customTheme);
    return /* @__PURE__ */ jsx(Tooltip, { content: isJustCopied ? "Copied" : "Copy to clipboard", className: "[&_*]:cursor-pointer", children: /* @__PURE__ */ jsx(
      "button",
      {
        className: twMerge(theme.base, className),
        onClick: () => copyToClipboard(valueToCopy, setIsJustCopied),
        ...rest,
        ref,
        children: /* @__PURE__ */ jsx("span", { className: theme.label, children: label })
      }
    ) });
  }
);
ClipboardComponent.displayName = "Clipboard";
ClipboardWithIcon.displayName = "Clipboard.WithIcon";
ClipboardWithIconText.displayName = "Clipboard.WithIconText";
const Clipboard = Object.assign(ClipboardComponent, {
  WithIcon: ClipboardWithIcon,
  WithIconText: ClipboardWithIconText
});

export { Clipboard };
//# sourceMappingURL=Clipboard.mjs.map
