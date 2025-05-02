import { useSelector } from 'react-redux';
import { selectHistoryData } from '../../redux/selectors';
import HistoryItem from './HistoryItem';


const HistoryTab = () => {
  const historyData = useSelector(selectHistoryData);

  return (
    <div className="py-6 px-4">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-lg font-medium mb-6 border-b-2 border-black w-36 pb-2">
          Search History
        </h3>
        
        <div className="space-y-4">
          {historyData.map(item => (
            <HistoryItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryTab;
