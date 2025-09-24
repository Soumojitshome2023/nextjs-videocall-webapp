'use strict';

var jsxRuntime = require('react/jsx-runtime');
var tailwindMerge = require('tailwind-merge');
var mergeDeep = require('../../../helpers/merge-deep.cjs');
var DatepickerContext = require('../DatepickerContext.cjs');
var helpers = require('../helpers.cjs');

const DatepickerViewsDecades = ({ theme: customTheme = {} }) => {
  const { theme: rootTheme, viewDate, selectedDate, minDate, maxDate, setViewDate, setView } = DatepickerContext.useDatePickerContext();
  const theme = mergeDeep.mergeDeep(rootTheme.views.decades, customTheme);
  const first = helpers.startOfYearPeriod(viewDate, 100);
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: theme.items.base, children: [...Array(12)].map((_year, index) => {
    const year = first - 10 + index * 10;
    const newDate = new Date(viewDate.getTime());
    newDate.setFullYear(year + viewDate.getFullYear() % 10);
    const firstDate = new Date(year, 0, 1);
    const lastDate = helpers.addYears(firstDate, 9);
    const isSelected = selectedDate && helpers.isDateInDecade(selectedDate, year);
    const isDisabled = !helpers.isDateInRange(firstDate, minDate, maxDate) && !helpers.isDateInRange(lastDate, minDate, maxDate);
    return /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        disabled: isDisabled,
        type: "button",
        className: tailwindMerge.twMerge(
          theme.items.item.base,
          isSelected && theme.items.item.selected,
          isDisabled && theme.items.item.disabled
        ),
        onClick: () => {
          if (isDisabled) return;
          selectedDate && setViewDate(helpers.addYears(viewDate, year - selectedDate.getFullYear()));
          setView(helpers.Views.Years);
        },
        children: year
      },
      index
    );
  }) });
};

exports.DatepickerViewsDecades = DatepickerViewsDecades;
//# sourceMappingURL=Decades.cjs.map
