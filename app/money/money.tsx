import React, { useCallback, useEffect, useMemo, useState } from "react";
import History from "./history";
import InputMoney from "./inputMoney";
import Transaction from "./transaction";
import historyService from "../services/history";
import personService from "../services/person";

function Money() {
    const [nameValue, setNameValue] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [showTransaction, setShowTransaction] = useState(false)
    const [history, setHistory] = useState<any[]>([])
    const [isBorrow, setIsBorrow] = useState(false)
    type Person = { id: string; name: string; transactionMade: number, balance: number };
    const [person, setPerson] = useState<Person[]>([])
    
    useEffect(() => {
        historyService.getHistory().then(res => {
            console.log(res.data)
            setHistory(res.data.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()))
        })
        .catch(err => {
            console.error(err);
            alert('Failed to fetch history.');
        });

        personService
            .getPerson()
            .then(res => {
                setPerson(res.data)
            })
            .catch(err => {
                console.log(err.message)
                alert('Failed to fetch person')
            })
        console.log(person)
    }, [])

    const money = useMemo(() => {
        return history.reduce((accumulator: number, item: any) => accumulator + Number(item.money), 0)
    }, [history])

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        // Remove all non-digits
        const rawValue = event.target.value.replace(/\D/g, "");
        setInputValue(rawValue);
    }, [])

    const handleNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setNameValue(event.target.value)
    }, [])

    const handleClick = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let num = Number(inputValue)
        
        if(isBorrow) {
            num = Number(inputValue) * -1
        }

        const name = nameValue;
        if (isNaN(num)) {
            window.alert('Number contains a string!');
        } else if (num === 0) {
            window.alert('Number is 0');
        } else {
            
            historyService.postTransaction(name, num)
                .then((res: any) => {
                    setHistory(prevHistory => [res.data, ...prevHistory])
                    const foundPerson = person.find((p: any) => p.name === name)
                    console.log(foundPerson)
                    if (foundPerson && foundPerson.id) {
                        personService.patchTransaction(foundPerson.id, res.data)
                    }
                })
                .catch((error: any) => {
                    console.log(error.message)
                    alert('Failed to post Transaction')
                })
        }
        setInputValue("");
    }, [inputValue, isBorrow, nameValue])
    
    return (
        <div className="justify-center text-center flex-row mt-1">
            <div className="text-center text-6xl gap-64">
                <h3 className="text-4xl">Money owed by</h3>
                <h1>Rp{money ? money.toLocaleString("id-ID") : '0'}</h1>
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
                        setNameValue={setNameValue}
                        setIsBorrow={setIsBorrow}
                        isBorrow={isBorrow}
                    />
                    </div>
                </div>
                )}

            <History newHistory={history} />
        </div>
    )
}

export default Money