// Authentication Module

const { useState } = React;

window.AuthScreen = ({ onAuthSuccess }) => {
  const [authMode, setAuthMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [bikeName, setBikeName] = useState('');
  const [bikeModel, setBikeModel] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const userCredential = await window.auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      const usersSnapshot = await window.db.collection('users').get();
      const isFirstUser = usersSnapshot.empty;

      await window.db.collection('users').doc(user.uid).set({
        email: email,
        name: name,
        role: isFirstUser ? 'admin' : 'user',
        status: isFirstUser ? 'approved' : 'pending',
        features: {
          serviceTrackingEnabled: true,
          checklistsEnabled: false,
          remindersEnabled: false,
          issueTrackingEnabled: true
        },
        createdAt: new Date().toISOString()
      });

      // Create first bike if provided
      if (bikeName && bikeModel) {
        await window.db.collection('bikes').add({
          userId: user.uid,
          bikeName: bikeName,
          bikeModel: bikeModel,
          startingOdometer: 0,
          currentOdometer: 0,
          active: true,
          createdAt: new Date().toISOString()
        });
      }

      if (isFirstUser) {
        setSuccess('Admin account created successfully!');
        setTimeout(() => onAuthSuccess(), 1500);
      } else {
        setAuthMode('pending');
        await window.auth.signOut();
        setSuccess('Registration submitted! Please wait for admin approval.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await window.auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      const userDoc = await window.db.collection('users').doc(user.uid).get();
      if (!userDoc.exists) {
        await window.auth.signOut();
        setError('User profile not found. Please contact admin.');
        setLoading(false);
        return;
      }

      const userData = userDoc.data();
      if (userData.status === 'pending') {
        await window.auth.signOut();
        setError('Your account is pending approval. Please wait for admin to approve.');
        setLoading(false);
        return;
      }

      if (userData.status === 'rejected') {
        await window.auth.signOut();
        setError('Your account has been rejected. Please contact admin.');
        setLoading(false);
        return;
      }

      setSuccess('Login successful!');
      setTimeout(() => onAuthSuccess(), 1000);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (authMode === 'pending') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glassmorphism rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
              <window.Icon name="check" size={32} className="text-yellow-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Registration Submitted!</h2>
            <p className="text-gray-600 mb-6">Your account is pending admin approval.</p>
            <button
              onClick={() => { setAuthMode('login'); setSuccess(''); setError(''); }}
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glassmorphism rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <window.Icon name="bike" size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Bike Tracker
          </h1>
          <p className="text-gray-600 mt-2">Complete bike management solution</p>
        </div>

        {success && <window.Alert type="success" message={success} />}
        {error && <window.Alert type="error" message={error} />}

        <div className="flex border-b-2 mb-6">
          <button
            onClick={() => { setAuthMode('login'); setError(''); setSuccess(''); }}
            className={`flex-1 py-3 text-center font-semibold transition-all ${
              authMode === 'login'
                ? 'text-indigo-600 border-b-2 border-indigo-600 -mb-0.5'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => { setAuthMode('register'); setError(''); setSuccess(''); }}
            className={`flex-1 py-3 text-center font-semibold transition-all ${
              authMode === 'register'
                ? 'text-indigo-600 border-b-2 border-indigo-600 -mb-0.5'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={authMode === 'login' ? handleLogin : handleRegister} className="space-y-4">
          {authMode === 'register' && (
            <>
              <window.InputField
                label="Your Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />

              <window.InputField
                label="Bike Name (Optional)"
                type="text"
                value={bikeName}
                onChange={(e) => setBikeName(e.target.value)}
                placeholder="e.g., Pulsar, Royal Enfield"
              />

              <window.InputField
                label="Bike Model (Optional)"
                type="text"
                value={bikeModel}
                onChange={(e) => setBikeModel(e.target.value)}
                placeholder="e.g., NS200, Classic 350"
              />
            </>
          )}

          <window.InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
          />

          <window.InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min 6 characters"
            required
          />

          <window.Button
            type="submit"
            variant="primary"
            loading={loading}
            className="w-full"
          >
            {authMode === 'login' ? 'Login' : 'Create Account'}
          </window.Button>
        </form>
      </div>
    </div>
  );
};

console.log('✅ Auth loaded');