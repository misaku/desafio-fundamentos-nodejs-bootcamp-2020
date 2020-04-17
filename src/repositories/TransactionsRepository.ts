import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  public getBalance(): Balance {
    let data: Balance = { income: 0, outcome: 0, total: 0 };
    if (this.transactions.length > 0)
      data = this.transactions
        .map(transaction => {
          const balance: Balance = {
            income: 0,
            outcome: 0,
            total: 0,
          };
          if (transaction.type === 'income') {
            balance.income = transaction.value;
          } else {
            balance.outcome = transaction.value;
          }
          return balance;
        })
        .reduce((accumulator, currentValue) => {
          accumulator.income += currentValue.income;
          accumulator.outcome += currentValue.outcome;
          accumulator.total = accumulator.income - accumulator.outcome;
          return accumulator;
        });
    return data;
  }

  public create({ type, value, title }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ type, value, title });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
