import { useSelector, useDispatch } from 'react-redux';
import { selectActiveTab, selectIsBusinessAccount } from '../../modules/profileManagement/redux/selectors';
import { MainLayout } from '../../modules/landing/components/layout';
import { setActiveTab } from '../../modules/profileManagement/redux/actions';
import HistoryTab from '../../modules/profileManagement/components/history/History-Tab';
import AccountTab from '../../modules/profileManagement/components/account/Account-Tab';
import WalletTab from '../../modules/profileManagement/components/wallet/components/Wallet-Tabs';
import TeamsTab from '../../modules/profileManagement/components/team-management/Team-Tab';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);
  const isBusinessAccount = useSelector(selectIsBusinessAccount);

  const tabs = [
    { id: 'Account', label: 'Account' },
    { id: 'Wallet', label: 'Wallet' },
    { id: 'History', label: 'History' },
    ...(isBusinessAccount ? [{ id: 'Teams', label: 'Teams' }] : [])
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <MainLayout>
        <main className="flex-grow py-12">
          <div className="max-w-5xl mx-auto mb-8 mt-16 p-8 border rounded-lg shadow-sm">
            <div className="mb-8">
              <div className="flex space-x-8 w-fit mx-auto pb-2 border-b border-gray-200">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => dispatch(setActiveTab(tab.id))}
                    className={`px-4 ${
                      activeTab === tab.id
                        ? 'text-green-500 border-b-2 border-green-500 -mb-0.5'
                        : 'text-gray-500'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'Account' && <AccountTab />}
            {activeTab === 'Wallet' && <WalletTab/>}
            {activeTab === 'History' && <HistoryTab />}
            {activeTab === 'Teams' && isBusinessAccount && <TeamsTab/>}
          </div>
        </main>
      </MainLayout>
    </div>
  );
};

export default SettingsPage;