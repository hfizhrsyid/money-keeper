import React, { useState, useRef, useEffect, type CSSProperties } from "react";

interface SegmentedToggleProps {
  optionA: string;
  optionB: string;
  onChange?: (value: string) => void;
}

const SegmentedToggle = ({
  optionA,
  optionB,
  onChange,
}: SegmentedToggleProps) => {
  const [selected, setSelected] = useState<string>(optionA);
  const [highlightStyle, setHighlightStyle] = useState<CSSProperties>({});
  const optionARef = useRef<HTMLButtonElement>(null);
  const optionBRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const currentRef =
      selected === optionA ? optionARef.current : optionBRef.current;

    if (currentRef) {
      setHighlightStyle({
        width: `${currentRef.offsetWidth}px`,
        left: `${currentRef.offsetLeft}px`,
      });
    }

    if (onChange) onChange(selected);
  }, [selected, optionA, optionB, onChange]);

  return (
    <div className="relative inline-flex border rounded-full bg-gray-200 p-1">
      {/* Sliding highlight */}
      <span
        className="absolute top-1 bottom-1 rounded-full bg-white shadow transition-all duration-300"
        style={highlightStyle}
      ></span>

      <button
        type="button"
        ref={optionARef}
        onClick={() => setSelected(optionA)}
        className={`relative z-10 px-4 py-1 rounded-full transition-colors duration-300 ${
          selected === optionA ? "text-blue-900" : "text-gray-500"
        }`}
      >
        {optionA}
      </button>

      <button
        type="button"
        ref={optionBRef}
        onClick={() => setSelected(optionB)}
        className={`relative z-10 px-4 py-1 rounded-full transition-colors duration-300 ${
          selected === optionB ? "text-pink-700" : "text-gray-500"
        }`}
      >
        {optionB}
      </button>
    </div>
  );
}

// const TypeOfTransaction = () => {
//   return (
//     <div className="relative inline-flex border rounded-full bg-gray-200 p-1">
//       <span className="absolute top-1 bottom-1 rounded-full bg-white shadow transition-all duration-300"></span>
//     </div>
//   )
// }


type InputMoneyProps = {
  handleClick: (event: React.FormEvent<HTMLFormElement>) => void;
  nameValue: string;
  inputValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNameSelect: (value: string) => void;
};

const InputMoney = ({ handleClick, nameValue, inputValue, handleChange, handleNameChange, handleNameSelect }: InputMoneyProps) => {
    const formatted = new Intl.NumberFormat("id-ID").format(Number(inputValue || 0));
    return (
        <form onSubmit={handleClick} className="flex-row justify-center align-items">
            <h1>Sebagai siapakah anda?</h1>
            {/* <input value={nameValue} type="text" onChange={handleNameChange} className="text-2xl" /> */}
            
            <SegmentedToggle
                optionA="Hafizh"
                optionB="Wini"
                onChange={handleNameSelect}
            />

            {/* <TypeOfTransaction /> */}

            <p>Masukkan Uang</p>
            <div className="relative w-full max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                Rp
            </span>
            <input
                value={formatted}
                type="text"
                onChange={handleChange}
                className="pl-10 pr-4 py-2 w-full text-2xl rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
            />
            </div>

            <button type="submit" className="btn">Press</button>
        </form>
    )
}

export default InputMoney