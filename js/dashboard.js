window.DashboardTab = ({ trips, fuelEntries, issues, onNavigate }) => {
  const stats = window.calculateStats(trips, fuelEntries);
  const activeIssues = issues.filter(i => i.status !== 'fixed').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <window.StatCard
          title="Avg Mileage"
          value={stats.avgMileage || '0'}
          subtitle={`km/liter${fuelEntries.length > 0 ? ` (${fuelEntries.length} fills)` : ''}`}
          icon="trending"
          color="green"
        />
        <window.StatCard
          title="Total Trips"
          value={stats.totalTrips}
          subtitle={`${stats.totalKm.toFixed(1)} km traveled`}
          icon="map"
          color="blue"
        />
        <window.StatCard
          title="Fuel Used"
          value={stats.totalFuelLiters.toFixed(1)}
          subtitle="liters"
          icon="fuel"
          color="orange"
        />
        <window.StatCard
          title="Total Cost"
          value={`₹${stats.totalFuelCost.toFixed(0)}`}
          subtitle="fuel expenses"
          icon="chart"
          color="purple"
        />
      </div>

      {activeIssues > 0 && (
        <window.Card className="border-l-4 border-red-500">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <window.Icon name="alert" size={24} className="text-red-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {activeIssues} Active Issue{activeIssues > 1 ? 's' : ''}
                </h3>
                <p className="text-sm text-gray-600">
                  You have {activeIssues} bike issue{activeIssues > 1 ? 's' : ''} that need attention.
                </p>
              </div>
            </div>
            <window.Button onClick={() => onNavigate('issues')} variant="danger">
              View Issues
            </window.Button>
          </div>
        </window.Card>
      )}

      <window.Card title="Recent Activity">
        {trips.length === 0 ? (
          <window.EmptyState
            icon="map"
            title="No trips yet"
            description="Start tracking your rides by adding your first trip!"
            action={() => onNavigate('addTrip')}
            actionText="Add First Trip"
          />
        ) : (
          <div className="space-y-3">
            {trips.slice(0, 5).map(trip => (
              <div key={trip.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <window.Icon name="map" size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{trip.source} → {trip.destination}</p>
                    <p className="text-sm text-gray-500">{window.formatDate(trip.date)}</p>
                  </div>
                </div>
                <p className="font-bold text-indigo-600 text-lg">{trip.kilometers} km</p>
              </div>
            ))}
          </div>
        )}
      </window.Card>
    </div>
  );
};

console.log('✅ Dashboard loaded');