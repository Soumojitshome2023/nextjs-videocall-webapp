'use client';
import { jsx } from 'react/jsx-runtime';
import { forwardRef, useState } from 'react';
import { FaCheck, FaClipboardList } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep.mjs';
import { getTheme } from '../../theme-store/index.mjs';
import { copyToClipboard } from './helpers.mjs';

const ClipboardWithIcon = forwardRef(
  ({ valueToCopy, icon: Icon = FaClipboardList, theme: customTheme = {}, className, ...rest }, ref) => {
    const [isJustCopied, setIsJustCopied] = useState(false);
    const theme = mergeDeep(getTheme().clipboard.withIcon, customTheme);
    return /* @__PURE__ */ jsx(
      "button",
      {
        className: twMerge(theme.base, className),
        onClick: () => copyToClipboard(valueToCopy, setIsJustCopied),
        ...rest,
        ref,
        children: isJustCopied ? /* @__PURE__ */ jsx(FaCheck, { "aria-hidden": true, className: theme.icon.successIcon }) : /* @__PURE__ */ jsx(Icon, { "aria-hidden": true, className: theme.icon.defaultIcon })
      }
    );
  }
);

export { ClipboardWithIcon };
//# sourceMappingURL=ClipboardWithIcon.mjs.map
