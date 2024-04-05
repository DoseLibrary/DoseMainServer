import type { BaseInputProps } from "./BaseInput";
import { BaseInput } from "./BaseInput";

export const TextInput = (props: Omit<BaseInputProps, 'type'>) =>
  <BaseInput {...props} type="text" />;