// Reusable UI Components

// Icon Component
window.Icon = ({ name, size = 20, className = "" }) => {
  const icons = {
    camera: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>,
    logout: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>,
    map: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
    fuel: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="3" y1="22" x2="15" y2="22"></line><line x1="4" y1="9" x2="14" y2="9"></line><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"></path><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"></path></svg>,
    trending: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>,
    chart: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M3 3v18h18"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg>,
    users: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
    check: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polyline points="20 6 9 17 4 12"></polyline></svg>,
    x: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
    loader: <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>,
    wrench: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>,
    list: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>,
    bell: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
    alert: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>,
    plus: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
    edit: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>,
    trash: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
    bike: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="5.5" cy="17.5" r="3.5"></circle><circle cx="18.5" cy="17.5" r="3.5"></circle><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path><path d="M12 17.5V14l-3-3 4-3 2 3h2"></path></svg>,
    settings: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><circle cx="12" cy="12" r="3"></circle><path d="M12 1v6m0 6v6"></path></svg>,
    image: <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
  };
  return icons[name] || null;
};

// Loading Spinner Component
window.LoadingSpinner = ({ message = "Loading..." }) => (
  <div className="flex items-center justify-center py-12">
    <div className="text-center">
      <window.Icon name="loader" size={48} className="text-indigo-600 mx-auto mb-4" />
      <p className="text-gray-600">{message}</p>
    </div>
  </div>
);

// Alert/Message Component
window.Alert = ({ type = 'info', message, onClose }) => {
  const styles = {
    success: 'bg-green-50 border-green-500 text-green-700',
    error: 'bg-red-50 border-red-500 text-red-700',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-700',
    info: 'bg-blue-50 border-blue-500 text-blue-700'
  };

  const icons = {
    success: 'check',
    error: 'alert',
    warning: 'alert',
    info: 'alert'
  };

  return (
    <div className={`${styles[type]} border-l-4 px-4 py-3 rounded-lg mb-4 slide-in`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <window.Icon name={icons[type]} size={20} className="mr-2 mt-0.5" />
          <span className="text-sm">{message}</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="ml-4">
            <window.Icon name="x" size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

// Button Component
window.Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false, 
  loading = false,
  className = '',
  icon = null,
  type = 'button'
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`px-4 py-2 rounded-xl font-semibold transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${variants[variant]} ${className}`}
    >
      {loading ? (
        <window.Icon name="loader" size={20} />
      ) : (
        <>
          {icon && <window.Icon name={icon} size={20} />}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};

// Card Component
window.Card = ({ children, className = '', title = null, actions = null }) => (
  <div className={`glassmorphism rounded-2xl shadow-lg p-6 border border-white/20 ${className}`}>
    {(title || actions) && (
      <div className="flex items-center justify-between mb-4">
        {title && <h2 className="text-xl font-bold text-gray-800">{title}</h2>}
        {actions && <div className="flex items-center space-x-2">{actions}</div>}
      </div>
    )}
    {children}
  </div>
);

// Stat Card Component
window.StatCard = ({ title, value, subtitle, icon, color = 'indigo' }) => {
  const colorStyles = {
    indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', gradient: 'from-indigo-600 to-purple-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600', gradient: 'from-green-600 to-emerald-600' },
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', gradient: 'from-blue-600 to-indigo-600' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600', gradient: 'from-orange-600 to-red-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', gradient: 'from-purple-600 to-pink-600' }
  };

  const style = colorStyles[color];

  return (
    <div className="glassmorphism rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-gray-600 text-sm font-semibold uppercase tracking-wide">{title}</h3>
        <div className={`p-2 ${style.bg} rounded-lg`}>
          <window.Icon name={icon} size={20} className={style.text} />
        </div>
      </div>
      <p className={`text-4xl font-bold bg-gradient-to-r ${style.gradient} bg-clip-text text-transparent`}>
        {value}
      </p>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
};

// Input Field Component
window.InputField = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder = '', 
  required = false,
  min = null,
  max = null,
  step = null,
  className = ''
}) => (
  <div className={className}>
    {label && (
      <label className="block text-gray-700 font-medium mb-2 text-sm">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      min={min}
      max={max}
      step={step}
      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
    />
  </div>
);

// Select Field Component
window.SelectField = ({ 
  label, 
  value, 
  onChange, 
  options = [], 
  required = false,
  className = ''
}) => (
  <div className={className}>
    {label && (
      <label className="block text-gray-700 font-medium mb-2 text-sm">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <select
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// Textarea Component
window.TextareaField = ({ 
  label, 
  value, 
  onChange, 
  placeholder = '', 
  rows = 3,
  required = false,
  className = ''
}) => (
  <div className={className}>
    {label && (
      <label className="block text-gray-700 font-medium mb-2 text-sm">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      required={required}
      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
    />
  </div>
);

// Modal Component
window.Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>
        
        <div className={`inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle ${sizes[size]} w-full`}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <window.Icon name="x" size={24} />
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Empty State Component
window.EmptyState = ({ icon, title, description, action, actionText }) => (
  <div className="text-center py-12">
    <window.Icon name={icon} size={64} className="text-gray-300 mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
    <p className="text-gray-500 mb-6 max-w-md mx-auto">{description}</p>
    {action && (
      <window.Button onClick={action} icon="plus">
        {actionText}
      </window.Button>
    )}
  </div>
);

console.log('✅ Components loaded');