import { useSelector } from 'react-redux';
import WalletCard from './WalletCard';
import { selectWalletData } from '../../../redux/selectors';
import TransactionItem from '../../transactions/TransactionItem';



const WalletTab = () => {
  const walletData = useSelector(selectWalletData);

  return (
    <div className="py-6 px-4">
      <WalletCard 
        tier={walletData.tier}
        balance={walletData.balance}
        vinSearches={walletData.vinSearches}
        vinSearchLimit={walletData.vinSearchLimit}
      />
      
      <div className="max-w-md mx-auto">
        <h3 className="text-md font-medium mb-6 border-black border-b-2 text-black w-44">
          Recent Transactions
        </h3>
        
        <div className="max-w-md">
          {walletData.transactions.map(transaction => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletTab;