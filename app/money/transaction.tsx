import InputMoney from "./inputMoney"

type InputMoneyProps = {
  handleClick: (event: React.FormEvent<HTMLFormElement>) => void;
  nameValue: string;
  inputValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Transaction = ({handleClick, nameValue, inputValue, handleChange, handleNameChange}: InputMoneyProps) => {
    return (
        <div className="text-center">
          <InputMoney handleClick={handleClick} nameValue={nameValue} inputValue={inputValue} handleChange={handleChange} handleNameChange={handleNameChange} />
        </div>
    )
}

export default Transaction