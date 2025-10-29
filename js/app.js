const { useState, useEffect } = React;

function BikeTrackerApp() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeBike, setActiveBike] = useState(null);
  const [bikes, setBikes] = useState([]);
  const [trips, setTrips] = useState([]);
  const [fuelEntries, setFuelEntries] = useState([]);
  const [issues, setIssues] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = window.auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
        await loadUserData(user.uid);
      } else {
        setCurrentUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loadUserData = async (userId) => {
    try {
      const userDoc = await window.db.collection('users').doc(userId).get();
      const userData = userDoc.data();
      setUserProfile(userData);
      setIsAdmin(userData.role === 'admin');

      const bikesSnapshot = await window.db.collection('bikes').where('userId', '==', userId).get();
      const bikesData = bikesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBikes(bikesData);
      
      if (bikesData.length > 0) {
        const active = bikesData.find(b => b.active) || bikesData[0];
        setActiveBike(active);
        loadBikeData(userId, active.id);
      }

      if (userData.role === 'admin') {
        loadPendingUsers();
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const loadBikeData = (userId, bikeId) => {
    window.db.collection('trips').where('userId', '==', userId).where('bikeId', '==', bikeId)
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTrips(window.sortByDate(data, 'date'));
      });

    window.db.collection('fuel').where('userId', '==', userId).where('bikeId', '==', bikeId)
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFuelEntries(window.sortByDate(data, 'date'));
      });

    window.db.collection('issues').where('userId', '==', userId).where('bikeId', '==', bikeId)
      .onSnapshot(snapshot => {
        setIssues(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
  };

  const loadPendingUsers = () => {
    window.db.collection('users').where('status', '==', 'pending')
      .onSnapshot(snapshot => {
        setPendingUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
  };

  const handleLogout = async () => {
    await window.auth.signOut();
    setActiveTab('dashboard');
  };

  if (loading) {
    return <window.LoadingSpinner message="Loading Bike Tracker..." />;
  }

  if (!currentUser) {
    return <window.AuthScreen onAuthSuccess={() => setLoading(true)} />;
  }

  return (
    <div className="min-h-screen">
      <header className="glassmorphism shadow-lg sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-xl shadow-lg">
              <window.Icon name="bike" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {activeBike ? `${activeBike.bikeName} ${activeBike.bikeModel}` : 'Bike Tracker'}
              </h1>
              <p className="text-xs text-gray-500">
                Odometer: {window.getCurrentOdometer(activeBike)} km
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-800">{userProfile?.name}</p>
              <p className="text-xs text-gray-500">{isAdmin ? 'Admin' : 'User'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
            >
              <window.Icon name="logout" size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="glassmorphism rounded-2xl shadow-lg mb-6 overflow-x-auto border border-white/20">
          <div className="flex">
            {['dashboard', 'addTrip', 'addFuel', 'trips', 'fuel'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium transition-all ${
                  activeTab === tab
                    ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50'
                    : 'text-gray-600 hover:bg-gray-50/50'
                }`}
              >
                {tab.replace(/([A-Z])/g, ' $1').trim()}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <window.DashboardTab
            trips={trips}
            fuelEntries={fuelEntries}
            issues={issues}
            onNavigate={setActiveTab}
          />
        )}
        
        {activeTab !== 'dashboard' && (
          <window.Card>
            <h2 className="text-2xl font-bold mb-4">
              {activeTab} - Implementation in progress
            </h2>
            <p>Full CRUD operations for {activeTab} go here</p>
          </window.Card>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<BikeTrackerApp />);
console.log('✅ App loaded');