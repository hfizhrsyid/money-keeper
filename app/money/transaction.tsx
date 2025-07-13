import InputMoney from "./inputMoney"

type InputMoneyProps = {
  handleClick: (event: React.FormEvent<HTMLFormElement>) => void;
  nameValue: string;
  inputValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setNameValue: (value: string) => void;
};

const Transaction = ({handleClick, nameValue, inputValue, handleChange, handleNameChange, setNameValue}: InputMoneyProps) => {
  
    return (
        <div className="text-center">
          <InputMoney handleClick={handleClick} nameValue={nameValue} inputValue={inputValue} handleChange={handleChange} handleNameChange={handleNameChange} handleNameSelect={setNameValue} />
        </div>
    )
}

export default Transaction