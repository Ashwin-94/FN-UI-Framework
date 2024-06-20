import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import DateField, { DatePickerProps } from './DatePicker';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeflex/primeflex.css'; // import theme

export default {
    title: 'Components/DateField',
    component: DateField,
    tags: ['autodocs'],
    argTypes: {
        id: { control: 'text' },
        appendTo: { control: 'text' },
        autoFocus: { control: 'boolean' },
        ariaLabelledBy: { control: 'text' },
        ariaLabel: { control: 'text' },
        autoZIndex: { control: 'boolean' },
        baseZIndex: { control: 'number' },
        className: { control: 'text' },
        clearButtonClassName: { control: 'text' },
        dateFormat: { control: 'text' },
        decrementIcon: { control: 'text' },
        invalid: { control: 'boolean' },
        disabled: { control: 'boolean' },
        variant: { control: { type: 'select', options: ['outlined', 'filled'] } },
        disabledDates: { control: 'object' },
        disabledDays: { control: 'object' },
        enabledDates: { control: 'object' },
        hideOnDateTimeSelect: { control: 'boolean' },
        hideOnRangeSelection: { control: 'boolean' },
        hourFormat: { control: { type: 'select', options: ['12', '24'] } },
        icon: { control: 'text' },
        iconPos: { control: { type: 'select', options: ['left', 'right'] } },
        incrementIcon: { control: 'text' },
        inline: { control: 'boolean' },
        inputClassName: { control: 'text' },
        inputId: { control: 'text' },
        inputRef: { control: 'text' },
        inputStyle: { control: 'object' },
        keepInvalid: { control: 'boolean' },
        locale: { control: 'text' },
        mask: { control: 'text' },
        maskSlotChar: { control: 'text' },
        maxDate: { control: 'date' },
        maxDateCount: { control: 'number' },
        minDate: { control: 'date' },
        monthNavigator: { control: 'boolean' },
        name: { control: 'text' },
        nextIcon: { control: 'text' },
        numberOfMonths: { control: 'number' },
        panelClassName: { control: 'text' },
        panelStyle: { control: 'object' },
        placeholder: { control: 'text' },
        prevIcon: { control: 'text' },
        readOnlyInput: { control: 'boolean' },
        required: { control: 'boolean' },
        selectOtherMonths: { control: 'boolean' },
        shortYearCutoff: { control: 'text' },
        showButtonBar: { control: 'boolean' },
        showIcon: { control: 'boolean' },
        showMillisec: { control: 'boolean' },
        showMinMaxRange: { control: 'boolean' },
        showOnFocus: { control: 'boolean' },
        showOtherMonths: { control: 'boolean' },
        showSeconds: { control: 'boolean' },
        showTime: { control: 'boolean' },
        showWeek: { control: 'boolean' },
        stepHour: { control: 'number' },
        stepMillisec: { control: 'number' },
        stepMinute: { control: 'number' },
        stepSecond: { control: 'number' },
        style: { control: 'object' },
        tabIndex: { control: 'number' },
        timeOnly: { control: 'boolean' },
        todayButtonClassName: { control: 'text' },
        tooltip: { control: 'text' },
        tooltipOptions: { control: 'object' },
        touchUI: { control: 'boolean' },
        transitionOptions: { control: 'object' },
        view: { control: { type: 'select', options: ['date', 'month', 'year'] } },
        viewDate: { control: 'date' },
        visible: { control: 'boolean' },
        yearNavigator: { control: 'boolean' },
        yearRange: { control: 'text' },
        formatDateTime: { control: 'text' },
        parseDateTime: { control: 'text' },
        dateTemplate: { control: 'text' },
        decadeTemplate: { control: 'text' },
        footerTemplate: { control: 'text' },
        headerTemplate: { control: 'text' },
        monthNavigatorTemplate: { control: 'text' },
        yearNavigatorTemplate: { control: 'text' },
    },
} as Meta;

const Template: StoryFn<DatePickerProps> = (args) => <DateField {...args} />;

/**
 * Default story: Renders the DateField with default props.
 */
export const Default = Template.bind({});
Default.args = {
    label: 'Select Date',
    className: 'default-class',
};

/**
 * WithValue story: Renders the DateField with an initial value.
 */
export const WithValue = Template.bind({});
WithValue.args = {
    label: 'Select Date',
    value: new Date(),
    className: 'default-class',
};

/**
 * Invalid story: Renders the DateField in an invalid state.
 */
export const Invalid = Template.bind({});
Invalid.args = {
    invalid: true,
    className: 'default-class',
};

/**
 * Disabled story: Renders the DateField in a disabled state.
 */
export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
    className: 'default-class',
};

/**
 * WithClassName story: Renders the DateField with a custom class name.
 */
export const WithClassName = Template.bind({});
WithClassName.args = {
    className: 'custom-input',
};

/**
 * WithSize story: Renders the DateField with a specified size.
 */
export const WithSize = Template.bind({});
WithSize.args = {
    size: 'lg',
    className: 'default-class',
};

/**
 * WithTooltip story: Renders the DateField with a tooltip.
 */
export const WithTooltip = Template.bind({});
WithTooltip.args = {
    tooltip: 'Select a date',
    tooltipOptions: { position: 'top' },
    className: 'default-class',
};

/**
 * Unstyled story: Renders the DateField without additional styles.
 */
export const Unstyled = Template.bind({});
Unstyled.args = {
    unstyled: true,
    className: '',
};

/**
 * WithVariant story: Renders the DateField with the "filled" variant.
 */
export const WithVariant = Template.bind({});
WithVariant.args = {
    variant: 'filled',
    className: 'default-class',
};


/**
 * WithLocale story: Renders the DateField with a specific locale.
 */
// export const WithLocale = Template.bind({});
// WithLocale.args = {
//     locale: 'es',
//     className: 'default-class',
// };

/**
 * WithDisabledDates story: Renders the DateField with specific disabled dates.
 */
export const WithDisabledDates = Template.bind({});
WithDisabledDates.args = {
    disabledDates: [new Date(2024, 6, 20), new Date(2024, 6, 21)],
    className: 'default-class',
};

/**
 * WithEnabledDates story: Renders the DateField with specific enabled dates.
 */
export const WithEnabledDates = Template.bind({});
WithEnabledDates.args = {
    enabledDates: [new Date(2024, 6, 22), new Date(2024, 6, 23)],
    className: 'default-class',
};

/**
 * WithMinMaxDate story: Renders the DateField with a minimum and maximum date.
 */
export const WithMinMaxDate = Template.bind({});
WithMinMaxDate.args = {
    minDate: new Date(2024, 6, 1),
    maxDate: new Date(2024, 6, 31),
    className: 'default-class',
};

/**
 * WithShowTime story: Renders the DateField with time selection enabled.
 */
export const WithShowTime = Template.bind({});
WithShowTime.args = {
    showTime: true,
    hourFormat: '24',
    className: 'default-class',
};

/**
 * WithShowSeconds story: Renders the DateField with seconds selection enabled.
 */
export const WithShowSeconds = Template.bind({});
WithShowSeconds.args = {
    showTime: true,
    showSeconds: true,
    className: 'default-class',
};

/**
 * WithYearNavigator story: Renders the DateField with year navigation enabled.
 */
export const WithYearNavigator = Template.bind({});
WithYearNavigator.args = {
    yearNavigator: true,
    yearRange: '2020:2030',
    className: 'default-class',
};

/**
 * WithMonthNavigator story: Renders the DateField with month navigation enabled.
 */
export const WithMonthNavigator = Template.bind({});
WithMonthNavigator.args = {
    monthNavigator: true,
    className: 'default-class',
};

/**
 * Inline story: Renders the DateField inline.
 */
export const Inline = Template.bind({});
Inline.args = {
    inline: true,
    className: 'default-class',
};

/**
 * WithTooltipAndPlaceholder story: Renders the DateField with a tooltip and placeholder.
 */
export const WithTooltipAndPlaceholder = Template.bind({});
WithTooltipAndPlaceholder.args = {
    tooltip: 'Pick a date',
    tooltipOptions: { position: 'bottom' },
    placeholder: 'MM/DD/YYYY',
    className: 'default-class',
};
