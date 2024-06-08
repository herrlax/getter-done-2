import React from 'react';
import { CHECKBOX_WRAP } from './styles';

type Props = {
  checked?: boolean;
  onChange: (checked: boolean) => void;
  name: string;
};

const Checkbox: React.FC<Props> = React.memo(({ checked, onChange, name }) => {
  return (
    <div className="w-4 h-4 relative mr-1 focus:outline-none focus:shadow-none">
      <input
        className="opacity-0"
        data-reach-custom-checkbox-input
        type="checkbox"
        value={name}
        name={name}
        checked={checked}
        onChange={(event) => {
          onChange(event.target.checked);
        }}
      />
      <span
        className={`absolute left-0 top-0 rounded-[50%] border border-slate-700 ${
          checked ? 'bg-green-700' : 'bg-gray-300'
        } cursor-pointer h-3 w-3 transition-colors after:absolute after:left-[2px] after:top-[2px] after:content-[''] ${
          checked ? 'after:opacity-1' : 'after:opacity-0'
        } after:border-l-[2px] after:border-b-[2px] after:border-white after:h-1 after:w-2 after:transition-opacity after:-rotate-45`}
      />
    </div>
  );
});

export default Checkbox;
