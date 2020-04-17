import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const balance = this.transactionsRepository.getBalance();
    if (type === 'outcome' && balance.total < value) {
      throw Error('insufficient Funds');
    }
    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
