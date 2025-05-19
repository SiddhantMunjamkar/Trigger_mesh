type CheckFeaturesProps = {
  label: string;
};

export const CheckFeatures = ({ label }: CheckFeaturesProps) => {
  return (
    <div className="flex">
      <div className="pr-4">
        <CheckMark />
      </div>
      <div>{label}</div>
    </div>
  );
};

function CheckMark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="size-6"
    >
      <circle cx="12" cy="12" r="10" fill="#0f9d58" />
      <path
        fill="white"
        d="M10 13.172l-2.121-2.121-1.415 1.415L10 16l7-7-1.414-1.414z"
      />
    </svg>
  );
}

