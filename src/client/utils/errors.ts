export const rejectWithValueToString = (value: any): string => {
  if (!value) return 'Unknown error';
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value.message && typeof value.message === 'string') return value.message;
  return JSON.stringify(value);
}