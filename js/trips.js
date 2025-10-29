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
    date: window.formatDateForInput(),
    notes: ''
  });

  // Add Trip, View Trips, etc. - Basic structure shown
  // Full implementation would be here
  
  return <div>Trips Module - Implement forms and history</div>;
};

console.log('✅ Trips loaded');