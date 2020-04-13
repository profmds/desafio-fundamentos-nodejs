import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO

    const income = this.transactions.reduce((result, transaction) => {
      if (transaction.type === 'income') return result + transaction.value;

      return result;
    }, 0);
    const outcome = this.transactions.reduce((result, transaction) => {
      if (transaction.type === 'outcome') return result + transaction.value;

      return result;
    }, 0);

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    // inicialmente foi criada um DTO para a transferência de objetos no formato desestruturado
    // um novo objeto de transação é criado e recebe os valores passados pelo DTO no services das transictions
    const transaction = new Transaction({ title, value, type });
    // a nova transação é então adicionada ao array de transações
    this.transactions.push(transaction);
    // por fim a transação é retornada ao services
    return transaction;
  }
}

export default TransactionsRepository;
