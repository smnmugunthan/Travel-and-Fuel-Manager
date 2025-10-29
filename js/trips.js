window.TripsModule = () => {
  const [tripForm, setTripForm] = React.useState({
    source: '',
    destination: '',
    kilometers: '',
    entryMethod: 'manual',
    startOdo: '',
    endOdo: '',
    startTrip: '',
    endTrip: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const [activeView, setActiveView] = React.useState('add');
  const [trips, setTrips] = React.useState([]);
  const [editingTrip, setEditingTrip] = React.useState(null);

  // Load trips on mount
  React.useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      const result = await window.storage.get('trips-data');
      if (result) {
        setTrips(JSON.parse(result.value));
      }
    } catch (error) {
      console.log('No existing trips data');
    }
  };

  const saveTrips = async (newTrips) => {
    try {
      await window.storage.set('trips-data', JSON.stringify(newTrips));
      setTrips(newTrips);
    } catch (error) {
      console.error('Failed to save trips:', error);
      alert('Failed to save trip. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTripForm(prev => {
      const updated = { ...prev, [name]: value };
      
      // Auto-calculate kilometers from odometer readings
      if (name === 'startOdo' || name === 'endOdo') {
        if (updated.startOdo && updated.endOdo) {
          const km = parseFloat(updated.endOdo) - parseFloat(updated.startOdo);
          updated.kilometers = km > 0 ? km.toFixed(1) : '';
        }
      }
      
      return updated;
    });
  };

  const handleSubmit = async () => {
    // Validation
    if (!tripForm.date || !tripForm.source || !tripForm.destination) {
      alert('Please fill in date, source, and destination');
      return;
    }

    if (tripForm.entryMethod === 'manual' && !tripForm.kilometers) {
      alert('Please enter the distance');
      return;
    }

    if (tripForm.entryMethod === 'odometer' && (!tripForm.startOdo || !tripForm.endOdo)) {
      alert('Please enter both odometer readings');
      return;
    }

    if (tripForm.entryMethod === 'odometer' && parseFloat(tripForm.endOdo) <= parseFloat(tripForm.startOdo)) {
      alert('End odometer reading must be greater than start reading');
      return;
    }
    
    const newTrip = {
      id: editingTrip?.id || Date.now(),
      source: tripForm.source,
      destination: tripForm.destination,
      kilometers: tripForm.entryMethod === 'manual' 
        ? parseFloat(tripForm.kilometers) 
        : parseFloat(tripForm.endOdo) - parseFloat(tripForm.startOdo),
      entryMethod: tripForm.entryMethod,
      startOdo: tripForm.startOdo || null,
      endOdo: tripForm.endOdo || null,
      startTrip: tripForm.startTrip || null,
      endTrip: tripForm.endTrip || null,
      date: tripForm.date,
      notes: tripForm.notes || null,
      createdAt: editingTrip?.createdAt || new Date().toISOString()
    };

    let updatedTrips;
    if (editingTrip) {
      updatedTrips = trips.map(t => t.id === editingTrip.id ? newTrip : t);
    } else {
      updatedTrips = [...trips, newTrip];
    }

    await saveTrips(updatedTrips);
    resetForm();
    setActiveView('history');
  };

  const resetForm = () => {
    setTripForm({
      source: '',
      destination: '',
      kilometers: '',
      entryMethod: 'manual',
      startOdo: '',
      endOdo: '',
      startTrip: '',
      endTrip: '',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setEditingTrip(null);
  };

  const handleEdit = (trip) => {
    setEditingTrip(trip);
    setTripForm({
      source: trip.source,
      destination: trip.destination,
      kilometers: trip.kilometers.toString(),
      entryMethod: trip.entryMethod,
      startOdo: trip.startOdo || '',
      endOdo: trip.endOdo || '',
      startTrip: trip.startTrip || '',
      endTrip: trip.endTrip || '',
      date: trip.date,
      notes: trip.notes || ''
    });
    setActiveView('add');
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this trip?')) {
      const updatedTrips = trips.filter(t => t.id !== id);
      await saveTrips(updatedTrips);
    }
  };

  const totalKilometers = trips.reduce((sum, trip) => sum + (parseFloat(trip.kilometers) || 0), 0);
  const sortedTrips = [...trips].sort((a, b) => new Date(b.date) - new Date(a.date));

  return React.createElement('div', { className: 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4' },
    React.createElement('div', { className: 'max-w-4xl mx-auto' },
      // Header
      React.createElement('div', { className: 'bg-white rounded-2xl shadow-lg p-6 mb-6' },
        React.createElement('div', { className: 'flex items-center justify-between' },
          React.createElement('div', { className: 'flex items-center gap-3' },
            React.createElement('div', { className: 'bg-indigo-600 p-3 rounded-xl' },
              '🚗'
            ),
            React.createElement('div', null,
              React.createElement('h1', { className: 'text-3xl font-bold text-gray-800' }, 'Trips Tracker'),
              React.createElement('p', { className: 'text-gray-500' }, 'Manage your journey records')
            )
          ),
          React.createElement('div', { className: 'text-right' },
            React.createElement('div', { className: 'text-sm text-gray-500' }, 'Total Distance'),
            React.createElement('div', { className: 'text-2xl font-bold text-indigo-600' }, `${totalKilometers.toFixed(1)} km`)
          )
        )
      ),

      // Navigation
      React.createElement('div', { className: 'flex gap-2 mb-6' },
        React.createElement('button', {
          onClick: () => { setActiveView('add'); resetForm(); },
          className: `flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
            activeView === 'add'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`
        }, '➕ Add Trip'),
        React.createElement('button', {
          onClick: () => setActiveView('history'),
          className: `flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
            activeView === 'history'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`
        }, `📋 Trip History (${trips.length})`)
      ),

      // Add/Edit Trip Form
      activeView === 'add' && React.createElement('div', { className: 'bg-white rounded-2xl shadow-lg p-6' },
        React.createElement('h2', { className: 'text-xl font-bold text-gray-800 mb-6' },
          editingTrip ? 'Edit Trip' : 'Add New Trip'
        ),
        
        React.createElement('div', { className: 'space-y-4' },
          // Entry Method Toggle
          React.createElement('div', { className: 'flex gap-2 p-1 bg-gray-100 rounded-lg' },
            React.createElement('button', {
              type: 'button',
              onClick: () => setTripForm(prev => ({ ...prev, entryMethod: 'manual' })),
              className: `flex-1 py-2 rounded-md font-medium transition-all ${
                tripForm.entryMethod === 'manual'
                  ? 'bg-white text-indigo-600 shadow'
                  : 'text-gray-600'
              }`
            }, 'Manual Entry'),
            React.createElement('button', {
              type: 'button',
              onClick: () => setTripForm(prev => ({ ...prev, entryMethod: 'odometer' })),
              className: `flex-1 py-2 rounded-md font-medium transition-all ${
                tripForm.entryMethod === 'odometer'
                  ? 'bg-white text-indigo-600 shadow'
                  : 'text-gray-600'
              }`
            }, 'Odometer')
          ),

          // Date
          React.createElement('div', null,
            React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, '📅 Date'),
            React.createElement('input', {
              type: 'date',
              name: 'date',
              value: tripForm.date,
              onChange: handleInputChange,
              className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
            })
          ),

          // Source & Destination
          React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
            React.createElement('div', null,
              React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, '📍 Source'),
              React.createElement('input', {
                type: 'text',
                name: 'source',
                value: tripForm.source,
                onChange: handleInputChange,
                placeholder: 'Starting point',
                className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
              })
            ),
            React.createElement('div', null,
              React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, '📍 Destination'),
              React.createElement('input', {
                type: 'text',
                name: 'destination',
                value: tripForm.destination,
                onChange: handleInputChange,
                placeholder: 'End point',
                className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
              })
            )
          ),

          // Manual Entry
          tripForm.entryMethod === 'manual' && React.createElement('div', null,
            React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Distance (km)'),
            React.createElement('input', {
              type: 'number',
              name: 'kilometers',
              value: tripForm.kilometers,
              onChange: handleInputChange,
              step: '0.1',
              placeholder: 'Enter kilometers',
              className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
            })
          ),

          // Odometer Entry
          tripForm.entryMethod === 'odometer' && React.createElement('div', { className: 'space-y-4' },
            React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
              React.createElement('div', null,
                React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Start Odometer'),
                React.createElement('input', {
                  type: 'number',
                  name: 'startOdo',
                  value: tripForm.startOdo,
                  onChange: handleInputChange,
                  step: '0.1',
                  placeholder: 'Start reading',
                  className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                })
              ),
              React.createElement('div', null,
                React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 'End Odometer'),
                React.createElement('input', {
                  type: 'number',
                  name: 'endOdo',
                  value: tripForm.endOdo,
                  onChange: handleInputChange,
                  step: '0.1',
                  placeholder: 'End reading',
                  className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                })
              )
            ),
            tripForm.startOdo && tripForm.endOdo && React.createElement('div', { className: 'p-3 bg-indigo-50 rounded-lg' },
              React.createElement('span', { className: 'text-sm text-gray-600' }, 'Calculated distance: '),
              React.createElement('span', { className: 'text-lg font-bold text-indigo-600' },
                `${(parseFloat(tripForm.endOdo) - parseFloat(tripForm.startOdo)).toFixed(1)} km`
              )
            )
          ),

          // Trip Times
          React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
            React.createElement('div', null,
              React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, '⏰ Start Time (optional)'),
              React.createElement('input', {
                type: 'time',
                name: 'startTrip',
                value: tripForm.startTrip,
                onChange: handleInputChange,
                className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
              })
            ),
            React.createElement('div', null,
              React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, '⏰ End Time (optional)'),
              React.createElement('input', {
                type: 'time',
                name: 'endTrip',
                value: tripForm.endTrip,
                onChange: handleInputChange,
                className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
              })
            )
          ),

          // Notes
          React.createElement('div', null,
            React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Notes (optional)'),
            React.createElement('textarea', {
              name: 'notes',
              value: tripForm.notes,
              onChange: handleInputChange,
              rows: 3,
              placeholder: 'Add any additional details...',
              className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none'
            })
          ),

          // Buttons
          React.createElement('div', { className: 'flex gap-3 pt-4' },
            React.createElement('button', {
              onClick: handleSubmit,
              className: 'flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors'
            }, editingTrip ? 'Update Trip' : 'Save Trip'),
            editingTrip && React.createElement('button', {
              onClick: resetForm,
              className: 'px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors'
            }, 'Cancel')
          )
        )
      ),

      // Trip History
      activeView === 'history' && React.createElement('div', { className: 'space-y-4' },
        trips.length === 0 ? React.createElement('div', { className: 'bg-white rounded-2xl shadow-lg p-12 text-center' },
          React.createElement('div', { className: 'text-6xl mb-4' }, '🚗'),
          React.createElement('h3', { className: 'text-xl font-semibold text-gray-600 mb-2' }, 'No trips yet'),
          React.createElement('p', { className: 'text-gray-400 mb-6' }, 'Start tracking your journeys by adding your first trip'),
          React.createElement('button', {
            onClick: () => setActiveView('add'),
            className: 'bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors'
          }, 'Add First Trip')
        ) : sortedTrips.map(trip =>
          React.createElement('div', {
            key: trip.id,
            className: 'bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow'
          },
            React.createElement('div', { className: 'flex justify-between items-start mb-3' },
              React.createElement('div', { className: 'flex-1' },
                React.createElement('div', { className: 'flex items-center gap-2 mb-2' },
                  React.createElement('span', null, '📍'),
                  React.createElement('span', { className: 'font-semibold text-lg text-gray-800' },
                    `${trip.source} → ${trip.destination}`
                  )
                ),
                React.createElement('div', { className: 'flex items-center gap-4 text-sm text-gray-600' },
                  React.createElement('span', null, `📅 ${new Date(trip.date).toLocaleDateString()}`),
                  trip.startTrip && trip.endTrip && React.createElement('span', null, `${trip.startTrip} - ${trip.endTrip}`)
                )
              ),
              React.createElement('div', { className: 'flex items-center gap-3' },
                React.createElement('div', { className: 'text-right mr-4' },
                  React.createElement('div', { className: 'text-2xl font-bold text-indigo-600' }, `${trip.kilometers} km`),
                  trip.entryMethod === 'odometer' && React.createElement('div', { className: 'text-xs text-gray-500' },
                    `${trip.startOdo} → ${trip.endOdo}`
                  )
                ),
                React.createElement('button', {
                  onClick: () => handleEdit(trip),
                  className: 'p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors',
                  title: 'Edit'
                }, '✏️'),
                React.createElement('button', {
                  onClick: () => handleDelete(trip.id),
                  className: 'p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors',
                  title: 'Delete'
                }, '🗑️')
              )
            ),
            trip.notes && React.createElement('div', { className: 'mt-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-700' },
              trip.notes
            )
          )
        )
      )
    )
  );
};

console.log('✅ Trips loaded');
