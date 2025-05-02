import { HistoryItem as HistoryItemType } from '../../types/index';

interface HistoryItemProps {
  item: HistoryItemType;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ item }) => {
  return (
    <div className="flex justify-between items-center p-4 border-b bg-gray-50 rounded-lg">
      <div>
        <h4 className="font-medium">{item.type}</h4>
        <div className="text-gray-500 text-sm">
          {item.amount} • {item.date}
        </div>
      </div>
      <div>
        {item.status === 'Successful' ? (
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

export default HistoryItem;