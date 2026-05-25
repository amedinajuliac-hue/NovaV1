import { useState } from 'react';
import { ChevronRight, ChevronLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Trade data organized by month
const tradesByMonth = {
  '2026-04': [
    { date: '2026-04-01', day: 1, trades: [{ id: 1, ticket: 'SPY-401', symbol: 'SPY', contract: '1 Call', pl: 450, roi: 18, type: 'Call' }] },
    { date: '2026-04-03', day: 3, trades: [{ id: 2, ticket: 'QQQ-302', symbol: 'QQQ', contract: '2 Put', pl: 620, roi: 22, type: 'Put' }, { id: 3, ticket: 'AAPL-101', symbol: 'AAPL', contract: '1 Call', pl: 380, roi: 15, type: 'Call' }] },
    { date: '2026-04-05', day: 5, trades: [{ id: 4, ticket: 'TSLA-201', symbol: 'TSLA', contract: '1 Put', pl: 520, roi: 19, type: 'Put' }] },
    { date: '2026-04-08', day: 8, trades: [{ id: 5, ticket: 'NQ-401', symbol: 'NQ', contract: '3 Call', pl: 890, roi: 26, type: 'Call' }] },
    { date: '2026-04-12', day: 12, trades: [{ id: 6, ticket: 'ES-501', symbol: 'ES', contract: '1 Call', pl: 750, roi: 28, type: 'Call' }, { id: 7, ticket: 'GLD-101', symbol: 'GLD', contract: '2 Put', pl: 410, roi: 16, type: 'Put' }] },
    { date: '2026-04-15', day: 15, trades: [{ id: 8, ticket: 'MSFT-201', symbol: 'MSFT', contract: '1 Call', pl: 630, roi: 21, type: 'Call' }] },
    { date: '2026-04-18', day: 18, trades: [{ id: 9, ticket: 'NVDA-301', symbol: 'NVDA', contract: '2 Put', pl: 780, roi: 24, type: 'Put' }] },
    { date: '2026-04-22', day: 22, trades: [{ id: 10, ticket: 'AMZN-101', symbol: 'AMZN', contract: '1 Call', pl: 540, roi: 20, type: 'Call' }, { id: 11, ticket: 'META-201', symbol: 'META', contract: '1 Put', pl: 360, roi: 14, type: 'Put' }] },
    { date: '2026-04-25', day: 25, trades: [{ id: 12, ticket: 'GOOGL-301', symbol: 'GOOGL', contract: '1 Call', pl: 710, roi: 25, type: 'Call' }] },
    { date: '2026-04-29', day: 29, trades: [{ id: 13, ticket: 'XLE-101', symbol: 'XLE', contract: '2 Call', pl: 480, roi: 17, type: 'Call' }] }
  ],
  '2026-05': [
    { date: '2026-05-20', day: 20, trades: [{ id: 1, ticket: 'NQ-7700', symbol: 'NQ', contract: '1 Call', pl: 1620, roi: 32, type: 'Call' }, { id: 2, ticket: 'AAPL-193', symbol: 'AAPL', contract: '2 Put', pl: 570, roi: 19, type: 'Put' }] },
    { date: '2026-05-21', day: 21, trades: [{ id: 3, ticket: 'ES-5600', symbol: 'ES', contract: '1 Call', pl: 920, roi: 42, type: 'Call' }] },
    { date: '2026-05-22', day: 22, trades: [{ id: 4, ticket: 'TSLA-241', symbol: 'TSLA', contract: '1 Put', pl: 870, roi: 25, type: 'Put' }] },
    { date: '2026-05-23', day: 23, trades: [{ id: 5, ticket: 'SPY-420', symbol: 'SPY', contract: '1 Call', pl: 1290, roi: 31, type: 'Call' }] },
    { date: '2026-05-24', day: 24, trades: [{ id: 6, ticket: 'NVDA-580', symbol: 'NVDA', contract: '1 Put', pl: 410, roi: 23, type: 'Put' }, { id: 7, ticket: 'MSFT-388', symbol: 'MSFT', contract: '1 Call', pl: 540, roi: 28, type: 'Call' }] }
  ]
};

const portfolioHistory = [
  { date: 'May 18', value: 95000 },
  { date: 'May 19', value: 96200 },
  { date: 'May 20', value: 97900 },
  { date: 'May 21', value: 99350 },
  { date: 'May 22', value: 100800 },
  { date: 'May 23', value: 102430 },
  { date: 'May 24', value: 103900 }
];

function App() {
  const [currentView, setCurrentView] = useState<'login' | 'landing' | 'dashboard'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [currentMonth, setCurrentMonth] = useState('2026-05');
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [showPortfolioChart, setShowPortfolioChart] = useState(false);
  const [showWeeklySummary, setShowWeeklySummary] = useState(false);

  const totalPortfolio = 103900;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
      setCurrentView('dashboard');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setCurrentView('login');
  };

  const getMonthDays = (monthStr: string) => {
    const [year, month] = monthStr.split('-');
    const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
    return daysInMonth;
  };

  const getMonthName = (monthStr: string) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [, month] = monthStr.split('-');
    return months[parseInt(month) - 1];
  };

  const changeMonth = (direction: number) => {
    const [year, month] = currentMonth.split('-');
    let newMonth = parseInt(month) + direction;
    let newYear = parseInt(year);

    if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    }

    setCurrentMonth(`${newYear}-${String(newMonth).padStart(2, '0')}`);
    setExpandedDay(null);
  };

  const currentMonthTrades = tradesByMonth[currentMonth as keyof typeof tradesByMonth] || [];

  const monthYear = currentMonth.split('-');
  const daysInMonth = getMonthDays(currentMonth);
  const firstDayOfMonth = new Date(`${currentMonth}-01`).getDay();

  const weeklySummary = {
    trades: (tradesByMonth['2026-05'] || []).reduce((sum, day) => sum + day.trades.length, 0),
    winRate: '78%',
    avgPl: '$710',
    netGain: '$3,900'
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {!isLoggedIn ? (
        // LOGIN PAGE
        <div className="flex h-screen items-center justify-center px-6">
          <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-100">
            <div className="mb-8 flex flex-col items-center gap-3">
              <img src="/assets/nova-logo.jpg" alt="Nova Logo" className="h-16 w-16 rounded-2xl object-cover shadow-lg" />
              <div className="text-center">
                <h1 className="text-2xl font-semibold text-slate-950">Welcome to Nova</h1>
                <p className="mt-1 text-sm text-slate-500">Day trading intelligence</p>
              </div>
            </div>

            {showForgotPassword ? (
              <form className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Enter your email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <button
                  type="button"
                  className="w-full rounded-full bg-indigo-600 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-500"
                >
                  Send Reset Link
                </button>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="w-full rounded-full border border-slate-200 bg-white py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Back to Sign In
                </button>
              </form>
            ) : (
              <>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-6 w-full rounded-full bg-indigo-600 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-500"
                  >
                    Sign In
                  </button>
                </form>

                <div className="mt-4 flex items-center gap-2 text-center text-sm">
                  <button
                    onClick={() => setShowForgotPassword(true)}
                    className="text-indigo-600 hover:text-indigo-500 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-6">
                  <p className="mb-4 text-center text-sm text-slate-600">Follow us</p>
                  <div className="flex justify-center gap-4">
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900"
                      title="X (Twitter)"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7a10.6 10.6 0 01-10-10.5z" />
                      </svg>
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900"
                      title="Instagram"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="currentColor" strokeWidth="2" />
                        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                      </svg>
                    </a>
                    <a
                      href="https://discord.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900"
                      title="Discord"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.211.375-.445.865-.607 1.252a18.27 18.27 0 00-5.487 0c-.161-.387-.399-.877-.61-1.252a.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.08.08 0 00.087-.027c.461-.63.873-1.295 1.226-1.994a.076.076 0 00-.042-.106 13.107 13.107 0 01-1.872-.892.077.077 0 00-.008-.128 10.713 10.713 0 00.372-.294.075.075 0 00.083-.011 14.047 14.047 0 0012.097 0 .075.075 0 00.083.01c.12.098.246.19.372.294a.077.077 0 00-.007.128 12.299 12.299 0 01-1.873.892.076.076 0 00-.041.107c.353.699.765 1.364 1.225 1.994a.081.081 0 00.087.027 19.86 19.86 0 006.002-3.03.077.077 0 00.032-.056c.5-4.506.063-8.933-.419-13.087a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-.965-2.157-2.156 0-1.193.974-2.157 2.157-2.157 1.193 0 2.168.964 2.157 2.157 0 1.19-.974 2.156-2.157 2.156zm7.975 0c-1.183 0-2.157-.965-2.157-2.156 0-1.193.974-2.157 2.157-2.157 1.193 0 2.168.964 2.157 2.157 0 1.19-.964 2.156-2.157 2.156z" />
                      </svg>
                    </a>
                  </div>
                </div>

                <p className="mt-6 text-center text-sm text-slate-600">
                  Or explore the{' '}
                  <button onClick={() => setCurrentView('landing')} className="font-semibold text-indigo-600 hover:text-indigo-500">
                    landing page
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
              <div className="flex items-center gap-3">
                <img src="/assets/nova-logo.jpg" alt="Nova" className="h-10 w-10 rounded-xl object-cover" />
                <div>
                  <p className="text-base font-semibold text-slate-900">Nova</p>
                  <p className="text-xs text-slate-500">Trading Dashboard</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-600">{email}</span>
                <button
                  onClick={handleLogout}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-7xl px-6 py-8">
            <div className="space-y-8">
              {/* Portfolio Overview */}
              <div className="grid gap-6 sm:grid-cols-3">
                <button
                  onClick={() => setShowPortfolioChart(!showPortfolioChart)}
                  className="rounded-[1.5rem] bg-white p-6 shadow-md transition hover:shadow-lg"
                >
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Current Portfolio</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-950">${totalPortfolio.toLocaleString()}</p>
                  <p className="mt-2 text-sm text-indigo-600">↑ Up 4.1% this week</p>
                </button>
                <div className="rounded-[1.5rem] bg-white p-6 shadow-md">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Weekly Returns</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-950">$3,900</p>
                  <p className="mt-2 text-sm text-slate-500">{weeklySummary.trades} trades, 78% win</p>
                </div>
                <button
                  onClick={() => setShowWeeklySummary(!showWeeklySummary)}
                  className="rounded-[1.5rem] bg-indigo-600 p-6 text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-500"
                >
                  <p className="text-sm uppercase tracking-[0.24em] text-indigo-200">Weekly Summary</p>
                  <p className="mt-3 text-3xl font-semibold">See breakdown</p>
                  <ChevronRight className="mt-2 h-5 w-5" />
                </button>
              </div>

              {/* Portfolio Chart */}
              {showPortfolioChart && (
                <div className="rounded-[1.5rem] bg-white p-6 shadow-md">
                  <h3 className="mb-6 text-lg font-semibold text-slate-950">Portfolio History</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={portfolioHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#94a3b8"
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis 
                        stroke="#94a3b8"
                        style={{ fontSize: '12px' }}
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1e293b',
                          border: '1px solid #475569',
                          borderRadius: '12px',
                          color: '#f1f5f9'
                        }}
                        formatter={(value: any) => [`$${(value || 0).toLocaleString()}`, 'Portfolio']}
                        labelStyle={{ color: '#cbd5e1' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#4f46e5" 
                        dot={{ fill: '#4f46e5', r: 5 }}
                        activeDot={{ r: 7 }}
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Weekly Summary */}
              {showWeeklySummary && (
                <div className="rounded-[1.5rem] bg-indigo-600/5 p-6 ring-1 ring-indigo-200">
                  <h3 className="text-sm uppercase tracking-[0.28em] font-semibold text-indigo-700">Weekly Performance</h3>
                  <div className="mt-6 grid gap-4 sm:grid-cols-4">
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <p className="text-sm text-slate-500">Total Trades</p>
                      <p className="mt-3 text-2xl font-semibold text-slate-900">{weeklySummary.trades}</p>
                    </div>
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <p className="text-sm text-slate-500">Win Rate</p>
                      <p className="mt-3 text-2xl font-semibold text-slate-900">{weeklySummary.winRate}</p>
                    </div>
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <p className="text-sm text-slate-500">Avg Profit</p>
                      <p className="mt-3 text-2xl font-semibold text-slate-900">{weeklySummary.avgPl}</p>
                    </div>
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <p className="text-sm text-slate-500">Net Gain</p>
                      <p className="mt-3 text-2xl font-semibold text-slate-900">{weeklySummary.netGain}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Trade Calendar */}
              <div className="rounded-[1.5rem] bg-white p-6 shadow-md">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-slate-950">Trade Calendar</h2>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => changeMonth(-1)}
                      className="rounded-full border border-slate-200 p-2 transition hover:bg-slate-50"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <span className="min-w-[120px] text-center text-lg font-semibold">
                      {getMonthName(currentMonth)} {monthYear[0]}
                    </span>
                    <button
                      onClick={() => changeMonth(1)}
                      className="rounded-full border border-slate-200 p-2 transition hover:bg-slate-50"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="space-y-4">
                  <div className="grid grid-cols-7 gap-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="text-center font-semibold text-slate-500 py-2 text-sm">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                      <div key={`empty-${i}`} className="aspect-square" />
                    ))}

                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const dateStr = `${currentMonth}-${String(day).padStart(2, '0')}`;
                      const dayTrades = currentMonthTrades.find((t) => t.date === dateStr);
                      const hasExpandedDay = expandedDay === dateStr;

                      return (
                        <div key={day}>
                          <button
                            onClick={() => setExpandedDay(hasExpandedDay ? null : dateStr)}
                            className={`aspect-square w-full rounded-lg p-2 text-sm transition ${
                              dayTrades
                                ? 'bg-indigo-50 border-2 border-indigo-300 font-semibold text-indigo-700 hover:bg-indigo-100'
                                : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            {day}
                            {dayTrades && <div className="text-xs mt-1">{dayTrades.trades.length} trade(s)</div>}
                          </button>

                          {hasExpandedDay && dayTrades && (
                            <div className="absolute left-6 right-6 z-10 mt-2 max-h-80 overflow-y-auto rounded-lg bg-white p-4 shadow-xl border border-slate-200">
                              <h4 className="mb-3 font-semibold text-slate-900">
                                {new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                              </h4>
                              <div className="space-y-2">
                                {dayTrades.trades.map((trade) => (
                                  <div key={trade.id} className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-2 rounded-lg bg-slate-50 p-3 text-sm">
                                    <div>
                                      <p className="text-xs text-slate-500">Symbol</p>
                                      <p className="font-semibold">{trade.symbol}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-slate-500">Type</p>
                                      <p className={`font-semibold ${trade.type === 'Call' ? 'text-green-600' : 'text-red-600'}`}>{trade.type}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-slate-500">P/L $</p>
                                      <p className="font-semibold">${trade.pl.toLocaleString()}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-slate-500">P/L %</p>
                                      <p className="font-semibold">{trade.roi}%</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
