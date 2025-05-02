interface WalletCardProps {
  tier: string;
  balance: string;
  vinSearches: number;
  vinSearchLimit: string;
}

const WalletCard: React.FC<WalletCardProps> = ({ 
  tier, 
  balance, 
  vinSearches, 
  vinSearchLimit 
}) => {
  return (
    <div className="bg-black rounded-lg p-6 max-w-md mx-auto mb-10">
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-white bg-gray-700 px-3 py-1 rounded-full text-xs">
            {tier}
          </span>
          <div className="text-white text-2xl font-bold mt-3">
            {balance}
          </div>
        </div>
        <div className="bg-gradient-to-r from-gray-800 to-black rounded-full h-10 w-10"></div>
      </div>
      <div className="flex items-center text-white mt-6">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <span>{vinSearches} VIN Searches</span>
        <span className="text-gray-400 text-sm ml-1">{vinSearchLimit}</span>
      </div>
    </div>
  );
};

export default WalletCard;