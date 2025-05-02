import { Transaction } from "../../types";


interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  return (
    <div className="flex justify-between items-center p-6 border-b bg-gray-50 rounded-lg mb-4">
      <div>
        <h4 className="font-medium">{transaction.type}</h4>
        <div className="text-gray-500 text-sm">
          {transaction.amount} • {transaction.date}
        </div>
      </div>
      <div>
        {transaction.status === 'Successful' ? (
          <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
            • Successful
          </span>
        ) : (
          <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">
            • Failed
          </span>
        )}
      </div>
    </div>
  );
};

export default TransactionItem;