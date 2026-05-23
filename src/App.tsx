import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  RotateCw, 
  Bell, 
  Settings, 
  Plus, 
  Eye, 
  X,
  Clock,
  Calendar,
  Layers,
  Activity,
  ChevronDown,
  Volume2
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Tab = 'Tracker' | 'Week' | 'Manual' | 'Settings';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Tracker');
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState('00:00:00');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] p-4">
      {/* macOS Menu Bar Mockup */}
      <div className="w-[380px] h-[28px] bg-black rounded-t-xl flex items-center justify-between px-4 text-[11px] font-medium text-white/90">
        <div className="flex items-center gap-2">
          <Activity size={13} className="text-brand-accent" />
          <span className="font-semibold">Monitask</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="opacity-70">Sat May 23  10:42 AM</span>
        </div>
      </div>

      {/* Main Popover */}
      <div className="mac-popover border border-brand-border rounded-b-xl shadow-2xl overflow-hidden bg-brand-bg">
        {/* Header */}
        <header className="px-5 pt-5 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center shadow-lg shadow-brand-accent/20">
              <Activity size={18} className="text-white" />
            </div>
            <h1 className="text-lg font-bold tracking-tight">Monitask</h1>
          </div>
          <div className="flex items-center gap-3.5 text-white/50">
            <button className="hover:text-white transition-colors"><RotateCw size={18} /></button>
            <button className="hover:text-white transition-colors relative">
              <Bell size={18} />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-brand-bg"></div>
            </button>
            <button className="hover:text-white transition-colors"><Settings size={18} /></button>
          </div>
        </header>

        {/* Tab Switcher */}
        <div className="px-5 pb-5">
          <div className="bg-brand-card p-1 rounded-xl flex">
            {(['Tracker', 'Week', 'Manual', 'Settings'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200",
                  activeTab === tab 
                    ? "bg-brand-secondary text-white shadow-sm" 
                    : "text-white/30 hover:text-white/60"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <main className="flex-1 overflow-y-auto px-5 custom-scrollbar pb-4">
          {activeTab === 'Tracker' && <TrackerView isRunning={isRunning} setIsRunning={setIsRunning} timer={timer} />}
          {activeTab === 'Week' && <WeekView />}
          {activeTab === 'Manual' && <ManualView />}
          {activeTab === 'Settings' && <SettingsView />}
        </main>

        {/* Footer */}
        <footer className="px-5 py-3 bg-brand-card/40 border-t border-brand-border flex items-center justify-between text-[10px] text-white/30 font-medium">
          <div className="flex items-center gap-1">
            <span>Last sync: May 22 6:55 PM</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
            <span className="text-white/50">Online</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

const TrackerView: React.FC<{ isRunning: boolean; setIsRunning: (v: boolean) => void; timer: string }> = ({ isRunning, setIsRunning, timer }) => {
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex justify-between items-center text-[10px] font-bold text-white/20 uppercase tracking-widest px-1">
        <span>Week Total</span>
        <span className="text-white/60 font-mono">00h 48m</span>
      </div>

      {/* Timer Card */}
      <div className="bg-brand-card border border-brand-border rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <button className="flex items-center gap-2 text-[13px] font-semibold text-white/90 bg-brand-secondary px-3 py-1.5 rounded-lg hover:bg-brand-secondary/80 transition-colors">
            Other <ChevronDown size={14} className="text-white/30" />
          </button>
          <div className="flex gap-2">
            <span className="text-[10px] px-2 py-0.5 bg-brand-accent/10 text-brand-accent rounded-full font-bold">PRO</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center py-4">
          <div className="text-[52px] font-mono tracking-tighter tabular-nums mb-8 font-medium leading-none">
            {timer}
          </div>
          
          <div className="flex items-center gap-8">
            {!isRunning ? (
              <button 
                onClick={() => setIsRunning(true)}
                className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center hover:bg-brand-accent/90 transition-all shadow-xl shadow-brand-accent/30 active:scale-95"
              >
                <Play fill="white" size={28} className="text-white ml-1" />
              </button>
            ) : (
              <>
                <button 
                  onClick={() => setIsRunning(false)}
                  className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all active:scale-95"
                >
                  <Pause fill="white" size={20} className="text-white" />
                </button>
                <button 
                  onClick={() => setIsRunning(false)}
                  className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-all shadow-xl shadow-red-500/30 active:scale-95"
                >
                  <Square fill="white" size={22} className="text-white" />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center">
          <div className="flex items-center gap-2 bg-brand-bg/50 px-3 py-1.5 rounded-full border border-brand-border/50">
            <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.4)]"></div>
            <span className="text-[11px] font-medium text-white/70 tracking-tight">Monitask App UI Design</span>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="space-y-2.5">
        <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest px-1">Working on</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Add task notes..." 
            className="flex-1 bg-brand-card border border-brand-border rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-accent/40 placeholder:text-white/10 transition-all"
          />
          <button className="bg-brand-accent hover:bg-brand-accent/90 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-brand-accent/10 active:scale-95">
            Add
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3 pb-2">
        <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest px-1">Recent Tasks</label>
        <div className="space-y-2">
          <TaskRow name="Design System" time="0h 15m" active />
          <TaskRow name="Feature/Tracker-UI" time="0h 33m" />
          <TaskRow name="Bug/Sidebar-Fix" time="0h" />
        </div>
      </div>
    </div>
  );
};

const TaskRow: React.FC<{ name: string; time: string; active?: boolean }> = ({ name, time, active }) => (
  <div className={cn(
    "group flex items-center justify-between p-3.5 rounded-xl transition-all border border-transparent",
    active ? "bg-brand-accent/5 border-brand-accent/10" : "hover:bg-brand-card/50"
  )}>
    <div className="flex flex-col gap-0.5">
      <span className={cn("text-xs font-semibold tracking-tight", active ? "text-brand-accent" : "text-white/80")}>{name}</span>
      <span className="text-[10px] text-white/25 font-medium">Other</span>
    </div>
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-mono text-white/50 tabular-nums font-medium">{time}</span>
      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-1.5 text-white/20 hover:text-white transition-colors"><Eye size={14} /></button>
        <button className="p-1.5 text-white/20 hover:text-red-400 transition-colors"><X size={14} /></button>
      </div>
    </div>
  </div>
);

const WeekView: React.FC = () => {
  const days = [
    { date: 'Mon 5/18', time: '08h 24m' },
    { date: 'Tue 5/19', time: '07h 45m' },
    { date: 'Wed 5/20', time: '09h 12m' },
    { date: 'Thu 5/21', time: '06h 30m' },
    { date: 'Fri 5/22', time: '00h 48m', active: true },
    { date: 'Sat 5/23', time: '00h 00m' },
    { date: 'Sun 5/24', time: '00h 00m' },
  ];

  return (
    <div className="space-y-4 animate-slide-in">
      <div className="bg-brand-accent/5 border border-brand-accent/10 rounded-xl p-3 text-[10px] text-brand-accent/80 text-center font-bold tracking-tight">
        Time updates each 10 minutes
      </div>
      
      <div className="space-y-2">
        {days.map((day) => (
          <div key={day.date} className={cn(
            "flex items-center justify-between p-4 bg-brand-card rounded-2xl border border-brand-border transition-all",
            day.active && "border-brand-accent/30 bg-brand-accent/5"
          )}>
            <span className="text-sm font-semibold text-white/80">{day.date}</span>
            <span className="text-sm font-mono text-white/40 font-medium">{day.time}</span>
          </div>
        ))}
      </div>

      <div className="pt-4 flex justify-between items-center border-t border-brand-border px-1">
        <span className="text-[11px] font-bold text-white/20 uppercase tracking-widest">Total Week</span>
        <span className="text-xl font-bold text-brand-accent tracking-tighter">32h 39m</span>
      </div>
    </div>
  );
};

const ManualView: React.FC = () => {
  return (
    <div className="space-y-6 animate-slide-in">
      <div className="space-y-1 px-1">
        <h3 className="text-[15px] font-bold text-white/90">Add manual time entry</h3>
        <p className="text-[11px] text-white/30 font-medium">Log your worked hours manually.</p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2.5">
          <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest px-1">Date</label>
          <input type="date" className="w-full bg-brand-card border border-brand-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent/40" defaultValue="2026-05-23" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2.5">
            <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest px-1">From</label>
            <input type="time" className="w-full bg-brand-card border border-brand-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent/40" defaultValue="09:00" />
          </div>
          <div className="space-y-2.5">
            <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest px-1">To</label>
            <input type="time" className="w-full bg-brand-card border border-brand-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent/40" defaultValue="11:00" />
          </div>
        </div>

        <div className="space-y-2.5">
          <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest px-1">Project</label>
          <div className="relative">
            <select className="w-full bg-brand-card border border-brand-border rounded-xl px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-brand-accent/40">
              <option>Other</option>
              <option>Marketing</option>
              <option>Development</option>
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" />
          </div>
        </div>

        <div className="space-y-2.5">
          <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest px-1">Task</label>
          <div className="relative">
            <select className="w-full bg-brand-card border border-brand-border rounded-xl px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-brand-accent/40">
              <option>Monitask App UI Design</option>
              <option>Daily Standup</option>
              <option>Documentation</option>
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" />
          </div>
        </div>

        <button className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white font-bold py-3.5 rounded-xl shadow-xl shadow-brand-accent/20 transition-all mt-2 active:scale-95">
          Submit Entry
        </button>
      </div>
    </div>
  );
};

const SettingsView: React.FC = () => {
  return (
    <div className="space-y-6 animate-slide-in pb-2">
      <div className="space-y-3">
        <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest px-1">App Settings</label>
        <div className="bg-brand-card border border-brand-border rounded-2xl overflow-hidden shadow-sm">
          <ToggleItem label="Run when computer starts" checked={true} />
          <ToggleItem label="Notify when snapshots are taken" checked={true} />
          <ToggleItem label="Keep idle time by default" checked={false} />
          <ToggleItem label="Display Last Screenshot" checked={true} />
          <div className="flex items-center justify-between p-4 border-t border-brand-border/50">
            <span className="text-[13px] font-semibold text-white/80">Play sound</span>
            <button className="text-[10px] font-bold bg-brand-secondary px-2.5 py-1.5 rounded-lg text-white/60 hover:text-white hover:bg-brand-secondary/80 transition-all flex items-center gap-1.5 active:scale-95">
              <Volume2 size={12} /> Test it out!
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest px-1">Preferences</label>
        <div className="bg-brand-card border border-brand-border rounded-2xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between p-4">
            <span className="text-[13px] font-semibold text-white/80">Language</span>
            <div className="flex items-center gap-1.5 text-white/30 hover:text-white/50 cursor-pointer transition-colors">
              <span className="text-xs font-medium">English (US)</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border-t border-brand-border/50">
            <span className="text-[13px] font-semibold text-white/80">DownTime</span>
            <div className="flex items-center gap-3">
              <button className="w-7 h-7 bg-brand-secondary rounded-lg flex items-center justify-center text-white/50 hover:text-white transition-colors active:scale-90">-</button>
              <span className="text-xs font-mono font-bold w-4 text-center">10</span>
              <button className="w-7 h-7 bg-brand-secondary rounded-lg flex items-center justify-center text-white/50 hover:text-white transition-colors active:scale-90">+</button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button className="flex-1 bg-white/5 hover:bg-white/10 text-white/50 font-bold py-3.5 rounded-xl transition-all active:scale-95 text-xs uppercase tracking-widest">Cancel</button>
        <button className="flex-1 bg-brand-accent hover:bg-brand-accent/90 text-white font-bold py-3.5 rounded-xl shadow-xl shadow-brand-accent/20 transition-all active:scale-95 text-xs uppercase tracking-widest">Save</button>
      </div>
    </div>
  );
};

const ToggleItem: React.FC<{ label: string; checked: boolean }> = ({ label, checked }) => {
  const [isOn, setIsOn] = useState(checked);
  return (
    <div className="flex items-center justify-between p-4 border-t first:border-t-0 border-brand-border/30">
      <span className="text-[13px] font-semibold text-white/80">{label}</span>
      <button 
        onClick={() => setIsOn(!isOn)}
        className={cn(
          "w-[38px] h-[22px] rounded-full p-[2px] transition-colors duration-200 ease-in-out relative",
          isOn ? "bg-green-500" : "bg-[#3C3C3E]"
        )}
      >
        <div className={cn(
          "w-[18px] h-[18px] bg-white rounded-full shadow-md transition-transform duration-200 ease-in-out",
          isOn ? "translate-x-[16px]" : "translate-x-0"
        )} />
      </button>
    </div>
  );
};

export default App;
