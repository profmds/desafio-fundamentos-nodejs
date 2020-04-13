import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

/* function validateRepositoryId(request, response, next){
  const { id } = request.params;

  if(!isUuid(id)){
    return response.status(400).json({ error: 'Invalid repository ID.'});
  }
  return next();
} */

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();
    const printTransaction = {
      transactions,
      balance,
    };

    return response.json(printTransaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // recebendo os parâmetros do front
    const { title, value, type } = request.body;

    // criando o objeto de criação da transaçãod com o conceito de Dependency Invertion
    // para que sempre a lista de transações abertas e não novas criadas
    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    // chamada da execução do servço para que os dados da transação sejam deveras adicionado
    // no array de transações, para que o principío de cada arquivo realizar apenas seu papel
    // manipulações de dados serão enviadas aos serviços, porém adicionadas através do repositório
    const transaction = createTransaction.execute({
      title,
      value,
      type,
    });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
