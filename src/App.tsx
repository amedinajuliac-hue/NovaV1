import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

// Trade data structure
const allTrades = [
  {
    date: '2026-05-20',
    displayDate: 'Mon, May 20',
    trades: [
      { id: 1, ticket: 'NQ-7700', symbol: 'NQ', contract: '1 Call', amount: 3, close: '$1,425', pl: 1620, roi: 32, type: 'Call' },
      { id: 2, ticket: 'AAPL-193', symbol: 'AAPL', contract: '2 Put', amount: 5, close: '$880', pl: 570, roi: 19, type: 'Put' }
    ]
  },
  {
    date: '2026-05-21',
    displayDate: 'Tue, May 21',
    trades: [
      { id: 3, ticket: 'ES-5600', symbol: 'ES', contract: '1 Call', amount: 2, close: '$780', pl: 920, roi: 42, type: 'Call' }
    ]
  },
  {
    date: '2026-05-22',
    displayDate: 'Wed, May 22',
    trades: [
      { id: 4, ticket: 'TSLA-241', symbol: 'TSLA', contract: '1 Put', amount: 4, close: '$1,220', pl: 870, roi: 25, type: 'Put' }
    ]
  },
  {
    date: '2026-05-23',
    displayDate: 'Thu, May 23',
    trades: [
      { id: 5, ticket: 'SPY-420', symbol: 'SPY', contract: '1 Call', amount: 6, close: '$1,140', pl: 1290, roi: 31, type: 'Call' }
    ]
  },
  {
    date: '2026-05-24',
    displayDate: 'Fri, May 24',
    trades: [
      { id: 6, ticket: 'NVDA-580', symbol: 'NVDA', contract: '1 Put', amount: 2, close: '$610', pl: 410, roi: 23, type: 'Put' },
      { id: 7, ticket: 'MSFT-388', symbol: 'MSFT', contract: '1 Call', amount: 3, close: '$720', pl: 540, roi: 28, type: 'Call' }
    ]
  }
];

const portfolioHistory = [
  { label: 'May 18', value: 95000 },
  { label: 'May 19', value: 96200 },
  { label: 'May 20', value: 97900 },
  { label: 'May 21', value: 99350 },
  { label: 'May 22', value: 100800 },
  { label: 'May 23', value: 102430 },
  { label: 'May 24', value: 103900 }
];

function App() {
  const [currentView, setCurrentView] = useState<'login' | 'landing' | 'dashboard'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('last7days');
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [showPortfolioChart, setShowPortfolioChart] = useState(false);
  const [showWeeklySummary, setShowWeeklySummary] = useState(false);

  const totalPortfolio = 103900;
  const chartMax = Math.max(...portfolioHistory.map((point) => point.value));

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

  const weeklySummary = {
    trades: allTrades.reduce((sum, day) => sum + day.trades.length, 0),
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
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-indigo-600 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-500"
              >
                Sign In
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Or explore the{' '}
              <button onClick={() => setCurrentView('landing')} className="font-semibold text-indigo-600 hover:text-indigo-500">
                landing page
              </button>
            </p>
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
            {currentView === 'dashboard' ? (
              // DASHBOARD
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
                    <div className="mb-6 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-slate-950">Portfolio History</h3>
                      <select
                        value={selectedDateRange}
                        onChange={(e) => setSelectedDateRange(e.target.value)}
                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm outline-none"
                      >
                        <option value="last7days">Last 7 days</option>
                        <option value="last30days">Last 30 days</option>
                        <option value="alltime">All time</option>
                      </select>
                    </div>
                    <div className="flex h-64 items-end gap-3">
                      {portfolioHistory.map((point) => {
                        const height = ((point.value - 94000) / (chartMax - 94000)) * 100;
                        return (
                          <div key={point.label} className="flex-1 text-center">
                            <div className="mx-auto h-64 max-w-[28px] rounded-full bg-slate-200">
                              <div
                                className="h-full w-full rounded-full bg-gradient-to-t from-indigo-500 to-cyan-400 transition-all"
                                style={{ height: `${Math.max(height, 10)}%` }}
                              />
                            </div>
                            <p className="mt-3 text-xs font-medium text-slate-500">{point.label}</p>
                          </div>
                        );
                      })}
                    </div>
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
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-slate-950">Trade Calendar</h2>
                  {allTrades.map((day) => (
                    <div key={day.date} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                      <button
                        onClick={() => setExpandedDay(expandedDay === day.date ? null : day.date)}
                        className="flex w-full items-center justify-between gap-4"
                      >
                        <div>
                          <p className="text-sm uppercase tracking-[0.24em] font-semibold text-indigo-600">{day.displayDate}</p>
                          <p className="mt-2 text-lg font-semibold text-slate-900">{day.trades.length} trade(s)</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
                            ${day.trades.reduce((sum, t) => sum + t.pl, 0).toLocaleString()}
                          </span>
                          <ChevronRight
                            className={`h-5 w-5 text-slate-400 transition-transform ${expandedDay === day.date ? 'rotate-90' : ''}`}
                          />
                        </div>
                      </button>

                      {expandedDay === day.date && (
                        <div className="mt-6 space-y-3 border-t border-slate-200 pt-6">
                          {day.trades.map((trade) => (
                            <div key={trade.id} className="grid gap-4 rounded-2xl bg-slate-50 p-4 md:grid-cols-[1fr_1fr_1fr_1fr_1fr]">
                              <div>
                                <p className="text-xs uppercase text-slate-500">Symbol</p>
                                <p className="mt-1 font-semibold text-slate-900">{trade.symbol}</p>
                              </div>
                              <div>
                                <p className="text-xs uppercase text-slate-500">Ticket</p>
                                <p className="mt-1 font-semibold text-slate-900">{trade.ticket}</p>
                              </div>
                              <div>
                                <p className="text-xs uppercase text-slate-500">Type</p>
                                <p className={`mt-1 font-semibold ${trade.type === 'Call' ? 'text-green-600' : 'text-red-600'}`}>
                                  {trade.type}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs uppercase text-slate-500">P/L $</p>
                                <p className="mt-1 font-semibold text-slate-900">${trade.pl.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-xs uppercase text-slate-500">P/L %</p>
                                <p className="mt-1 font-semibold text-slate-900">{trade.roi}%</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // LANDING PAGE (Simplified)
              <div className="space-y-16">
                {/* Hero */}
                <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
                  <div className="space-y-6">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                      Trade smarter. Analyze better.
                    </h1>
                    <p className="max-w-2xl text-lg leading-8 text-slate-600">
                      Nova brings your daily trades, portfolio performance, and weekly insights into one beautiful, real-time dashboard.
                    </p>
                    <button
                      onClick={() => setCurrentView('dashboard')}
                      className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-500"
                    >
                      View Dashboard <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                  <img
                    src="/assets/nova-logo.jpg"
                    alt="Nova Dashboard"
                    className="rounded-[2rem] object-cover shadow-xl"
                  />
                </section>

                {/* How it works */}
                <section className="rounded-[2rem] bg-white p-8 shadow-md">
                  <h2 className="text-2xl font-bold text-slate-950">How it works</h2>
                  <div className="mt-8 grid gap-6 sm:grid-cols-3">
                    {[
                      { num: 1, title: 'Log in', desc: 'Sign in with your email and password.' },
                      { num: 2, title: 'See trades', desc: 'Review all your trades in a clean calendar view.' },
                      { num: 3, title: 'Analyze', desc: 'Track weekly summaries and portfolio growth.' }
                    ].map((step) => (
                      <div key={step.num} className="space-y-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
                          {step.num}
                        </div>
                        <h3 className="font-semibold text-slate-900">{step.title}</h3>
                        <p className="text-slate-600">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}
          </main>
        </>
      )}
    </div>
  );
}

export default App;
