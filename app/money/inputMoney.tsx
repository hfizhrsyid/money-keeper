type InputMoneyProps = {
  handleClick: (event: React.FormEvent<HTMLFormElement>) => void;
  nameValue: string;
  inputValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputMoney = ({ handleClick, nameValue, inputValue, handleChange, handleNameChange }: InputMoneyProps) => {
    return (
        <form onSubmit={handleClick} className="text-center">
            <h1>Sebagai siapakah anda?</h1>
            <input value={nameValue} type="text" onChange={handleNameChange} className="text-2xl" />
            <p>Masukkan uang</p>
            <p>Rp <input value={inputValue} type="text" onChange={handleChange} className="text-2xl" /></p>
            <button type="submit">Press</button>
        </form>
    )
}

export default InputMoney