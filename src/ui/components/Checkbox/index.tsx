import React from 'react';

type Props = {
  checked?: boolean;
  onChange: (checked: boolean) => void;
  name: string;
};

const Checkbox: React.FC<Props> = React.memo(({ checked, onChange, name }) => {
  return (
    <div className="w-4 h-4 relative mr-1">
      <input
        className="opacity-0 [&:focus+span]:border-day"
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
        className={`h-3 w-3 absolute left-0 top-0 border border-teal rounded-[50%] cursor-pointer transition-all 
        ${checked ? 'bg-teal' : 'bg-night'} 
        hover:border-day
        after:absolute after:left-[2px] after:top-[2px] after:content-[''] after:border-l-[2px] after:border-b-[2px] after:border-white after:h-1 after:w-2 after:transition-all after:-rotate-45 
        ${checked ? 'after:opacity-1' : 'after:opacity-0'}`}
      />
    </div>
  );
});

export default Checkbox;
