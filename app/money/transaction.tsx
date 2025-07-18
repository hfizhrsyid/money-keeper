import React from "react";
import InputMoney from "./inputMoney"

type InputMoneyProps = {
  handleClick: (event: React.FormEvent<HTMLFormElement>) => void;
  nameValue: string;
  inputValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setNameValue: (value: string) => void;
  setIsBorrow: (value: boolean) => void;
  isBorrow: boolean;
};

const Transaction = React.memo(({handleClick, nameValue, inputValue, handleChange, handleNameChange, setNameValue, setIsBorrow, isBorrow}: InputMoneyProps) => {
  
    return (
        <div className="text-center flex-row">
          <InputMoney handleClick={handleClick} nameValue={nameValue} inputValue={inputValue} handleChange={handleChange} handleNameChange={handleNameChange} handleNameSelect={setNameValue} setIsBorrow={setIsBorrow} isBorrow={isBorrow} />
        </div>
    )
})

export default Transaction