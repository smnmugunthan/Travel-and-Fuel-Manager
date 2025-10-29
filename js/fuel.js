window.FuelModule = () => {
  const [fuelForm, setFuelForm] = React.useState({
    entryType: 'startEnd',
    startKm: '',
    endKm: '',
    totalKm: '',
    liters: '',
    cost: '',
    date: window.formatDateForInput(),
    notes: ''
  });

  // Add Fuel, View History, etc.
  
  return <div>Fuel Module - Implement forms and history</div>;
};

console.log('✅ Fuel loaded');