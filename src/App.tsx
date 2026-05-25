import { useState } from 'react';
import { ChevronRight, ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Expanded trade data by month with day details
const tradesByMonth = {
  '2025-04': [
    {
      date: '2025-04-01',
      day: 1,
      pl: 468,
      trades: 2,
      winRate: 100,
      type: 'win',
      tradesInfo: [
        { symbol: 'AAPL', ticket: 'AAPL2405C', type: 'Call', pl: 280, plPercent: 5.9 },
        { symbol: 'SPY', ticket: 'SPY2405P', type: 'Put', pl: 188, plPercent: 3.7 }
      ]
    },
    {
      date: '2025-04-03',
      day: 3,
      pl: 134,
      trades: 2,
      winRate: 50,
      type: 'mixed',
      tradesInfo: [
        { symbol: 'NVDA', ticket: 'NVDA2405C', type: 'Call', pl: 210, plPercent: 4.1 },
        { symbol: 'QQQ', ticket: 'QQQ2405P', type: 'Put', pl: -76, plPercent: -1.5 }
      ]
    },
    {
      date: '2025-04-04',
      day: 4,
      pl: 229,
      trades: 1,
      winRate: 100,
      type: 'win',
      tradesInfo: [
        { symbol: 'MSFT', ticket: 'MSFT2405C', type: 'Call', pl: 229, plPercent: 4.8 }
      ]
    },
    {
      date: '2025-04-07',
      day: 7,
      pl: 63,
      trades: 3,
      winRate: 33.33,
      type: 'loss',
      tradesInfo: [
        { symbol: 'TSLA', ticket: 'TSLA2405P', type: 'Put', pl: -120, plPercent: -2.4 },
        { symbol: 'NFLX', ticket: 'NFLX2405C', type: 'Call', pl: 90, plPercent: 1.8 },
        { symbol: 'AMD', ticket: 'AMD2405P', type: 'Put', pl: 93, plPercent: 1.9 }
      ]
    },
    {
      date: '2025-04-08',
      day: 8,
      pl: 715,
      trades: 1,
      winRate: 100,
      type: 'win',
      tradesInfo: [
        { symbol: 'GOOG', ticket: 'GOOG2405C', type: 'Call', pl: 715, plPercent: 9.1 }
      ]
    },
    {
      date: '2025-04-09',
      day: 9,
      pl: 383,
      trades: 2,
      winRate: 50,
      type: 'mixed',
      tradesInfo: [
        { symbol: 'AMZN', ticket: 'AMZN2405P', type: 'Put', pl: -120, plPercent: -2.3 },
        { symbol: 'SPY', ticket: 'SPY2405C', type: 'Call', pl: 503, plPercent: 4.7 }
      ]
    },
    {
      date: '2025-04-10',
      day: 10,
      pl: 92.5,
      trades: 9,
      winRate: 25,
      type: 'loss',
      tradesInfo: [
        { symbol: 'AAPL', ticket: 'AAPL2405P', type: 'Put', pl: 60, plPercent: 1.2 },
        { symbol: 'TSLA', ticket: 'TSLA2405C', type: 'Call', pl: -150, plPercent: -3.0 },
        { symbol: 'QQQ', ticket: 'QQQ2405P', type: 'Put', pl: 183, plPercent: 2.8 }
      ]
    },
    {
      date: '2025-04-11',
      day: 11,
      pl: 206,
      trades: 3,
      winRate: 50,
      type: 'mixed',
      tradesInfo: [
        { symbol: 'NVDA', ticket: 'NVDA2405C', type: 'Call', pl: 250, plPercent: 5.2 },
        { symbol: 'MSFT', ticket: 'MSFT2405P', type: 'Put', pl: -44, plPercent: -0.9 }
      ]
    },
    {
      date: '2025-04-13',
      day: 13,
      pl: -586,
      trades: 4,
      winRate: 0,
      type: 'loss',
      tradesInfo: [
        { symbol: 'AAPL', ticket: 'AAPL2405P', type: 'Put', pl: -180, plPercent: -3.6 },
        { symbol: 'GOOG', ticket: 'GOOG2405C', type: 'Call', pl: -240, plPercent: -4.5 },
        { symbol: 'SPY', ticket: 'SPY2405P', type: 'Put', pl: -166, plPercent: -2.8 }
      ]
    },
    {
      date: '2025-04-14',
      day: 14,
      pl: 880,
      trades: 5,
      winRate: 50,
      type: 'mixed',
      tradesInfo: [
        { symbol: 'NVDA', ticket: 'NVDA2405C', type: 'Call', pl: 330, plPercent: 5.7 },
        { symbol: 'TSLA', ticket: 'TSLA2405P', type: 'Put', pl: 550, plPercent: 8.2 }
      ]
    },
    {
      date: '2025-04-15',
      day: 15,
      pl: 663,
      trades: 1,
      winRate: 100,
      type: 'win',
      tradesInfo: [
        { symbol: 'NFLX', ticket: 'NFLX2405C', type: 'Call', pl: 663, plPercent: 7.0 }
      ]
    },
    {
      date: '2025-04-16',
      day: 16,
      pl: 311,
      trades: 2,
      winRate: 100,
      type: 'win',
      tradesInfo: [
        { symbol: 'AMZN', ticket: 'AMZN2405C', type: 'Call', pl: 180, plPercent: 2.6 },
        { symbol: 'AAPL', ticket: 'AAPL2405C', type: 'Call', pl: 131, plPercent: 2.4 }
      ]
    },
    {
      date: '2025-04-17',
      day: 17,
      pl: 170,
      trades: 1,
      winRate: 100,
      type: 'win',
      tradesInfo: [
        { symbol: 'GOOG', ticket: 'GOOG2405P', type: 'Put', pl: 170, plPercent: 2.9 }
      ]
    },
    {
      date: '2025-04-21',
      day: 21,
      pl: -222,
      trades: 3,
      winRate: 0,
      type: 'loss',
      tradesInfo: [
        { symbol: 'TSLA', ticket: 'TSLA2405C', type: 'Call', pl: -120, plPercent: -2.5 },
        { symbol: 'SPY', ticket: 'SPY2405P', type: 'Put', pl: -102, plPercent: -1.8 }
      ]
    },
    {
      date: '2025-04-22',
      day: 22,
      pl: -546,
      trades: 2,
      winRate: 0,
      type: 'loss',
      tradesInfo: [
        { symbol: 'AAPL', ticket: 'AAPL2405P', type: 'Put', pl: -300, plPercent: -4.9 },
        { symbol: 'NVDA', ticket: 'NVDA2405C', type: 'Call', pl: -246, plPercent: -3.6 }
      ]
    },
    {
      date: '2025-04-23',
      day: 23,
      pl: 248,
      trades: 1,
      winRate: 100,
      type: 'win',
      tradesInfo: [
        { symbol: 'MSFT', ticket: 'MSFT2405C', type: 'Call', pl: 248, plPercent: 4.2 }
      ]
    },
    {
      date: '2025-04-24',
      day: 24,
      pl: -493,
      trades: 5,
      winRate: 40,
      type: 'loss',
      tradesInfo: [
        { symbol: 'QQQ', ticket: 'QQQ2405P', type: 'Put', pl: -93, plPercent: -1.6 },
        { symbol: 'GOOG', ticket: 'GOOG2405P', type: 'Put', pl: -220, plPercent: -3.2 },
        { symbol: 'TSLA', ticket: 'TSLA2405C', type: 'Call', pl: -180, plPercent: -3.8 }
      ]
    },
    {
      date: '2025-04-28',
      day: 28,
      pl: 570,
      trades: 1,
      winRate: 100,
      type: 'win',
      tradesInfo: [
        { symbol: 'SPY', ticket: 'SPY2405C', type: 'Call', pl: 570, plPercent: 6.8 }
      ]
    }
  ],
  '2026-04': [
    {
      date: '2026-04-01',
      day: 1,
      pl: 450,
      trades: 2,
      winRate: 100,
      type: 'win',
      tradesInfo: [
        { symbol: 'AAPL', ticket: 'AAPL2604C', type: 'Call', pl: 280, plPercent: 5.5 },
        { symbol: 'SPY', ticket: 'SPY2604P', type: 'Put', pl: 170, plPercent: 3.3 }
      ]
    },
    {
      date: '2026-04-03',
      day: 3,
      pl: 620,
      trades: 2,
      winRate: 50,
      type: 'mixed',
      tradesInfo: [
        { symbol: 'NVDA', ticket: 'NVDA2604C', type: 'Call', pl: 430, plPercent: 8.5 },
        { symbol: 'QQQ', ticket: 'QQQ2604P', type: 'Put', pl: 190, plPercent: 3.1 }
      ]
    },
    {
      date: '2026-04-05',
      day: 5,
      pl: 520,
      trades: 1,
      winRate: 100,
      type: 'win',
      tradesInfo: [
        { symbol: 'MSFT', ticket: 'MSFT2604C', type: 'Call', pl: 520, plPercent: 5.6 }
      ]
    },
    {
      date: '2026-04-08',
      day: 8,
      pl: 890,
      trades: 3,
      winRate: 100,
      type: 'win',
      tradesInfo: [
        { symbol: 'GOOG', ticket: 'GOOG2604C', type: 'Call', pl: 470, plPercent: 7.2 },
        { symbol: 'AMZN', ticket: 'AMZN2604P', type: 'Put', pl: 420, plPercent: 5.4 }
      ]
    },
    {
      date: '2026-04-12',
      day: 12,
      pl: 750,
      trades: 2,
      winRate: 100,
      type: 'win',
      tradesInfo: [
        { symbol: 'TSLA', ticket: 'TSLA2604P', type: 'Put', pl: 410, plPercent: 6.0 },
        { symbol: 'SPY', ticket: 'SPY2604C', type: 'Call', pl: 340, plPercent: 4.8 }
      ]
    },
    {
      date: '2026-04-15',
      day: 15,
      pl: 630,
      trades: 1,
      winRate: 100,
      type: 'win',
      tradesInfo: [
        { symbol: 'NFLX', ticket: 'NFLX2604C', type: 'Call', pl: 630, plPercent: 6.3 }
      ]
    },
    {
      date: '2026-04-18',
      day: 18,
      pl: 780,
      trades: 2,
      winRate: 100,
      type: 'win',
      tradesInfo: [
        { symbol: 'AAPL', ticket: 'AAPL2604C', type: 'Call', pl: 380, plPercent: 5.2 },
        { symbol: 'MSFT', ticket: 'MSFT2604P', type: 'Put', pl: 400, plPercent: 6.1 }
      ]
    },
    {
      date: '2026-04-22',
      day: 22,
      pl: 540,
      trades: 2,
      winRate: 100,
      type: 'win',
      tradesInfo: [
        { symbol: 'NVDA', ticket: 'NVDA2604C', type: 'Call', pl: 290, plPercent: 4.7 },
        { symbol: 'SPY', ticket: 'SPY2604C', type: 'Call', pl: 250, plPercent: 3.9 }
      ]
    },
    {
      date: '2026-04-25',
      day: 25,
      pl: 710,
      trades: 1,
      winRate: 100,
      type: 'win',
      tradesInfo: [
        { symbol: 'GOOG', ticket: 'GOOG2604C', type: 'Call', pl: 710, plPercent: 7.3 }
      ]
    },
    {
      date: '2026-04-29',
      day: 29,
      pl: 480,
      trades: 2,
      winRate: 100,
      type: 'win',
      tradesInfo: [
        { symbol: 'AMZN', ticket: 'AMZN2604C', type: 'Call', pl: 280, plPercent: 4.1 },
        { symbol: 'AAPL', ticket: 'AAPL2604P', type: 'Put', pl: 200, plPercent: 2.9 }
      ]
    }
  ],
  '2026-05': [
    {
      date: '2026-05-20',
      day: 20,
      pl: 1620,
      trades: 2,
      winRate: 100,
      type: 'win',
      tradesInfo: [
        { symbol: 'AAPL', ticket: 'AAPL2605C', type: 'Call', pl: 900, plPercent: 10.1 },
        { symbol: 'NVDA', ticket: 'NVDA2605P', type: 'Put', pl: 720, plPercent: 8.2 }
      ]
    },
    {
      date: '2026-05-21',
      day: 21,
      pl: 920,
      trades: 1,
      winRate: 100,
      type: 'win',
      tradesInfo: [
        { symbol: 'MSFT', ticket: 'MSFT2605C', type: 'Call', pl: 920, plPercent: 7.6 }
      ]
    },
    {
      date: '2026-05-22',
      day: 22,
      pl: 870,
      trades: 1,
      winRate: 100,
      type: 'win',
      tradesInfo: [
        { symbol: 'GOOG', ticket: 'GOOG2605P', type: 'Put', pl: 870, plPercent: 9.0, status: 'Pending' }
      ]
    },
    {
      date: '2026-05-23',
      day: 23,
      pl: 1290,
      trades: 1,
      winRate: 100,
      type: 'win',
      tradesInfo: [
        { symbol: 'TSLA', ticket: 'TSLA2605C', type: 'Call', pl: 1290, plPercent: 12.6 }
      ]
    },
    {
      date: '2026-05-24',
      day: 24,
      pl: 950,
      trades: 2,
      winRate: 100,
      type: 'win',
      tradesInfo: [
        { symbol: 'SPY', ticket: 'SPY2605C', type: 'Call', pl: 530, plPercent: 4.8 },
        { symbol: 'QQQ', ticket: 'QQQ2605P', type: 'Put', pl: 420, plPercent: 3.9 }
      ]
    }
  ]
};

const allTimePortfolioData = [
  { date: 'Jan', value: 50000 },
  { date: 'Feb', value: 52000 },
  { date: 'Mar', value: 48000 },
  { date: 'Apr', value: 55000 },
  { date: 'May', value: 60000 },
  { date: 'Jun', value: 58000 },
  { date: 'Jul', value: 65000 },
  { date: 'Aug', value: 70000 },
  { date: 'Sep', value: 68000 },
  { date: 'Oct', value: 75000 },
  { date: 'Nov', value: 82000 },
  { date: 'Dec', value: 95000 }
];

const dayPortfolioData = [
  { date: 'Mon', value: 95000 },
  { date: 'Tue', value: 96200 },
  { date: 'Wed', value: 97900 },
  { date: 'Thu', value: 99350 },
  { date: 'Fri', value: 100800 },
  { date: 'Sat', value: 102430 },
  { date: 'Sun', value: 103900 }
];

const weekPortfolioData = [
  { date: 'W1', value: 95000 },
  { date: 'W2', value: 97200 },
  { date: 'W3', value: 99500 },
  { date: 'W4', value: 101800 },
  { date: 'W5', value: 103900 }
];

const monthPortfolioData = [
  { date: 'Week 1', value: 95000 },
  { date: 'Week 2', value: 97200 },
  { date: 'Week 3', value: 99500 },
  { date: 'Week 4', value: 103900 }
];

const threeMonthsPortfolioData = [
  { date: 'Mar', value: 95000 },
  { date: 'Apr', value: 105000 },
  { date: 'May', value: 103900 }
];

const sixMonthsPortfolioData = [
  { date: 'Dec', value: 60000 },
  { date: 'Jan', value: 62000 },
  { date: 'Feb', value: 65000 },
  { date: 'Mar', value: 70000 },
  { date: 'Apr', value: 85000 },
  { date: 'May', value: 103900 }
];

const yearPortfolioData = [
  { date: 'May 24', value: 50000 },
  { date: 'Aug 24', value: 55000 },
  { date: 'Nov 24', value: 65000 },
  { date: 'Feb 25', value: 75000 },
  { date: 'May 25', value: 103900 }
];

function App() {
  const [currentView, setCurrentView] = useState<'login' | 'landing' | 'dashboard'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [currentMonth, setCurrentMonth] = useState('2026-05');
  const [showPortfolioChart, setShowPortfolioChart] = useState(false);
  const [dateRange, setDateRange] = useState('week');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

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
    return new Date(parseInt(year), parseInt(month), 0).getDate();
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
  };

  const currentMonthTrades = tradesByMonth[currentMonth as keyof typeof tradesByMonth] || [];
  const [monthYear] = currentMonth.split('-');
  const daysInMonth = getMonthDays(currentMonth);
  const firstDayOfMonth = new Date(`${currentMonth}-01`).getDay();

  const getPortfolioData = () => {
    switch (dateRange) {
      case 'day':
        return dayPortfolioData;
      case 'week':
        return weekPortfolioData;
      case 'month':
        return monthPortfolioData;
      case 'threeMonths':
        return threeMonthsPortfolioData;
      case 'sixmonths':
        return sixMonthsPortfolioData;
      case 'year':
        return yearPortfolioData;
      default:
        return allTimePortfolioData;
    }
  };

  const selectedDayData = selectedDate
    ? currentMonthTrades.find((t) => t.date === selectedDate) || {
        date: selectedDate,
        day: parseInt(selectedDate.split('-')[2], 10),
        pl: 0,
        trades: 0,
        winRate: 0,
        type: 'no-trade',
        tradesInfo: []
      }
    : null;

  const calculateWeeklyStats = () => {
    const rows: Array<{
      cells: Array<null | { day: number; dateStr: string; dayData: typeof selectedDayData }>; 
      rowPl: number;
      rowTrades: number;
    }> = [];

    let currentDay = 1;
    const totalCells = firstDayOfMonth + daysInMonth;
    const totalRows = Math.ceil(totalCells / 7);

    for (let row = 0; row < totalRows; row += 1) {
      let rowPl = 0;
      let rowTrades = 0;
      const cells: Array<null | { day: number; dateStr: string; dayData: typeof currentMonthTrades[number] | null }> = [];

      for (let col = 0; col < 7; col += 1) {
        const cellIndex = row * 7 + col;
        if (cellIndex < firstDayOfMonth || currentDay > daysInMonth) {
          cells.push(null);
        } else {
          const dateStr = `${currentMonth}-${String(currentDay).padStart(2, '0')}`;
          const existingDayData = currentMonthTrades.find((t) => t.date === dateStr);
          const dayData = existingDayData || {
            date: dateStr,
            day: currentDay,
            pl: 0,
            trades: 0,
            winRate: 0,
            type: 'no-trade',
            tradesInfo: []
          };

          rowPl += dayData.pl;
          rowTrades += dayData.trades;
          cells.push({ day: currentDay, dateStr, dayData });
          currentDay += 1;
        }
      }

      rows.push({ cells, rowPl, rowTrades });
    }

    return rows;
  };

  const calendarRows = calculateWeeklyStats();
  const monthNet = currentMonthTrades.reduce((sum, item) => sum + item.pl, 0);
  const monthTrades = currentMonthTrades.reduce((sum, item) => sum + item.trades, 0);

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

                <div className="mt-4 text-center">
                  <button
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-6">
                  <p className="mb-4 text-center text-sm text-slate-600">Follow us</p>
                  <div className="flex justify-center gap-4">
                    <a
                      href="https://x.com/novatraderofficial"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900"
                      title="X"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
                      </svg>
                    </a>
                    <a
                      href="https://instagram.com/novatraderofficial"
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
                      href="https://discord.gg/cMeEXC9Ua"
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
                  <p className="mt-3 text-3xl font-semibold text-slate-950">$103,900</p>
                  <p className="mt-2 text-sm text-indigo-600">↑ Up 4.1% this week</p>
                </button>
                <div className="rounded-[1.5rem] bg-white p-6 shadow-md">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Weekly Returns</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-950">$3,900</p>
                  <p className="mt-2 text-sm text-slate-500">5 trades, 100% win</p>
                </div>
                <div className="rounded-[1.5rem] bg-indigo-600 p-6 text-white shadow-lg shadow-indigo-500/20">
                  <p className="text-sm uppercase tracking-[0.24em] text-indigo-200">This Month</p>
                  <p className="mt-3 text-3xl font-semibold">May 2026</p>
                  <p className="mt-2 text-sm text-indigo-100">5 trading days</p>
                </div>
              </div>

              {/* Portfolio Chart */}
              {showPortfolioChart && (
                <div className="rounded-[1.5rem] bg-white p-8 shadow-md">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-950">Portfolio History</h3>
                    <div className="flex gap-2 flex-wrap">
                      {[
                        { label: 'Day', value: 'day' },
                        { label: 'Week', value: 'week' },
                        { label: 'Month', value: 'month' },
                        { label: '3M', value: 'threeMonths' },
                        { label: '6M', value: 'sixmonths' },
                        { label: '1Y', value: 'year' },
                        { label: 'All', value: 'all' }
                      ].map((range) => (
                        <button
                          key={range.value}
                          onClick={() => setDateRange(range.value)}
                          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                            dateRange === range.value
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={getPortfolioData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        stroke="#94a3b8"
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis 
                        stroke="#94a3b8"
                        style={{ fontSize: '12px' }}
                        tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
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
                        stroke="#3b82f6" 
                        dot={false}
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Trade Calendar */}
              <div className="rounded-[1.5rem] bg-slate-900 p-8 shadow-lg">
                <div className="mb-8 grid gap-6 xl:grid-cols-[1fr_auto]">
                  <div className="flex flex-wrap items-center gap-6">
                    <button
                      onClick={() => changeMonth(-1)}
                      className="rounded-full p-2 transition hover:bg-slate-800"
                    >
                      <ChevronLeft className="h-6 w-6 text-white" />
                    </button>
                    <div>
                      <span className="text-2xl font-bold text-white">{getMonthName(currentMonth)} {monthYear}</span>
                    </div>
                    <button
                      onClick={() => changeMonth(1)}
                      className="rounded-full p-2 transition hover:bg-slate-800"
                    >
                      <ChevronRight className="h-6 w-6 text-white" />
                    </button>
                    <button className="ml-4 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-slate-600 hover:text-white">
                      This month
                    </button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-slate-700 bg-slate-800/95 p-4">
                      <p className="text-sm uppercase tracking-[0.24em] text-slate-200">Month net</p>
                      <p className={`mt-2 text-2xl font-semibold ${monthNet >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {monthNet >= 0 ? '+' : ''}${monthNet.toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-3xl border border-slate-700 bg-slate-800/95 p-4">
                      <p className="text-sm uppercase tracking-[0.24em] text-slate-200">Total trades</p>
                      <p className="mt-2 text-2xl font-semibold text-white">{monthTrades}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="text-center font-semibold text-slate-400 py-2 text-sm">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    {calendarRows.map((week, rowIndex) => (
                      <div
                        key={rowIndex}
                        className="grid gap-2"
                        style={{ gridTemplateColumns: 'repeat(7, minmax(0, 1fr)) 160px' }}
                      >
                        {week.cells.map((cell, idx) => {
                          if (!cell) {
                            return <div key={`${rowIndex}-${idx}`} className="aspect-square rounded-lg bg-slate-800" />;
                          }

                          const { day, dateStr, dayData } = cell;
                          const hasPendingTrade = dayData.tradesInfo?.some((trade) => trade.status?.toLowerCase() === 'pending');
                          const isPositive = !hasPendingTrade && dayData.trades > 0 && dayData.pl > 0;
                          const isNegative = !hasPendingTrade && dayData.trades > 0 && dayData.pl <= 0;
                          const isSelected = selectedDate === dateStr;
                          const dayStatus = hasPendingTrade ? 'pending' : isPositive ? 'positive' : isNegative ? 'negative' : 'empty';

                          return (
                            <button
                              key={`${rowIndex}-${idx}`}
                              onClick={() => setSelectedDate(dateStr)}
                              className={`aspect-square rounded-lg border-2 p-2 flex flex-col justify-between text-left transition duration-200 ease-out ${
                                isSelected
                                  ? 'border-indigo-400 bg-slate-700 shadow-lg shadow-indigo-500/20'
                                  : dayStatus === 'positive'
                                  ? 'border-emerald-300 bg-emerald-100/90 hover:border-emerald-400 hover:bg-emerald-100 hover:scale-[1.02]'
                                  : dayStatus === 'pending'
                                  ? 'border-amber-300 bg-amber-100/90 hover:border-amber-400 hover:bg-amber-100 hover:scale-[1.02]'
                                  : dayStatus === 'negative'
                                  ? 'border-red-300 bg-red-100/90 hover:border-red-400 hover:bg-red-100 hover:scale-[1.02]'
                                  : 'border-slate-700 bg-slate-800/90 hover:border-slate-500 hover:bg-slate-800/90'
                              }`}
                            >
                              <div>
                                <p className="text-xs text-slate-500 font-medium">{day}</p>
                                <p className={`text-sm font-semibold mt-1 ${
                                  dayStatus === 'positive'
                                    ? 'text-emerald-700'
                                    : dayStatus === 'pending'
                                    ? 'text-amber-700'
                                    : 'text-slate-500'
                                }`}>
                                  {dayData.pl > 0 ? '+' : ''}${Math.abs(dayData.pl)}
                                </p>
                              </div>
                              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                                {dayData.trades} trades
                              </div>
                            </button>
                          );
                        })}

                        <div className="rounded-3xl border border-slate-700 bg-slate-800/80 p-4 text-sm text-slate-200">
                          <div className="mb-2 text-slate-400">Week total</div>
                          <div className={`text-xl font-semibold ${week.rowPl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {week.rowPl >= 0 ? '+' : ''}${week.rowPl.toLocaleString()}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">{week.rowTrades} trades</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {selectedDayData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
                  <button
                    onClick={() => setSelectedDate(null)}
                    aria-label="Close trade details"
                    className="absolute right-6 top-6 inline-flex h-14 w-14 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-900 text-2xl font-bold shadow-2xl shadow-black/25 transition hover:bg-slate-100"
                  >
                    ×
                  </button>
                  <div className="relative w-full max-w-3xl rounded-[2rem] bg-slate-900 p-6 shadow-2xl shadow-slate-950/40">
                    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Trade day details</p>
                        <h2 className="mt-2 text-2xl font-semibold text-white">{new Date(selectedDayData.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</h2>
                      </div>
                      <div className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-300">
                        {selectedDayData.type === 'no-trade' ? 'No trades' : selectedDayData.type}
                      </div>
                    </div>

                    <div className="rounded-3xl border border-slate-700 bg-slate-800/90 p-4 mb-6">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Trades</p>
                      <p className="mt-2 text-xl font-semibold text-white">{selectedDayData.trades}</p>
                    </div>

                    {selectedDayData.tradesInfo.length > 0 ? (
                      <div className="overflow-x-auto rounded-3xl border border-slate-700 bg-slate-950/80 p-4">
                        <table className="min-w-full text-left text-sm text-slate-200">
                          <thead>
                            <tr className="border-b border-slate-700 text-slate-400">
                              <th className="px-3 py-2">Symbol</th>
                              <th className="px-3 py-2">Ticket</th>
                              <th className="px-3 py-2">Type</th>
                              <th className="px-3 py-2">Status</th>
                              <th className="px-3 py-2">P/L $</th>
                              <th className="px-3 py-2">P/L %</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedDayData.tradesInfo.map((trade, index) => (
                              <tr key={index} className="border-b border-slate-700 last:border-b-0">
                                <td className="px-3 py-3 font-medium text-white">{trade.symbol}</td>
                                <td className="px-3 py-3 text-slate-300">{trade.ticket}</td>
                                <td className="px-3 py-3 text-slate-300">{trade.type}</td>
                                <td className="px-3 py-3 text-slate-300">{trade.status || 'Closed'}</td>
                                <td className={`px-3 py-3 font-semibold ${trade.pl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{trade.pl >= 0 ? '+' : ''}${trade.pl}</td>
                                <td className={`px-3 py-3 ${trade.plPercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{trade.plPercent >= 0 ? '+' : ''}{trade.plPercent}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="rounded-3xl border border-slate-700 bg-slate-950/80 p-6 text-slate-300">
                        <p className="text-base font-semibold text-white">No trades for this day</p>
                        <p className="mt-2 text-sm text-slate-400">This day had no recorded trades, but it's still visible in the calendar so you can review the schedule.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
