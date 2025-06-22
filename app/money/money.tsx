import React, { useState } from "react";

export function Money() {
    const [money, setMoney] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [isWini, setIsWini] = useState(true);
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const handleClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const num = Number(inputValue);
        if (isNaN(num)) {
            window.alert('Number contains a string!');
        } else if (num === 0) {
            window.alert('Number is 0');
        } else {
            setMoney(money + num);
        }
        setInputValue("");
    }

    return (
        <div className="justify-center flex-row">
            <div className="text-center text-6xl gap-96">
                <h1>Rp{money.toLocaleString("id-ID")}</h1>
            </div>

            <div className="text-center">
                <h1>Sebagai siapakah anda?</h1>
                <label className="relative inline-flex items-center cursor-pointer w-24 h-10">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isWini}
                        onChange={() => setIsWini(!isWini)}
                    />
                    <div className="w-full h-full bg-blue-950 rounded-full peer peer-checked:bg-pink-300 transition-colors"></div>
                    <span className="absolute inset-0 flex items-center justify-center text-base font-bold text-white peer-checked:text-white transition-colors">
                        {isWini ? "Wini" : "Hafizh"}
                    </span>
                </label>
            </div>

            <form onSubmit={handleClick} className="text-center">
                <p>Masukkan uang</p>
                <p>Rp <input value={inputValue} type="text" onChange={handleChange} className="text-2xl" /></p>
                <button type="submit">Press</button>
            </form>

            <div className="my-10 flex border-2 max-w-120 mx-auto border-black">
                <h2 className="font-bold">History</h2>
                {/* map */}
            </div>
        </div>
    )
}