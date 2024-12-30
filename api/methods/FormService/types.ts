export enum Bank {
    TD,
    BMO
}

export type Transaction = {
    date: Date,
    description: string,
    amount: number,
    total_balance: number
}

export type ScopedTransactions = {
    bank: Bank,
    account: string
    transactions: Transaction[]
}
