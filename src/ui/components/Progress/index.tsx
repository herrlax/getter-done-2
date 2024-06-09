import React from 'react';

type Props = {
  progress: number;
};

const Progress: React.FC<Props> = ({ progress }) => {
  return (
    <div className="relative flex items-center justify-center w-8 h-8">
      <svg
        viewBox="-5 -25 10 50"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute w-14 h-14 -rotate-90"
      >
        <circle
          cx="0" // start x
          cy="0" // start y
          r="15" // radius
          fill="none"
          strokeWidth="3"
          className="stroke-moss animate-fill-circle [stroke-linecap:round]"
          style={{ '--percentage': progress * 100 } as any}
        />
      </svg>
      {progress === 1 && (
        <svg
          width="32px"
          height="16px"
          viewBox="0 -8 14 12"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-[6px] left-[1px]"
        >
          <polyline
            points="1 0 1 5 13 5"
            strokeWidth="2"
            fill="none"
            className="stroke-day -rotate-45 animate-fill-check"
            style={{ '--percentage': 100 } as any}
          />
        </svg>
      )}
      {progress !== 1 && (
        <span className="animate-fade-in-late text-xs">
          {Math.round(progress * 100)}%
        </span>
      )}
    </div>
  );
};

export default Progress;
