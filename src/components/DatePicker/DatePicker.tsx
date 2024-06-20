import React, { FC } from 'react';
import { Calendar, CalendarBaseProps } from 'primereact/calendar';
import { TooltipOptions } from 'primereact/tooltip/tooltipoptions';
import { useTranslation } from 'react-i18next';

export interface DatePickerProps extends CalendarBaseProps {
    className?: string,
    inputId?: string,
    inputClassName?: string,
    label?: string;
    disabled?: boolean;
    invalid?: boolean;
    size?: 'sm' | 'md' | 'lg';
    helpText?: string | any,
    tooltip?: string | any;
    tooltipOptions?: TooltipOptions;
    unstyled?: boolean;
    validateOnly?: boolean;
    value?: Date;
    variant?: 'filled' | 'outlined';
    name: string;
}

const DateField: FC<DatePickerProps> = ({
    disabled = false,
    invalid = false,
    label,
    size,
    tooltip,
    tooltipOptions,
    unstyled = false,
    validateOnly = false,
    value,
    variant = 'outlined',
    className = '',
    helpText,
    ...props
}) => {
    const { t } = useTranslation();
    return (
        <div className={label ? 'flex flex-column gap-1 ' : ''}>
            {label ? <label className='mt-2'>{t(label)}</label> : ''}
            <Calendar
                inputId="fn-date-picker"
                className={`${className}`}
                inputClassName={`p-inputtext-${size}`}
                tooltip={t(tooltip)}
                tooltipOptions={tooltipOptions}
                variant={variant}
                invalid={invalid}
                disabled={disabled}
                unstyled={unstyled}
                value={value}
                {...props}
            />
            {helpText ?
                <small className='text-red-400'>
                    {t(helpText)}
                </small>
                : ''}
        </div>
    );
};

export default DateField;
