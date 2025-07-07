import InputMoney from "./inputMoney"

type InputMoneyProps = {
  handleClick: (event: React.FormEvent<HTMLFormElement>) => void;
  inputValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Transaction = ({handleClick, inputValue, handleChange}: InputMoneyProps) => {
    return (
        <div className="text-center">
                <h1>Sebagai siapakah anda?</h1>
                <InputMoney handleClick={handleClick} inputValue={inputValue} handleChange={handleChange} />
        </div>
    )
}

export default Transaction