import { cn } from "@/lib/utils";
import type { ChangeEvent, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	value: string;
	options: { label: string; value: string }[];
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	className?: string;
	selectClassName?: string;
	noDefault?: boolean;
}

export const Select = (props: SelectProps) => {
	const {
		label,
		value,
		options,
		onChange,
		className,
		noDefault = true,
		...rest
	} = props;

	return (
    <div className="grid gap-2">
      {label && <label className="text-sm font-medium">{label}</label>}
  		<select
  			onChange={onChange}
  			value={value ?? ""}
  			className={cn(
  				className,
  				"bg-transparent disabled:bg-muted/50 w-full px-3 py-2 border-input border rounded-md focus:outline-hidden custom-select appearance-none pr-12 text-white",
  			)}
  			{...rest}
  		>
  			{noDefault && <option value="">Select</option>}
  			{options.map((option) => (
  				<option key={option.value} value={option.value}>
  					{option.label}
  				</option>
  			))}
  		</select>
    </div>
	);
};