import React, { useEffect, useState } from "react";
import History from "./history";
import InputMoney from "./inputMoney";
import Transaction from "./transaction";
import moneyService from "../services/money";
import historyService from "../services/history";

function Money() {
    const [money, setMoney] = useState(0)
    const [nameValue, setNameValue] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [showTransaction, setShowTransaction] = useState(false)
    const [history, setHistory] = useState([])
    
    useEffect(() => {
        historyService.getHistory().then(res => {
            console.log(res.data)
            setHistory(res.data)
            
            const totalMoney = res.data.reduce((accumulator: number, item: any) => accumulator + item.money, 0)
            setMoney(totalMoney);
        })

    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameValue(event.target.value)
    }

    const handleClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const num = Number(inputValue);
        const name = nameValue;
        if (isNaN(num)) {
            window.alert('Number contains a string!');
        } else if (num === 0) {
            window.alert('Number is 0');
        } else {
            historyService.postTransaction(name, num).then(res => {
                setHistory(history.concat(res.data))
            })
        }
        setInputValue("");
    }

    return (
        <div className="justify-center flex-row mt-1">
            <div className="text-center text-6xl gap-96">
                <h3 className="text-4xl">Money owed by</h3>
                <h1>Rp{money.toLocaleString("id-ID")}</h1>
            </div>

            <div className="flex justify-center">
                <button className="bg-green-200 p-2 rounded-md btn text-green-800 border-green-800" onClick={() => setShowTransaction(true)}>Add a transaction</button>
            </div>

            {showTransaction && (
                <div className="fixed inset-0 bg-opacity-40 bg-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg relative">
                    <button
                        className="absolute top-2 right-2 text-xl"
                        onClick={() => setShowTransaction(false)}
                    >
                        &times;
                    </button>
                    <Transaction
                        handleClick={handleClick}
                        nameValue={nameValue}
                        inputValue={inputValue}
                        handleChange={handleChange}
                        handleNameChange={handleNameChange}
                    />
                    </div>
                </div>
                )}

            <History newHistory={history} />
        </div>
    )
}

export default Money