
import React from 'react';
import { 
  Slider 
} from "@/components/ui/slider";
import { 
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface SliderInputProps {
  control: any;
  name: string;
  label: string;
  description?: string;
  min: number;
  max: number;
  step: number;
  formatDisplay?: (value: number) => string;
  unit?: string;
}

const SliderInput = ({
  control,
  name,
  label,
  description,
  min,
  max,
  step,
  formatDisplay,
  unit
}: SliderInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-4">
          <div className="flex justify-between items-center">
            <FormLabel className="text-base">{label}</FormLabel>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={field.value}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (isNaN(value)) {
                    field.onChange(min);
                  } else {
                    field.onChange(Math.min(Math.max(value, min), max));
                  }
                }}
                className="w-24 text-right"
              />
              {unit && <span className="text-sm text-gray-500">{unit}</span>}
            </div>
          </div>
          <FormControl>
            <Slider
              min={min}
              max={max}
              step={step}
              value={[field.value]}
              onValueChange={([value]) => field.onChange(value)}
              className="cursor-pointer"
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <div className="flex justify-between text-xs text-gray-500">
            <span>{formatDisplay ? formatDisplay(min) : min}{unit}</span>
            <span>{formatDisplay ? formatDisplay(max) : max}{unit}</span>
          </div>
        </FormItem>
      )}
    />
  );
};

export default SliderInput;
