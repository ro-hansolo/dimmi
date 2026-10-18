import React from "react";
import SelectComponent from "react-select";
import CreatableSelect from "react-select/creatable";
import type {
  ActionMeta,
  Props as ReactSelectProps,
  SingleValue,
  StylesConfig,
} from "react-select";

export type SelectOption = {
  value: string;
  label: string;
  isDisabled?: boolean;
};

type BaseProps = {
  value: string | null;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  isClearable?: boolean;
  onChange: (value: string | null, action: ActionMeta<SelectOption>) => void;
  onBlur?: () => void;
  className?: string;
  formatCreateLabel?: (input: string) => string;
};

type CreatableProps = {
  isCreatable: true;
  onCreateOption: (value: string) => void;
};

type NonCreatableProps = {
  isCreatable?: false;
  onCreateOption?: never;
};

export type SelectProps = BaseProps & (CreatableProps | NonCreatableProps);

// Dimmi: macOS pop-up/combo box look on the shared theme tokens.
const baseBackground = "var(--color-chip)";
const hoverBackground =
  "color-mix(in srgb, var(--color-accent) 12%, transparent)";
const focusBackground =
  "color-mix(in srgb, var(--color-accent) 20%, transparent)";
const neutralBorder = "var(--color-separator)";

const selectStyles: StylesConfig<SelectOption, false> = {
  control: (base, state) => ({
    ...base,
    minHeight: 26,
    borderRadius: 6,
    borderWidth: 0,
    boxShadow: state.isFocused
      ? "0 0 0 3px color-mix(in srgb, var(--color-accent) 40%, transparent)"
      : `0 0 0 0.5px ${neutralBorder}, 0 0.5px 1.5px rgba(0, 0, 0, 0.1)`,
    backgroundColor: baseBackground,
    fontSize: "13px",
    color: "var(--color-text)",
    transition: "box-shadow 150ms ease",
  }),
  valueContainer: (base) => ({
    ...base,
    paddingInline: 8,
    paddingBlock: 0,
  }),
  input: (base) => ({
    ...base,
    color: "var(--color-text)",
  }),
  singleValue: (base) => ({
    ...base,
    color: "var(--color-text)",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: 4,
    color: "var(--color-secondary)",
    ":hover": {
      color: "var(--color-text)",
    },
  }),
  clearIndicator: (base) => ({
    ...base,
    padding: 4,
    color: "var(--color-secondary)",
    ":hover": {
      color: "var(--color-text)",
    },
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 30,
    backgroundColor: "var(--color-card)",
    color: "var(--color-text)",
    borderRadius: 8,
    padding: 0,
    boxShadow:
      "0 0 0 0.5px rgba(0, 0, 0, 0.18), 0 10px 30px rgba(0, 0, 0, 0.2)",
  }),
  menuList: (base) => ({
    ...base,
    padding: 5,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused
      ? "var(--color-accent)"
      : state.isSelected
        ? focusBackground
        : "transparent",
    color: state.isFocused ? "#fff" : "var(--color-text)",
    fontSize: "13px",
    borderRadius: 5,
    paddingBlock: 3,
    paddingInline: 10,
    cursor: state.isDisabled ? "not-allowed" : base.cursor,
    opacity: state.isDisabled ? 0.5 : 1,
  }),
  placeholder: (base) => ({
    ...base,
    color: "var(--color-secondary)",
  }),
};

export const Select: React.FC<SelectProps> = React.memo(
  ({
    value,
    options,
    placeholder,
    disabled,
    isLoading,
    isClearable = true,
    onChange,
    onBlur,
    className = "",
    isCreatable,
    formatCreateLabel,
    onCreateOption,
  }) => {
    const selectValue = React.useMemo(() => {
      if (!value) return null;
      const existing = options.find((option) => option.value === value);
      if (existing) return existing;
      return { value, label: value, isDisabled: false };
    }, [value, options]);

    const handleChange = (
      option: SingleValue<SelectOption>,
      action: ActionMeta<SelectOption>,
    ) => {
      onChange(option?.value ?? null, action);
    };

    const sharedProps: Partial<ReactSelectProps<SelectOption, false>> = {
      className,
      classNamePrefix: "app-select",
      value: selectValue,
      options,
      onChange: handleChange,
      placeholder,
      isDisabled: disabled,
      isLoading,
      onBlur,
      isClearable,
      styles: selectStyles,
    };

    if (isCreatable) {
      return (
        <CreatableSelect<SelectOption, false>
          {...sharedProps}
          onCreateOption={onCreateOption}
          formatCreateLabel={formatCreateLabel}
        />
      );
    }

    return <SelectComponent<SelectOption, false> {...sharedProps} />;
  },
);

Select.displayName = "Select";
