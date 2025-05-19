
type InputProps = {
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password";
};

export const Input = ({ label, placeholder, onChange, type = "text" }: InputProps) => {
  return (
    <div>
        <div className="text-sm pb-2 pt-2"> *<label >{label}</label></div>
      <input className="border rounded px-4 py-2 w-full border-black" type={type} placeholder={placeholder} onChange={onChange}></input>
    </div>
  );
};
