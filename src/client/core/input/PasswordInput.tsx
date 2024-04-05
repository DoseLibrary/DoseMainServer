import type { BaseInputProps } from "./BaseInput";
import { BaseInput } from "./BaseInput";

export const PasswordInput = (props: Omit<BaseInputProps, 'type'>) =>
  <BaseInput {...props} type="password" />;