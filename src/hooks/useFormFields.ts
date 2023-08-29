import { ChangeEvent, useState } from 'react';

export default function useFormFields<T extends object, Keys extends keyof T>(
  values: T,
): [T, (key: Keys) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => void] {
  const [value, setValue] = useState<T>(values);
  const setState = (key: Keys) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => {
    let changedValue: string | null | ChangeEvent = null;
    if (typeof e === 'string') {
      changedValue = e;
    } else {
      changedValue = e.target.value;
    }
    setValue(prev => ({ ...prev, [key]: changedValue }));
  };
  return [value, setState];
}
