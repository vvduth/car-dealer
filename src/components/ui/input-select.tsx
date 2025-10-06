import type { FilterOptions } from "@/config/types";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import type { NumericFormatProps } from "react-number-format";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { NumberInput } from "./number-input";


interface InputSelectProps extends NumericFormatProps {
	inputName: string;
	selectName: string;
	label?: string;
	options: FilterOptions<string, string>;
	prefix?: string;
}
const InputSelect = (props: InputSelectProps) => {
  const { inputName, selectName, label, options, prefix, ...numberInputProps } =
		props;

	const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={inputName}
      render={({ field: { onChange, ...rest } }) => (
        <FormItem className="grid gap-2">
          {label && <FormLabel htmlFor={inputName}>{label}</FormLabel>}
          <FormControl>
            <div className="flex items-center rounded-md border border-input focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] h-10 py-2">
              <NumberInput
                className="flex-grow border-none focus:outline-none focus:ring-0 text-white min-w-0"
                onValueChange={(values) => {
                  onChange(values.floatValue);
                }}
                {...rest}
                {...numberInputProps}
              />
              <div className="border-l border-l-input h-full">
                <FormField
                  control={form.control}
                  name={selectName}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <select
                          className={cn(
                            "custom-select appearance-none bg-transparent pl-3 pr-8 text-white focus:outline-none"
                          )}
                          {...field}
                        >
                          {options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default InputSelect
