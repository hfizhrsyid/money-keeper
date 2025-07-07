type InputMoneyProps = {
  handleClick: (event: React.FormEvent<HTMLFormElement>) => void;
  inputValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputMoney = ({ handleClick, inputValue, handleChange }: InputMoneyProps) => {
    return (
        <form onSubmit={handleClick} className="text-center">
            <p>Masukkan uang</p>
            <p>Rp <input value={inputValue} type="text" onChange={handleChange} className="text-2xl" /></p>
            <button type="submit">Press</button>
        </form>
    )
}

export default InputMoney