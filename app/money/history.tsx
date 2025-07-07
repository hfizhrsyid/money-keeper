type Transaction = {
    name: string,
    money: number
}

type historyProps = {
    newHistory: Transaction[]
}

const History = ({ newHistory }: historyProps)  => {
    return (
        <div className="my-10 flex-row max-w-120 mx-auto">
            <h2 className="font-bold text-2xl">History</h2>
            {newHistory.map(his => <p key={his.name}>{his.name} & Rp{his.money.toLocaleString("id-ID")}</p>)}
        </div>
    )
}

export default History