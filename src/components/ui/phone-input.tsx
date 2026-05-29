import { CheckIcon, ChevronsUpDown, Globe } from "lucide-react";
import * as React from "react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { Metadata, formatIncompletePhoneNumber } from "libphonenumber-js";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type PhoneInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value" | "size"
> &
  Omit<React.ComponentProps<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
  };

const countryMetadataCache = new Map<RPNInput.Country, Metadata>();

const getCountryMetadata = (country?: RPNInput.Country) => {
  if (!country) return undefined;
  const cached = countryMetadataCache.get(country);
  if (cached) return cached;
  const metadata = new Metadata();
  metadata.selectNumberingPlan(country);
  countryMetadataCache.set(country, metadata);
  return metadata;
};

const COUNTRY_MAX_DIGITS_OVERRIDE: Partial<Record<RPNInput.Country, number>> = {
  IN: 10,
  AE: 9,
  DE: 11,
  CN: 11,
  BR: 11,
  RU: 10,
  JP: 10,
  ID: 12,
  PH: 10,
  NG: 10,
  PK: 10,
  BD: 10,
  EG: 10,
  AR: 10,
  MX: 10,
};

const getNationalDigitLimit = (country?: RPNInput.Country) => {
  if (!country) return 15;
  const override = COUNTRY_MAX_DIGITS_OVERRIDE[country];
  if (override !== undefined) return override;

  const possible = getCountryMetadata(country)?.numberingPlan?.possibleLengths() ?? [];
  const positive = possible.filter((n) => n > 0);
  return positive.length > 0 ? Math.max(...positive) : 15;
};

const getFormattedMaxLength = (country?: RPNInput.Country) => {
  if (!country) return 25;
  const nationalLimit = getNationalDigitLimit(country);
  try {
    const callingCode = RPNInput.getCountryCallingCode(country);
    return formatIncompletePhoneNumber(`+${callingCode}${"9".repeat(nationalLimit)}`, country)
      .length;
  } catch {
    return nationalLimit + 6;
  }
};

const normalizeDigits = (str: string): string => {
  return str.replace(/[\uFF10-\uFF19]/g, (char) =>
    String.fromCharCode(char.charCodeAt(0) - 0xff10 + 0x30)
  );
};

const sanitizePhoneInput = (raw: string): string => {
  const normalized = normalizeDigits(raw);
  return normalized.replace(/[^\d+\s\-()]/g, "");
};

const PhoneInput = React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
  ({ className, onChange, defaultCountry, ...props }, ref) => {
    const [prevDefaultCountry, setPrevDefaultCountry] = React.useState<
      RPNInput.Country | undefined
    >((defaultCountry as RPNInput.Country) || undefined);
    const [currentCountry, setCurrentCountry] = React.useState<RPNInput.Country | undefined>(
      (defaultCountry as RPNInput.Country) || undefined
    );

    if (defaultCountry !== prevDefaultCountry) {
      setPrevDefaultCountry((defaultCountry as RPNInput.Country) || undefined);
      setCurrentCountry((defaultCountry as RPNInput.Country) || undefined);
    }

    const selectedCountry = currentCountry ?? (defaultCountry as RPNInput.Country | undefined);
    const maxLength = React.useMemo(
      () => getFormattedMaxLength(selectedCountry),
      [selectedCountry]
    );
    const nationalDigitLimit = React.useMemo(
      () => getNationalDigitLimit(selectedCountry),
      [selectedCountry]
    );

    const handleChange = React.useCallback(
      (value?: RPNInput.Value) => {
        if (!value || !selectedCountry) {
          onChange?.((value || "") as RPNInput.Value);
          return;
        }

        const rawDigits = value.replace(/\D/g, "");
        const callingCode = (() => {
          try {
            return RPNInput.getCountryCallingCode(selectedCountry);
          } catch {
            return "";
          }
        })();

        const ccLength = callingCode.length;
        const nationalDigits = rawDigits.startsWith(callingCode)
          ? rawDigits.slice(ccLength)
          : rawDigits;

        if (nationalDigits.length > nationalDigitLimit) {
          const trimmedNational = nationalDigits.slice(0, nationalDigitLimit);
          const trimmedValue = `+${callingCode}${trimmedNational}` as RPNInput.Value;
          onChange?.(trimmedValue);
          return;
        }

        onChange?.((value || "") as RPNInput.Value);
      },
      [onChange, selectedCountry, nationalDigitLimit]
    );

    return (
      <RPNInput.default
        ref={ref}
        className={cn(
          "relative flex w-full h-[46px] rounded-[10px] border border-line bg-white focus-within:ring-2 focus-within:ring-brand/50 focus-within:border-brand transition-all [&>.PhoneInputCountry]:flex [&>.PhoneInputCountry]:h-full [&>.PhoneInputCountry]:shrink-0",
          className
        )}
        flagComponent={FlagComponent}
        countrySelectComponent={CountrySelect}
        inputComponent={PhoneInputField}
        limitMaxLength
        maxLength={maxLength}
        onCountryChange={(c) => setCurrentCountry(c)}
        onChange={handleChange}
        defaultCountry={defaultCountry}
        {...props}
      />
    );
  }
);
PhoneInput.displayName = "PhoneInput";

const PhoneInputField = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, onPaste, onChange, maxLength, ...props }, ref) => {
  const handlePaste = React.useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text/plain");
      const sanitized = sanitizePhoneInput(pasted);
      const digitsOnly = sanitized.replace(/\D/g, "");
      const trimmed = maxLength ? digitsOnly.slice(0, Number(maxLength)) : digitsOnly;

      if (document.queryCommandSupported?.("insertText")) {
        document.execCommand("insertText", false, trimmed);
      } else {
        const input = e.currentTarget;
        const start = input.selectionStart ?? 0;
        const end = input.selectionEnd ?? 0;
        const currentVal = input.value;
        const newVal = currentVal.slice(0, start) + trimmed + currentVal.slice(end);
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        )?.set;
        nativeInputValueSetter?.call(input, newVal);
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }

      onPaste?.(e);
    },
    [onPaste, maxLength]
  );

  return (
    <Input
      inputMode="tel"
      autoComplete="tel"
      className={cn(
        "rounded-e-[10px] rounded-s-none w-full border-none shadow-none h-full bg-white text-ink px-3.25 py-2.75 text-[14px] font-sans focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none",
        className
      )}
      maxLength={maxLength}
      onPaste={handlePaste}
      onChange={onChange}
      {...props}
      ref={ref}
    />
  );
});
PhoneInputField.displayName = "PhoneInputField";

type CountrySelectOption = { label: string; value: RPNInput.Country };
type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  onChange: (value: RPNInput.Country) => void;
  options: CountrySelectOption[];
};

const CountrySelect = ({ disabled, value, onChange, options }: CountrySelectProps) => {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleSelect = React.useCallback(
    (country: RPNInput.Country) => {
      onChange(country);
      setOpen(false);
    },
    [onChange]
  );

  React.useEffect(() => {
    const handleActivity = (event: Event) => {
      if (event.type === "mousedown") {
        const mouseEvent = event as MouseEvent;
        if (containerRef.current && !containerRef.current.contains(mouseEvent.target as Node)) {
          setOpen(false);
        }
      } else if (event.type === "scroll") {
        if (containerRef.current && containerRef.current.contains(event.target as Node)) {
          return;
        }
        setOpen(false);
      } else {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleActivity);
      window.addEventListener("scroll", handleActivity, { capture: true, passive: true });
      window.addEventListener("resize", handleActivity);
    }
    return () => {
      document.removeEventListener("mousedown", handleActivity);
      window.removeEventListener("scroll", handleActivity, { capture: true });
      window.removeEventListener("resize", handleActivity);
    };
  }, [open]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const countryFilter = React.useCallback((value: string, search: string) => {
    if (!search) return 1;
    const normalizedSearch = search.toLowerCase().trim();
    const normalizedValue = value.toLowerCase();
    if (normalizedValue.startsWith(normalizedSearch)) return 1;
    if (normalizedValue.includes(normalizedSearch)) return 0.5;
    return 0;
  }, []);

  return (
    <div className="flex items-center h-full" ref={containerRef}>
      <Button
        type="button"
        variant="none"
        className={cn(
          "flex items-center gap-1.5 rounded-e-none rounded-s-[10px] px-3 h-full min-w-[60px] bg-paper border-r border-line hover:bg-paper-2 transition-colors cursor-pointer focus:outline-none"
        )}
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Select country"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <FlagComponent country={value} countryName={value} />
        <ChevronsUpDown
          className={cn(
            "size-3.5 opacity-50 text-ink-3 shrink-0",
            disabled ? "hidden" : "opacity-100"
          )}
        />
      </Button>

      {open && (
        <div
          className="absolute top-[calc(100%+4px)] left-0 w-full z-[9999] bg-white shadow-xl border border-line rounded-xl p-0 overflow-hidden animate-in fade-in-50 slide-in-from-top-1 duration-150 overscroll-contain"
          role="listbox"
          aria-label="Country list"
        >
          <Command className="overscroll-contain" filter={countryFilter}>
            <CommandInput placeholder="Search coutry..." />
            <CommandList className="max-h-[180px] overflow-y-auto overscroll-contain">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {options
                  .filter((x) => x.value)
                  .map((option) => (
                    <CommandItem
                      className="gap-2 cursor-pointer p-2 hover:bg-paper transition-colors flex items-center"
                      key={option.value || "unknown"}
                      value={option.label}
                      keywords={[
                        option.label,
                        option.value,
                        option.value ? `+${RPNInput.getCountryCallingCode(option.value)}` : "",
                      ]}
                      onSelect={() => handleSelect(option.value)}
                    >
                      <FlagComponent country={option.value} countryName={option.label} />
                      <span className="flex-1 text-sm font-medium">{option.label}</span>
                      {option.value && (
                        <span className="text-ink-4 text-sm font-mono">
                          {`+${RPNInput.getCountryCallingCode(option.value)}`}
                        </span>
                      )}
                      <CheckIcon
                        className={cn(
                          "ml-auto size-4 text-brand",
                          option.value === value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = country ? flags[country] : null;

  return (
    <span className="flex h-5 w-6 items-center justify-center overflow-hidden rounded-[2px] shrink-0">
      {Flag ? <Flag title={countryName} /> : <Globe className="size-4 text-ink-3" />}
    </span>
  );
};

export { PhoneInput };
export default PhoneInput;
