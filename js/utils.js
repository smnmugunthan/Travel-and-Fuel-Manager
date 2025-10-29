// Utility Functions and Helpers

// Format date for display
window.formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Format date for input field
window.formatDateForInput = (dateString) => {
  if (!dateString) {
    return new Date().toISOString().slice(0, 16);
  }
  return new Date(dateString).toISOString().slice(0, 16);
};

// Calculate average mileage from fuel entries
window.calculateAverageMileage = (fuelEntries) => {
  if (!fuelEntries || fuelEntries.length < 2) return 0;
  
  let totalKm = 0;
  let totalLiters = 0;
  
  fuelEntries.forEach(entry => {
    if (entry.entryType === 'startEnd') {
      totalKm += (entry.endKm - entry.startKm);
    } else if (entry.entryType === 'totalKm') {
      totalKm += entry.totalKm || 0;
    }
    totalLiters += entry.liters || 0;
  });
  
  return totalLiters > 0 ? (totalKm / totalLiters).toFixed(2) : 0;
};

// Get current odometer from bike data
window.getCurrentOdometer = (activeBike) => {
  return activeBike?.currentOdometer || 0;
};

// Update bike odometer in Firestore
window.updateBikeOdometer = async (bikeId, newOdometer) => {
  try {
    await window.db.collection('bikes').doc(bikeId).update({
      currentOdometer: newOdometer,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Error updating odometer:', error);
    return false;
  }
};

// Calculate distance from odometer readings
window.calculateDistance = (startKm, endKm) => {
  const distance = parseFloat(endKm) - parseFloat(startKm);
  return distance >= 0 ? distance : 0;
};

// Validate odometer reading
window.validateOdometer = (newReading, currentReading) => {
  const newVal = parseFloat(newReading);
  const currentVal = parseFloat(currentReading);
  
  if (isNaN(newVal)) return { valid: false, message: 'Invalid odometer reading' };
  if (newVal < currentVal) return { valid: false, message: 'New reading cannot be less than current odometer' };
  if (newVal - currentVal > 1000) return { valid: false, message: 'Reading seems too high. Please verify.' };
  
  return { valid: true };
};

// Format currency
window.formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount || 0);
};

// Compress image before upload
window.compressImage = async (file, maxSizeMB = 0.5) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Calculate new dimensions (max 1200px width)
        const maxWidth = 1200;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to blob with quality 0.8
        canvas.toBlob((blob) => {
          resolve(new File([blob], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now()
          }));
        }, 'image/jpeg', 0.8);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

// Upload image to Firebase Storage
window.uploadImage = async (file, path) => {
  try {
    const compressed = await window.compressImage(file);
    const storageRef = window.storage.ref();
    const fileRef = storageRef.child(`${path}/${Date.now()}_${file.name}`);
    await fileRef.put(compressed);
    const url = await fileRef.getDownloadURL();
    return { success: true, url };
  } catch (error) {
    console.error('Error uploading image:', error);
    return { success: false, error: error.message };
  }
};

// Get last fuel entry for smart recall
window.getLastFuelEntry = (fuelEntries) => {
  if (!fuelEntries || fuelEntries.length === 0) return null;
  
  const sorted = [...fuelEntries].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
  
  return sorted[0];
};

// Show toast notification (we'll implement a simple one)
window.showToast = (message, type = 'success') => {
  const toastContainer = document.getElementById('toast-container') || createToastContainer();
  
  const toast = document.createElement('div');
  toast.className = `slide-in ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white px-6 py-3 rounded-lg shadow-lg mb-2`;
  toast.textContent = message;
  
  toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

function createToastContainer() {
  const container = document.createElement('div');
  container.id = 'toast-container';
  container.className = 'fixed top-4 right-4 z-50 flex flex-col items-end';
  document.body.appendChild(container);
  return container;
}

// Debounce function for search/filter
window.debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Sort array by date
window.sortByDate = (array, dateField = 'date', descending = true) => {
  return [...array].sort((a, b) => {
    const dateA = new Date(a[dateField]);
    const dateB = new Date(b[dateField]);
    return descending ? dateB - dateA : dateA - dateB;
  });
};

// Filter data by date range
window.filterByDateRange = (array, startDate, endDate, dateField = 'date') => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return array.filter(item => {
    const itemDate = new Date(item[dateField]);
    return itemDate >= start && itemDate <= end;
  });
};

// Calculate statistics
window.calculateStats = (trips, fuelEntries) => {
  const totalTrips = trips.length;
  const totalKm = trips.reduce((sum, t) => sum + (t.kilometers || 0), 0);
  const totalFuelCost = fuelEntries.reduce((sum, f) => sum + (f.cost || 0), 0);
  const totalFuelLiters = fuelEntries.reduce((sum, f) => sum + (f.liters || 0), 0);
  const avgMileage = window.calculateAverageMileage(fuelEntries);
  
  return {
    totalTrips,
    totalKm,
    totalFuelCost,
    totalFuelLiters,
    avgMileage,
    costPerKm: totalKm > 0 ? (totalFuelCost / totalKm).toFixed(2) : 0
  };
};

console.log('✅ Utils loaded');