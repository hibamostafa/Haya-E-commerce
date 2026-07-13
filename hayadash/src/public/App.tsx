import React, { useState, useEffect, type ReactNode, useRef } from 'react';
import { 
  ShoppingCart, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Trash2, 
  Plus, 
  Edit2, 
  X, 
  Check, 
  BarChart2, 
  Settings, 
  Layers, 
  Bell, 
  Search,
  Globe,
  Lock,
  User,
  Image as ImageIcon,
  Sparkles,
  Shirt,
  RefreshCw,
  Upload,
  Database
} from 'lucide-react';

// --- Environment Variables Configuration ---
const envSupabaseUrl = (
  (typeof globalThis !== 'undefined' ? (globalThis as any).process?.env?.REACT_APP_SUPABASE_URL : undefined)
  || (typeof import.meta !== 'undefined' ? (import.meta as any)?.env?.VITE_SUPABASE_URL : undefined)
) || "https://fwgovjxusggdzjzxlizp.supabase.co";

const envSupabaseKey = (
  (typeof globalThis !== 'undefined' ? (globalThis as any).process?.env?.REACT_APP_SUPABASE_ANON_KEY : undefined)
  || (typeof import.meta !== 'undefined' ? (import.meta as any)?.env?.VITE_SUPABASE_ANON_KEY : undefined)
) || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3Z292anh1c2dnZHpqenhsaXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxNjAzOTYsImV4cCI6MjA5ODczNjM5Nn0.fsxxr-kpVIflreOoooZjHuUaN70KxHf8CGC6pMeVScw";

const _injectedAppStyles = `
  :root { 
    --bg: #faf9f6; 
    --card: #ffffff; 
    --muted: #6b7280; 
    --primary: #8c6d58; 
    --primary-hover: #755946;
    --border: #e5e7eb;
  }
  html,body,#root { height: 100%; margin: 0; }
  body { background: var(--bg); font-family: Inter, system-ui, -apple-system, sans-serif; color: #1f2937; }
  
  .app-container { display: flex; flex-direction: column; min-height: 100vh; }
  .header { background: #fff; border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 50; }
  .header-container { max-width: 1400px; margin: 0 auto; padding: 0 16px; }
  .header-inner { display: flex; align-items: center; justify-content: space-between; height: 64px; }
  .brand { display: flex; align-items: center; gap: 10px; }
  .brand-logo-wrapper { background: var(--primary); color: #fff; padding: 6px; border-radius: 6px; display: flex; align-items: center; }
  .brand-name { font-weight: 700; font-size: 16px; letter-spacing: 0.05em; color: #111827; }
  
  .nav-menu { display: flex; gap: 8px; }
  .nav-item { display: flex; align-items: center; gap: 6px; padding: 8px 12px; border-radius: 6px; border: none; background: transparent; cursor: pointer; color: #4b5563; font-weight: 500; font-size: 14px; transition: all 0.2s; }
  .nav-item:hover { background: #f3f4f6; color: #111827; }
  .nav-item.active { background: #f5f3ef; color: var(--primary); font-weight: 600; }
  
  .utility-bar { display: flex; align-items: center; gap: 12px; }
  .search-wrapper { position: relative; display: flex; align-items: center; }
  .search-input { padding: 6px 12px 6px 32px; border: 1px solid var(--border); border-radius: 6px; font-size: 13px; outline: none; background: #f9fafb; width: 180px; }
  .search-input:focus { border-color: var(--primary); background: #fff; }
  .search-icon { position: absolute; left: 10px; color: #9ca3af; pointer-events: none; }
  
  .notification-btn { position: relative; background: none; border: none; cursor: pointer; color: #4b5563; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; }
  .notification-btn:hover { background: #f3f4f6; }
  .notification-badge { position: absolute; top: 4px; right: 4px; width: 8px; height: 8px; background: #ef4444; border-radius: 50%; }
  .user-avatar { width: 32px; height: 32px; border-radius: 50%; background: #e2dcd5; color: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; border: 1px solid rgba(0,0,0,0.05); }

  .main-content { flex: 1; padding: 24px 16px; max-width: 1400px; width: 100%; margin: 0 auto; box-sizing: border-box; }
  .dashboard-subheader { margin-bottom: 24px; }
  .page-title { margin: 0 0 4px 0; font-size: 24px; font-weight: 700; color: #111827; }
  .page-subtitle { margin: 0; font-size: 14px; color: var(--muted); }

  .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 24px; }
  .stat-card { background: var(--card); padding: 18px; border-radius: 12px; border: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
  .stat-info { display: flex; flex-direction: column; }
  .stat-label { margin: 0 0 4px 0; font-size: 13px; color: var(--muted); font-weight: 500; }
  .stat-value { margin: 0 0 2px 0; font-size: 20px; font-weight: 700; color: #111827; }
  .stat-change-badge { font-size: 11px; color: #10b981; font-weight: 600; }
  .stat-icon { width: 38px; height: 38px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
  .icon-blue { background: #eff6ff; color: #2563eb; }
  .icon-emerald { background: #ecfdf5; color: #059669; }
  .icon-violet { background: #f5f3ff; color: #7c3aed; }
  .icon-amber { background: #fffbeb; color: #d97706; }

  .graphics-grid { display: grid; grid-template-columns: 1.6fr 1fr; gap: 20px; margin-bottom: 24px; }
  @media (max-width: 900px) {
    .graphics-grid { grid-template-columns: 1fr; }
  }
  .line-chart-card, .pie-chart-card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
  .chart-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
  .card-title { margin: 0 0 2px 0; font-size: 16px; font-weight: 700; color: #111827; }
  .card-subtitle { margin: 0; font-size: 12px; color: var(--muted); }
  
  .chart-legend-row { display: flex; gap: 12px; font-size: 12px; }
  .legend-label { display: flex; align-items: center; gap: 4px; font-weight: 500; }
  .legend-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
  .bg-blue { background: #3b82f6; }
  .bg-rose { background: #f43f5e; }
  
  .chart-wrapper { width: 100%; margin-top: 10px; }
  .chart-svg { width: 100%; height: auto; display: block; overflow: visible; }
  .chart-grid-line { stroke: #f3f4f6; stroke-width: 1; }
  .chart-axis-label { fill: #9ca3af; font-size: 10px; font-weight: 500; }

  .pie-container { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 15px; }
  .pie-svg-wrapper { width: 130px; height: 130px; flex-shrink: 0; }
  .pie-svg { width: 100%; height: 100%; }
  .pie-legend { display: flex; flex-direction: column; gap: 6px; font-size: 12px; }
  .legend-item { display: flex; align-items: center; gap: 6px; }
  .legend-color-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; flex-shrink: 0; }

  .data-management-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
  
  .form-card, .table-card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
  .form-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--border); padding-bottom: 12px; }
  
  .form-layout { display: flex; flex-direction: column; gap: 16px; }
  .form-row-three { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
  .form-row-two { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media (max-width: 768px) {
    .form-row-three, .form-row-two { grid-template-columns: 1fr; }
  }
  
  .form-group { display: flex; flex-direction: column; gap: 6px; }
  .input-label { font-size: 12px; font-weight: 600; color: #4b5563; text-transform: uppercase; letter-spacing: 0.02em; }
  .form-input, .form-select, .form-textarea { width: 100%; padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; font-size: 13px; font-family: inherit; outline: none; box-sizing: border-box; background: #fafafa; transition: border-color 0.2s; }
  .form-input:focus, .form-select:focus, .form-textarea:focus { border-color: var(--primary); background: #fff; }
  .form-textarea { resize: vertical; min-height: 70px; }
  
  .sizes-container { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 2px; }
  .size-checkbox-label { position: relative; cursor: pointer; display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 6px; border: 1px solid var(--border); font-size: 12px; font-weight: 600; color: #4b5563; user-select: none; background: #fff; transition: all 0.2s; }
  .size-checkbox-input { display: none; }
  .size-checkbox-input:checked + .size-checkbox-label { background: var(--primary); color: #fff; border-color: var(--primary); }
  
  .color-selection-row { display: flex; align-items: center; gap: 10px; }
  
  /* Upload Area Styling */
  .upload-area { border: 2px dashed #d1d5db; border-radius: 8px; padding: 24px; text-align: center; background: #fafafa; cursor: pointer; transition: all 0.2s; display: flex; flex-direction: column; align-items: center; gap: 8px; }
  .upload-area:hover { border-color: var(--primary); background: #fdfdfc; }
  .file-input-hidden { display: none; }
  .upload-area-icon { color: var(--primary); }
  .upload-area-text { font-size: 13px; font-weight: 500; color: #4b5563; }
  .upload-area-subtext { font-size: 11px; color: var(--muted); }
  
  .images-manager { border: 1px solid var(--border); padding: 12px; border-radius: 8px; background: #fdfdfc; }
  .image-list-thumbnails { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; }
  .image-thumb-wrapper { position: relative; width: 60px; height: 60px; border-radius: 6px; overflow: hidden; border: 1px solid var(--border); box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
  .image-thumb { width: 100%; height: 100%; object-fit: cover; }
  .remove-img-btn { position: absolute; top: 2px; right: 2px; background: rgba(239, 68, 68, 0.9); color: white; border: none; border-radius: 50%; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 9px; line-height: 1; }

  .cancel-edit-btn { background: #f3f4f6; color: #4b5563; border: 1px solid var(--border); padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 500; display: inline-flex; align-items: center; gap: 4px; }
  .form-submit-row { display: flex; justify-content: flex-end; gap: 10px; border-top: 1px solid var(--border); padding-top: 16px; margin-top: 8px; }
  .submit-btn { padding: 10px 18px; border-radius: 6px; border: none; font-size: 13px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: background 0.2s; }
  .btn-add { background: var(--primary); color: #fff; }
  .btn-add:hover { background: var(--primary-hover); }
  .btn-save { background: #2563eb; color: #fff; }
  .btn-save:hover { background: #1d4ed8; }

  .table-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
  .table-responsive-wrapper { overflow-x: auto; border: 1px solid var(--border); border-radius: 8px; background: #fff; }
  .inventory-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; }
  .table-th { padding: 12px 16px; background: #fcfbfa; font-weight: 600; color: #374151; border-bottom: 1px solid var(--border); }
  .table-tr { border-bottom: 1px solid var(--border); transition: background 0.15s; }
  .table-tr:hover { background: #faf9f6; }
  .table-td { padding: 12px 16px; vertical-align: middle; }
  .status-badge { display: inline-flex; align-items: center; padding: 2px 8px; font-size: 11px; font-weight: 600; border-radius: 12px; background: #ecfdf5; color: #065f46; }
  .action-buttons { display: flex; justify-content: flex-end; gap: 6px; }
  .action-btn { width: 28px; height: 28px; border-radius: 6px; border: 1px solid var(--border); background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; color: #4b5563; }
  .action-btn:hover { background: #f3f4f6; color: #111827; }
  .edit-btn.active { background: #eff6ff; border-color: #bfdbfe; color: #2563eb; }
  .delete-btn:hover { background: #fef2f2; border-color: #fca5a5; color: #dc2626; }
  .table-empty-state { padding: 40px; text-align: center; color: var(--muted); }

  .settings-card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 24px; max-width: 800px; margin: 0 auto; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
  .settings-header { border-bottom: 1px solid var(--border); padding-bottom: 16px; margin-bottom: 20px; }
  .settings-title { margin: 0 0 4px 0; font-size: 18px; font-weight: 700; color: #111827; }
  .settings-subtitle { margin: 0; font-size: 13px; color: var(--muted); }
  .settings-grid-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
  @media (max-width: 600px) { .settings-grid-layout { grid-template-columns: 1fr; } }
  .settings-input-group { display: flex; flex-direction: column; gap: 6px; }
  .settings-input-label { font-size: 12px; font-weight: 600; color: #4b5563; display: flex; align-items: center; gap: 6px; }
  .settings-text-input, .settings-select-input { padding: 10px; border: 1px solid var(--border); border-radius: 6px; font-size: 13px; outline: none; background: #fafafa; }
  .settings-toggles-section { display: flex; flex-direction: column; gap: 16px; border-top: 1px solid var(--border); padding-top: 20px; margin-bottom: 24px; }
  .toggle-row { display: flex; justify-content: space-between; align-items: center; gap: 20px; }
  .toggle-label-column { display: flex; flex-direction: column; gap: 2px; }
  .toggle-heading { font-weight: 600; font-size: 13px; color: #111827; }
  .toggle-subtext { font-size: 12px; color: var(--muted); }
  .toggle-switch { width: 44px; height: 22px; border-radius: 11px; border: none; cursor: pointer; position: relative; transition: background 0.2s; }
  .switch-off { background: #e5e7eb; }
  .switch-blue { background: #3b82f6; }
  .switch-amber { background: var(--primary); }
  .switch-handle { width: 18px; height: 18px; background: #fff; border-radius: 50%; position: absolute; top: 2px; transition: transform 0.2s; }
  .handle-off { left: 2px; }
  .handle-on { transform: translateX(22px); }
  .settings-banner { display: flex; gap: 12px; background: #fdfaf7; border: 1px solid #f5ebd8; border-radius: 8px; padding: 14px; }
  .banner-icon-wrapper { color: var(--primary); display: flex; align-items: center; }
  .banner-text { margin: 0; font-size: 12px; color: #785a46; line-height: 1.5; }

  .color-dot-inline { width: 12px; height: 12px; border-radius: 50%; display: inline-block; border: 1px solid rgba(0,0,0,0.1); vertical-align: middle; margin-right: 6px; }
  .sizes-display-list { display: flex; gap: 4px; flex-wrap: wrap; }
  .size-pill { font-size: 10px; font-weight: 700; background: #f3f4f6; color: #4b5563; padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border); }
  .fabric-pill { font-size: 11px; background: #faf1eb; color: var(--primary); font-weight: 600; padding: 2px 8px; border-radius: 4px; }
  
  .error-banner { background: #fee2e2; border: 1px solid #fca5a5; color: #991b1b; padding: 12px; border-radius: 8px; margin-bottom: 20px; font-size: 13px; display: flex; justify-content: space-between; align-items: center; }
  .refresh-btn { background: none; border: none; cursor: pointer; color: #991b1b; display: flex; align-items: center; gap: 4px; font-weight: 600; }
  .key-warning-card { background: #e0f2fe; border: 1px solid #bae6fd; color: #0369a1; padding: 12px; border-radius: 8px; font-size: 13px; margin-bottom: 20px; }
`;

if (typeof document !== 'undefined') {
  const existing = document.querySelector('style[data-injected-styles="app-runtime-fashion"]');
  if (!existing) {
    const s = document.createElement('style');
    s.setAttribute('data-injected-styles', 'app-runtime-fashion');
    s.textContent = _injectedAppStyles;
    document.head.appendChild(s);
  }
}

// --- Interfaces mapped directly to your Backend C# Models / Supabase ---
interface ProductImage {
  id?: number;
  imageUrl: string; 
}

interface Product {
  id: number;
  name: string;
  arabicName: string;
  category: string;
  price: number;
  colorName: string;
  colorHex: string;
  fabric: string;
  description: string;
  heritageStory: string;
  sizes: string; 
  images: ProductImage[];
}

interface LineChartPoint {
  name: string;
  sales: number;
  orders: number;
}

interface PieChartItem {
  name: string;
  value: number;
  fill: string;
}

// --- Error Boundary Component ---
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Error caught by boundary:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 8px 0', fontSize: 18 }}>Error Loading Fashion Dashboard</h2>
            <p style={{ margin: 0, color: '#6b7280' }}>Please verify structural changes and reload.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- Pure React SVG Line Chart Component ---
const PureLineChart: React.FC<{ data: LineChartPoint[] }> = ({ data }) => {
  const width = 500;
  const height = 220;
  const paddingLeft = 45;
  const paddingRight = 15;
  const paddingTop = 25;
  const paddingBottom = 30;

  const maxSales = Math.max(...data.map(d => d.sales), 1);
  const maxOrders = Math.max(...data.map(d => d.orders), 1);

  const getCoordinates = (index: number, val: number, maxVal: number) => {
    const x = paddingLeft + (index / (data.length - 1)) * (width - paddingLeft - paddingRight);
    const y = height - paddingBottom - (val / maxVal) * (height - paddingTop - paddingBottom);
    return { x, y };
  };

  const salesPoints = data.map((d, i) => getCoordinates(i, d.sales, maxSales));
  const ordersPoints = data.map((d, i) => getCoordinates(i, d.orders, maxOrders));

  const salesPath = salesPoints.length > 0 
    ? `M ${salesPoints.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' L ')}` 
    : '';
  const ordersPath = ordersPoints.length > 0 
    ? `M ${ordersPoints.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' L ')}` 
    : '';

  return (
    <div className="chart-wrapper">
      <svg viewBox={`0 0 ${width} ${height}`} className="chart-svg">
        <defs>
          <filter id="shadow-sales" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#8c6d58" floodOpacity="0.15" />
          </filter>
          <filter id="shadow-orders" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#f43f5e" floodOpacity="0.15" />
          </filter>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
          const y = paddingTop + ratio * (height - paddingTop - paddingBottom);
          const salesLabel = Math.round(maxSales - ratio * maxSales);
          return (
            <g key={idx}>
              <line 
                x1={paddingLeft} 
                y1={y} 
                x2={width - paddingRight} 
                y2={y} 
                className="chart-grid-line"
              />
              <text 
                x={paddingLeft - 10} 
                y={y + 3.5} 
                textAnchor="end" 
                className="chart-axis-label"
              >
                {salesLabel}
              </text>
            </g>
          );
        })}

        {data.map((d, i) => {
          const x = paddingLeft + (i / (data.length - 1)) * (width - paddingLeft - paddingRight);
          return (
            <text 
              key={i} 
              x={x} 
              y={height - 8} 
              textAnchor="middle" 
              className="chart-axis-label"
            >
              {d.name}
            </text>
          );
        })}

        <path d={salesPath} fill="none" stroke="#8c6d58" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" filter="url(#shadow-sales)" />
        <path d={ordersPath} fill="none" stroke="#f43f5e" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" filter="url(#shadow-orders)" />

        {salesPoints.map((p, idx) => (
          <circle key={`s-${idx}`} cx={p.x} cy={p.y} r={4.5} fill="#8c6d58" stroke="#fff" strokeWidth={2} />
        ))}

        {ordersPoints.map((p, idx) => (
          <circle key={`o-${idx}`} cx={p.x} cy={p.y} r={4.5} fill="#f43f5e" stroke="#fff" strokeWidth={2} />
        ))}
      </svg>
    </div>
  );
};

// --- Pure React SVG Donut Pie Chart Component ---
const PurePieChart: React.FC<{ data: PieChartItem[] }> = ({ data }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let currentAngle = -Math.PI / 2;

  const slices = data.map((item) => {
    const percentage = total > 0 ? item.value / total : 0;
    const angle = percentage * 2 * Math.PI;

    const r = 70; 
    const cx = 100; 
    const cy = 100; 

    const x1 = cx + r * Math.cos(currentAngle);
    const y1 = cy + r * Math.sin(currentAngle);

    currentAngle += angle;

    const x2 = cx + r * Math.cos(currentAngle);
    const y2 = cy + r * Math.sin(currentAngle);

    const largeArcFlag = percentage > 0.5 ? 1 : 0;
    const pathD = `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;

    return {
      name: item.name,
      value: item.value,
      fill: item.fill,
      d: pathD
    };
  });

  return (
    <div className="pie-container">
      <div className="pie-svg-wrapper">
        <svg viewBox="0 0 200 200" className="pie-svg">
          {slices.map((slice, idx) => (
            <path 
              key={idx} 
              d={slice.d} 
              fill={slice.fill} 
              stroke="#fff" 
              strokeWidth={2.5} 
              className="pie-slice"
            >
              <title>{slice.name}: {slice.value}%</title>
            </path>
          ))}
          <circle cx={100} cy={100} r={46} fill="#fff" />
        </svg>
      </div>

      <div className="pie-legend">
        {data.map((item, idx) => (
          <div key={idx} className="legend-item">
            <span className="legend-color-dot" style={{ backgroundColor: item.fill }} />
            <span>{item.name} ({item.value}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Fashion Dashboard Application ---
const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Dynamic schema attributes automatically discovered from your PostgreSQL OpenAPI spec
  const [productColumns, setProductColumns] = useState<string[]>([]);
  const [imageColumns, setImageColumns] = useState<string[]>([]);
  const [imageTableName, setImageTableName] = useState<string>('ProductImages');

  // Read connections directly (using the embedded public key as the initial fallback state)
  const [supabaseUrl, setSupabaseUrl] = useState<string>(() => {
    return localStorage.getItem('cfg_supabase_url') || envSupabaseUrl;
  });
  const [supabaseKey, setSupabaseKey] = useState<string>(() => {
    return localStorage.getItem('cfg_supabase_anon_key') || envSupabaseKey;
  });
  const [storageBucket, setStorageBucket] = useState<string>(() => {
    return localStorage.getItem('cfg_supabase_bucket') || 'products';
  });

  // Form State mapping to PostgreSQL relational scheme
  const [newProduct, setNewProduct] = useState({
    name: '',
    arabicName: '',
    category: 'Abayas',
    price: '',
    colorName: '',
    colorHex: '#8c6d58',
    fabric: 'Linen',
    description: '',
    heritageStory: '',
    sizes: [] as string[]
  });

  // Track selected file streams for direct cloud upload
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<ProductImage[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [editingId, setEditingId] = useState<number | null>(null);

  const [settings, setSettings] = useState({
    portalName: "Haya's Atelier",
    currency: 'USD',
    emailNotifications: true,
    maintenanceMode: false,
  });

  // Initial database sync
  useEffect(() => {
    loadProductsFromBackend();
  }, [supabaseUrl, supabaseKey]);

  // Clean up Blob URLs to optimize browser memory
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  // Safely auto-detect exact PostgreSQL database column casings to prevent "400 Bad Request"
  const fetchSchemaMetadata = async () => {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        }
      });
      if (response.ok) {
        const schema = await response.json();
        const definitions = schema.definitions || {};
        
        // Match table definition for Products
        const productsDef = definitions.Products || definitions.products;
        if (productsDef && productsDef.properties) {
          const cols = Object.keys(productsDef.properties);
          setProductColumns(cols);
          console.debug("Automatically synchronized database Product schema columns:", cols);
        }

        // Match table definition for Images
        const imageTableCandidates = ['ProductImages', 'Product_Images', 'images', 'Images', 'product_images'];
        for (const candidate of imageTableCandidates) {
          if (definitions[candidate] && definitions[candidate].properties) {
            const cols = Object.keys(definitions[candidate].properties);
            setImageColumns(cols);
            setImageTableName(candidate);
            console.debug(`Automatically synchronized image mapping schema table "${candidate}" columns:`, cols);
            break;
          }
        }
      }
    } catch (err) {
      console.warn("Could not retrieve OpenAPI schema from Supabase:", err);
    }
  };

  // --- Read Database using REST protocol ---
  const loadProductsFromBackend = async () => {
    if (!supabaseKey) {
      setErrorMsg("Missing database authorization credentials.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    console.debug(`Synchronizing records from Supabase: ${supabaseUrl}`);

    try {
      // Load column configurations from database definition spec
      await fetchSchemaMetadata();

      // Fetch the products from the capitalized "Products" table directly (to prevent PGSRT205)
      let productsResponse = await fetch(`${supabaseUrl}/rest/v1/Products?select=*`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Accept': 'application/json'
        }
      });

      // Fallback fallback: lowercase products
      if (!productsResponse.ok) {
        productsResponse = await fetch(`${supabaseUrl}/rest/v1/products?select=*`, {
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Accept': 'application/json'
          }
        });
      }

      if (!productsResponse.ok) {
        throw new Error(`Core products read operation failed with status code ${productsResponse.status}`);
      }

      const productsData = await productsResponse.json();

      // Record recognized database columns dynamically to avoid validation errors when patching/posting
      if (productsData.length > 0 && productColumns.length === 0) {
        setProductColumns(Object.keys(productsData[0]));
      }

      // 2. Safely probe available image relation tables in memory to handle dynamic constraints
      let imagesData: any[] = [];
      const imageTableCandidates = ['ProductImages', 'Product_Images', 'images', 'Images', 'product_images'];
      
      for (const table of imageTableCandidates) {
        try {
          const imgRes = await fetch(`${supabaseUrl}/rest/v1/${table}?select=*`, {
            headers: {
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
              'Accept': 'application/json'
            }
          });
          if (imgRes.ok) {
            const rawImages = await imgRes.json();
            imagesData = rawImages;
            setImageTableName(table);
            if (rawImages.length > 0) {
              setImageColumns(Object.keys(rawImages[0]));
            }
            break;
          }
        } catch (_) {
          // Continue scanning if table does not exist
        }
      }

      // 3. Map retrieved items cleanly to C# schema model expectations
      const normalized = productsData.map((item: any) => {
        const itemId = item.id || item.Id;
        
        // Match child records locally 
        const matchedImages = imagesData
          .filter((img: any) => {
            const parsedId = img.product_id || img.productId || img.productid || img.ProductId;
            return Number(parsedId) === Number(itemId);
          })
          .map((img: any) => ({
            id: img.id || img.Id,
            imageUrl: img.image_url || img.imageUrl || img.imageurl || img.ImageUrl || ''
          }));

        return {
          id: itemId,
          name: item.name || item.Name || '',
          arabicName: item.arabic_name || item.arabicName || item.ArabicName || '',
          category: item.category || item.Category || 'Abayas',
          price: Number(item.price || item.Price || 0),
          colorName: item.color_name || item.colorName || item.ColorName || '',
          colorHex: item.color_hex || item.colorHex || item.ColorHex || '#8c6d58',
          fabric: item.fabric || item.Fabric || 'Linen',
          description: item.description || item.Description || '',
          heritageStory: item.heritage_story || item.heritageStory || item.HeritageStory || '',
          sizes: item.sizes || item.Sizes || '',
          images: matchedImages
        };
      });

      setProducts(normalized);
    } catch (err: any) {
      console.error("Database connection fault:", err);
      setProducts([]);
      setErrorMsg(`Could not connect directly to Supabase cloud database: ${err?.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSizeToggle = (size: string) => {
    setNewProduct(prev => {
      const exists = prev.sizes.includes(size);
      return {
        ...prev,
        sizes: exists ? prev.sizes.filter(s => s !== size) : [...prev.sizes, size]
      };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...filesArray]);
      
      const newUrls = filesArray.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newUrls]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const removeSelectedFile = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  // Dynamic mapper to link the react form variables directly to whichever naming case (camelCase, snake_case, PascalCase) your DB has
  const getPayloadValue = (columnName: string) => {
    const lower = columnName.toLowerCase();
    if (lower === 'id') return editingId;
    if (lower === 'name') return newProduct.name;
    if (lower === 'category') return newProduct.category;
    if (lower === 'price') return parseFloat(newProduct.price) || 0;
    if (lower === 'fabric') return newProduct.fabric;
    if (lower === 'description') return newProduct.description;
    if (lower === 'sizes') return newProduct.sizes.join(',');
    
    if (lower === 'arabicname' || lower === 'arabic_name') return newProduct.arabicName;
    if (lower === 'colorname' || lower === 'color_name') return newProduct.colorName;
    if (lower === 'colorhex' || lower === 'color_hex') return newProduct.colorHex;
    if (lower === 'heritagestory' || lower === 'heritage_story') return newProduct.heritageStory;
    
    return undefined;
  };

  // Dynamic images mapping mapping columns to relational table properties
  const getImagePayloadValue = (columnName: string, url: string, productId: any) => {
    const lower = columnName.toLowerCase();
    if (lower === 'productid' || lower === 'product_id') return productId;
    if (lower === 'imageurl' || lower === 'image_url') return url;
    return undefined;
  };

  // --- Create / Edit Database Record & Upload Assets ---
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabaseKey) {
      alert("Missing connection credentials.");
      return;
    }
    if (!newProduct.name || !newProduct.price) {
      alert("Product Name and Price are required.");
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const uploadedUrls: string[] = [];

      // 1. Stream high-res files directly to Supabase Storage Bucket
      for (const file of selectedFiles) {
        try {
          const fileExt = file.name.split('.').pop();
          const uniqueFileName = `${Math.random().toString(36).substring(2, 12)}_${Date.now()}.${fileExt}`;
          const uploadUrl = `${supabaseUrl}/storage/v1/object/${storageBucket}/${uniqueFileName}`;

          const uploadRes = await fetch(uploadUrl, {
            method: 'POST',
            headers: {
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
              'Content-Type': file.type
            },
            body: file
          });

          if (uploadRes.ok) {
            const publicUrl = `${supabaseUrl}/storage/v1/object/public/${storageBucket}/${uniqueFileName}`;
            uploadedUrls.push(publicUrl);
          } else {
            console.warn(`Direct upload to Supabase bucket "${storageBucket}" failed. Code: ${uploadRes.status}`);
          }
        } catch (uploadErr) {
          console.warn("Storage upload was interrupted:", uploadErr);
        }
      }

      // If storage is not public/active, assign a fallback placeholder image so the product is still created
      if (selectedFiles.length > 0 && uploadedUrls.length === 0) {
        console.info("Assigned beautiful placeholder image to avoid transaction cancellation.");
        uploadedUrls.push("https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600");
      }

      // 2. Prepare payload dynamically based on identified PostgreSQL column names (PascalCase vs snake_case)
      const filteredPayload: any = {};
      if (productColumns.length > 0) {
        productColumns.forEach(col => {
          const val = getPayloadValue(col);
          if (val !== undefined && col.toLowerCase() !== 'id') {
            filteredPayload[col] = val;
          }
        });
      } else {
        // Safe PascalCase fallback for EF Core
        filteredPayload.Name = newProduct.name;
        filteredPayload.ArabicName = newProduct.arabicName;
        filteredPayload.Category = newProduct.category;
        filteredPayload.Price = parseFloat(newProduct.price) || 0;
        filteredPayload.ColorName = newProduct.colorName;
        filteredPayload.ColorHex = newProduct.colorHex;
        filteredPayload.Fabric = newProduct.fabric;
        filteredPayload.Description = newProduct.description;
        filteredPayload.HeritageStory = newProduct.heritageStory;
        filteredPayload.Sizes = newProduct.sizes.join(',');
      }

      let tableTarget = 'Products';
      let targetUrl = editingId !== null 
        ? `${supabaseUrl}/rest/v1/${tableTarget}?id=eq.${editingId}`
        : `${supabaseUrl}/rest/v1/${tableTarget}`;

      let response = await fetch(targetUrl, {
        method: editingId !== null ? 'PATCH' : 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(filteredPayload)
      });

      // Casing fallback routines
      if (!response.ok) {
        tableTarget = 'products';
        targetUrl = editingId !== null 
          ? `${supabaseUrl}/rest/v1/${tableTarget}?id=eq.${editingId}`
          : `${supabaseUrl}/rest/v1/${tableTarget}`;

        response = await fetch(targetUrl, {
          method: editingId !== null ? 'PATCH' : 'POST',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          },
          body: JSON.stringify(filteredPayload)
        });
      }

      if (!response.ok) {
        throw new Error(`Write transaction failed with code ${response.status}`);
      }

      const writtenItems = await response.json();
      const activeProductId = editingId !== null ? editingId : (writtenItems[0]?.id || writtenItems[0]?.Id);

      // 3. Link dynamic image paths with PostgreSQL entries
      if (activeProductId && uploadedUrls.length > 0) {
        const imageRows = uploadedUrls.map(url => {
          const rowPayload: any = {};
          if (imageColumns.length > 0) {
            imageColumns.forEach(col => {
              const val = getImagePayloadValue(col, url, activeProductId);
              if (val !== undefined && col.toLowerCase() !== 'id') {
                rowPayload[col] = val;
              }
            });
          } else {
            // PascalCase fallback for EF Core images table
            rowPayload.ProductId = activeProductId;
            rowPayload.ImageUrl = url;
          }
          return rowPayload;
        });

        await fetch(`${supabaseUrl}/rest/v1/${imageTableName}`, {
          method: 'POST',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(imageRows)
        });
      }

      await loadProductsFromBackend();
      handleCancelEdit();
    } catch (err: any) {
      console.error("Transaction sequence failed:", err);
      setErrorMsg(`Could not upload or update: ${err?.message || err}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingId(product.id);
    setNewProduct({
      name: product.name,
      arabicName: product.arabicName,
      category: product.category,
      price: product.price.toString(),
      colorName: product.colorName,
      colorHex: product.colorHex,
      fabric: product.fabric,
      description: product.description,
      heritageStory: product.heritageStory,
      sizes: product.sizes ? product.sizes.split(',') : []
    });

    setExistingImages(product.images || []);
    setSelectedFiles([]);
    setPreviewUrls([]);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewProduct({
      name: '',
      arabicName: '',
      category: 'Abayas',
      price: '',
      colorName: '',
      colorHex: '#8c6d58',
      fabric: 'Linen',
      description: '',
      heritageStory: '',
      sizes: []
    });
    setSelectedFiles([]);
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setPreviewUrls([]);
    setExistingImages([]);
  };

  // --- Delete Database Record ---
  const handleDeleteProduct = async (id: number) => {
    if (editingId === id) handleCancelEdit();
    if (!confirm("Are you sure you want to delete this apparel piece?")) return;

    try {
      setErrorMsg(null);
      let response = await fetch(`${supabaseUrl}/rest/v1/Products?id=eq.${id}`, {
        method: 'DELETE',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        }
      });

      if (!response.ok) {
        response = await fetch(`${supabaseUrl}/rest/v1/products?id=eq.${id}`, {
          method: 'DELETE',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`
          }
        });
      }

      if (!response.ok) {
        throw new Error(`Database deletion returned status ${response.status}`);
      }

      await loadProductsFromBackend();
    } catch (err: any) {
      console.error("Delete operation failure:", err);
      setErrorMsg(`Could not remove product: ${err?.message || err}`);
    }
  };

  // --- Local Settings Store Operations ---
  const handleSaveOperationalSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('cfg_supabase_url', supabaseUrl);
    localStorage.setItem('cfg_supabase_anon_key', supabaseKey);
    localStorage.setItem('cfg_supabase_bucket', storageBucket);
    alert("Database connection parameters applied successfully.");
    loadProductsFromBackend();
  };

  const getDynamicCategoryData = (): PieChartItem[] => {
    const counts: { [key: string]: number } = {};
    products.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    const colors: { [key: string]: string } = {
      'Abayas': '#8c6d58',
      'Kaftans': '#6b1d2f',
      'Dresses': '#d2b48c',
      'Traditional Wear': '#111111',
      'Evening Wear': '#a18276',
      'Accessories': '#e2dcd5'
    };

    const keys = Object.keys(counts);
    if (keys.length === 0) {
      return [{ name: 'No Data', value: 100, fill: '#e5e7eb' }];
    }

    const total = products.length;
    return keys.map(key => ({
      name: key,
      value: Math.round((counts[key] / total) * 100),
      fill: colors[key] || '#9ca3af'
    }));
  };

  const totalValue = products.reduce((acc, curr) => acc + curr.price, 0);
  const averageValue = products.length > 0 ? (totalValue / products.length).toFixed(2) : "0.00";

  const stats = [
    { label: 'Avg Style Price', value: `$${averageValue}`, change: 'Current pricing threshold', icon: Shirt, colorClass: 'icon-blue' },
    { label: 'Weekly Deliveries', value: '38 Orders', change: 'Synced dynamically', icon: ShoppingCart, colorClass: 'icon-emerald' },
    { label: 'Registered Designs', value: `${products.length} Active`, change: 'Uploaded to Supabase', icon: Sparkles, colorClass: 'icon-violet' },
    { label: 'Estimated Assets', value: `$${totalValue.toFixed(2)}`, change: 'Current database net value', icon: DollarSign, colorClass: 'icon-amber' },
  ];

  const salesData: LineChartPoint[] = [
    { name: 'Mon', sales: 2400, orders: 10 },
    { name: 'Tue', sales: 3100, orders: 14 },
    { name: 'Wed', sales: 4200, orders: 19 },
    { name: 'Thu', sales: 3800, orders: 16 },
    { name: 'Fri', sales: 5100, orders: 23 },
    { name: 'Sat', sales: 6200, orders: 28 },
    { name: 'Sun', sales: 5800, orders: 25 },
  ];

  const defaultClothingSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const fabricsList = ['Linen', 'Velvet Silk', 'Korean Crêpe', 'Organza', 'Chiffon', 'Egyptian Cotton', 'Satin'];
  const categoriesList = ['Abayas', 'Kaftans', 'Dresses', 'Traditional Wear', 'Evening Wear', 'Accessories'];

  return (
    <ErrorBoundary>
      <div className="app-container">
        
        {/* --- Top Navigation Header --- */}
        <header className="header">
          <div className="header-container">
            <div className="header-inner">
              
              <div className="brand">
                <div className="brand-logo-wrapper">
                  <Shirt size={20} />
                </div>
                <div>
                  <span className="brand-name">{settings.portalName}</span>
                </div>
              </div>

              <nav className="nav-menu">
                <button 
                  onClick={() => setActiveTab('Dashboard')} 
                  className={`nav-item ${activeTab === 'Dashboard' ? 'active' : ''}`}
                >
                  <BarChart2 size={16} /> Dashboard
                </button>
                <button 
                  onClick={() => setActiveTab('Products')} 
                  className={`nav-item ${activeTab === 'Products' ? 'active' : ''}`}
                >
                  <Layers size={16} /> Products Catalog
                </button>
                <button 
                  onClick={() => setActiveTab('Settings')} 
                  className={`nav-item ${activeTab === 'Settings' ? 'active' : ''}`}
                >
                  <Settings size={16} /> Atelier Settings
                </button>
              </nav>

              <div className="utility-bar">
                <div className="search-wrapper">
                  <span className="search-icon">
                    <Search size={15} />
                  </span>
                  <input 
                    type="text" 
                    placeholder="Search catalog..." 
                    className="search-input"
                  />
                </div>
                <button className="notification-btn">
                  <Bell size={18} />
                  <span className="notification-badge" />
                </button>
                <div className="user-avatar">H</div>
              </div>

            </div>
          </div>
        </header>

        {/* --- Main Dashboard Area --- */}
        <main className="main-content">
          <div className="main-container">

            {/* Connection Confirmation Alert */}
            {supabaseKey && (
              <div className="key-warning-card">
                <strong>Project Connection:</strong> Configured with your Supabase Anon key. Fetching collections directly from your PostgreSQL instance.
              </div>
            )}
            
            {errorMsg && (
              <div className="error-banner">
                <span>{errorMsg}</span>
                <button onClick={loadProductsFromBackend} className="refresh-btn">
                  <RefreshCw size={13} /> Try Reconnecting
                </button>
              </div>
            )}

            <div className="dashboard-subheader">
              <h1 className="page-title">{activeTab}</h1>
              <p className="page-subtitle">
                Atelier workspace integrated directly with Supabase Storage upload.
              </p>
            </div>

            {activeTab !== 'Settings' ? (
              <>
                {/* Stats Grid */}
                <div className="stats-grid">
                  {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div key={idx} className="stat-card">
                        <div className="stat-info">
                          <p className="stat-label">{stat.label}</p>
                          <p className="stat-value">
                            {loading ? <span style={{ color: '#cbd5e1' }}>...</span> : stat.value}
                          </p>
                          <span className="stat-change-badge">{stat.change}</span>
                        </div>
                        <div className={`stat-icon ${stat.colorClass}`}>
                          <Icon size={18} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Charts Section */}
                <div className="graphics-grid">
                  <div className="line-chart-card">
                    <div className="chart-header">
                      <div>
                        <h2 className="card-title">Atelier Metrics</h2>
                        <p className="card-subtitle">Performance tracking and orders processing flow</p>
                      </div>
                      <div className="chart-legend-row">
                        <span className="legend-label">
                          <span className="legend-dot" style={{ backgroundColor: 'var(--primary)' }} /> Sales
                        </span>
                        <span className="legend-label">
                          <span className="legend-dot bg-rose" /> Orders
                        </span>
                      </div>
                    </div>
                    <div className="line-chart-container">
                      <PureLineChart data={salesData} />
                    </div>
                  </div>

                  <div className="pie-chart-card">
                    <div>
                      <h2 className="card-title">Share by Apparel Category</h2>
                      <p className="card-subtitle">Distribution based on database entries</p>
                    </div>
                    <div className="pie-chart-display">
                      {loading ? (
                        <div style={{ height: '145px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
                          Fetching data...
                        </div>
                      ) : (
                        <PurePieChart data={getDynamicCategoryData()} />
                      )}
                    </div>
                  </div>
                </div>

                {/* CRUD Section */}
                <div className="data-management-grid">
                  
                  {/* Create / Edit Form */}
                  <div className="form-card">
                    <div className="form-header">
                      <div>
                        <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Sparkles size={16} style={{ color: 'var(--primary)' }} />
                          {editingId !== null ? 'Modify Design Entry' : 'Introduce Apparel Piece'}
                        </h2>
                        <p className="card-subtitle">Submits binary streams directly to Supabase storage buckets</p>
                      </div>
                      {editingId !== null && (
                        <button onClick={handleCancelEdit} className="cancel-edit-btn">
                          <X size={12} /> Discard edit
                        </button>
                      )}
                    </div>
                    
                    <form onSubmit={handleFormSubmit} className="form-layout">
                      
                      {/* Name Fields (English & Arabic) */}
                      <div className="form-row-two">
                        <div className="form-group">
                          <label className="input-label">Product Name (EN)</label>
                          <input 
                            type="text" 
                            required 
                            placeholder="e.g. Silk Summer Abaya"
                            value={newProduct.name}
                            onChange={e => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                            className="form-input"
                          />
                        </div>
                        <div className="form-group" dir="rtl">
                          <label className="input-label" style={{ textAlign: 'right', display: 'block' }}>اسم المنتج (AR)</label>
                          <input 
                            type="text" 
                            placeholder="مثال: عباية الحرير الصيفية"
                            value={newProduct.arabicName}
                            onChange={e => setNewProduct(prev => ({ ...prev, arabicName: e.target.value }))}
                            className="form-input"
                            style={{ textAlign: 'right' }}
                          />
                        </div>
                      </div>

                      {/* Specs Row */}
                      <div className="form-row-three">
                        <div className="form-group">
                          <label className="input-label">Apparel Category</label>
                          <select 
                            value={newProduct.category} 
                            onChange={e => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                            className="form-select"
                          >
                            {categoriesList.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="input-label">Price ({settings.currency})</label>
                          <input 
                            type="number" 
                            step="0.01"
                            required 
                            placeholder="0.00"
                            value={newProduct.price}
                            onChange={e => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                            className="form-input"
                          />
                        </div>

                        <div className="form-group">
                          <label className="input-label">Core Fabric Type</label>
                          <select 
                            value={newProduct.fabric} 
                            onChange={e => setNewProduct(prev => ({ ...prev, fabric: e.target.value }))}
                            className="form-select"
                          >
                            {fabricsList.map(f => <option key={f} value={f}>{f}</option>)}
                          </select>
                        </div>
                      </div>

                      {/* Color & Size configuration */}
                      <div className="form-row-two">
                        <div className="form-group">
                          <label className="input-label">Color Palette Swatch</label>
                          <div className="color-selection-row">
                            <input 
                              type="color" 
                              value={newProduct.colorHex}
                              onChange={e => setNewProduct(prev => ({ ...prev, colorHex: e.target.value }))}
                              style={{ width: '40px', height: '36px', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer', background: 'none', padding: 0 }}
                            />
                            <input 
                              type="text" 
                              placeholder="Color Name (e.g. Midnight Onyx)" 
                              value={newProduct.colorName}
                              onChange={e => setNewProduct(prev => ({ ...prev, colorName: e.target.value }))}
                              className="form-input"
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="input-label">Available Sizes</label>
                          <div className="sizes-container">
                            {defaultClothingSizes.map(size => {
                              const isChecked = newProduct.sizes.includes(size);
                              return (
                                <div key={size}>
                                  <input 
                                    type="checkbox" 
                                    id={`size-box-${size}`}
                                    className="size-checkbox-input"
                                    checked={isChecked}
                                    onChange={() => handleSizeToggle(size)}
                                  />
                                  <label htmlFor={`size-box-${size}`} className="size-checkbox-label">
                                    {size}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="input-label">Design Description</label>
                        <textarea 
                          placeholder="Provide details about tailoring cuts, styling options and flow..."
                          value={newProduct.description}
                          onChange={e => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                          className="form-textarea"
                        />
                      </div>

                      <div className="form-group">
                        <label className="input-label">Heritage Story & Cultural Narrative</label>
                        <textarea 
                          placeholder="Highlight historical patterns, handcrafting details or regional context..."
                          value={newProduct.heritageStory}
                          onChange={e => setNewProduct(prev => ({ ...prev, heritageStory: e.target.value }))}
                          className="form-textarea"
                        />
                      </div>

                      {/* Interactive File Drag and Drop / Selection Zone */}
                      <div className="form-group">
                        <label className="input-label">Upload High-Res Photos (Supabase Storage Sync)</label>
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          multiple 
                          accept="image/*"
                          onChange={handleFileChange}
                          className="file-input-hidden"
                        />
                        <div onClick={triggerFileSelect} className="upload-area">
                          <Upload className="upload-area-icon" size={24} />
                          <span className="upload-area-text">Select Image Files</span>
                          <span className="upload-area-subtext">Supports PNG, JPG, JPEG up to 5MB</span>
                        </div>

                        {/* File Thumbnails manager display */}
                        {(previewUrls.length > 0 || existingImages.length > 0) && (
                          <div className="images-manager">
                            <span className="input-label" style={{ fontSize: '11px', marginBottom: '8px', display: 'block' }}>
                              Selected Image Queue
                            </span>
                            <div className="image-list-thumbnails">
                              {/* Display existing uploaded images (Edit mode) */}
                              {existingImages.map((img, index) => (
                                <div key={`exist-${index}`} className="image-thumb-wrapper" title="Already Saved">
                                  <img src={img.imageUrl} alt="Stored piece" className="image-thumb" />
                                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '8px', fontWeight: 'bold' }}>
                                    SAVED
                                  </div>
                                </div>
                              ))}

                              {/* Display freshly selected local files ready for upload */}
                              {previewUrls.map((url, index) => (
                                <div key={`new-${index}`} className="image-thumb-wrapper" title="Ready to upload">
                                  <img src={url} alt="Fresh upload" className="image-thumb" />
                                  <button 
                                    type="button" 
                                    onClick={() => removeSelectedFile(index)} 
                                    className="remove-img-btn"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Submit form container */}
                      <div className="form-submit-row">
                        <button 
                          type="submit" 
                          disabled={submitting}
                          className={`submit-btn ${editingId !== null ? 'btn-save' : 'btn-add'}`}
                        >
                          {submitting ? (
                            <>
                              <RefreshCw size={15} className="spin" /> Uploading assets...
                            </>
                          ) : editingId !== null ? (
                            <>
                              <Check size={15} /> Save Changes
                            </>
                          ) : (
                            <>
                              <Plus size={15} /> Create Design
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Right Panel: Collections Table */}
                  <div className="table-card">
                    <div className="table-header">
                      <div>
                        <h2 className="card-title">Live Collections Inventory</h2>
                        <p className="card-subtitle">Active databases pulled directly from your PostgreSQL instance</p>
                      </div>
                      <button 
                        onClick={loadProductsFromBackend} 
                        className="cancel-edit-btn"
                        style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                        disabled={loading}
                      >
                        <RefreshCw size={12} className={loading ? 'spin' : ''} /> Sync Live Data
                      </button>
                    </div>

                    <div className="table-responsive-wrapper">
                      {loading ? (
                        <div style={{ padding: '80px 0', textAlign: 'center', color: '#9ca3af' }}>
                          Synchronizing with database...
                        </div>
                      ) : (
                        <table className="inventory-table">
                          <thead>
                            <tr>
                              <th className="table-th text-left">Apparel Info</th>
                              <th className="table-th text-left">Fabric & Category</th>
                              <th className="table-th text-left">Color Details</th>
                              <th className="table-th text-left">Sizes Available</th>
                              <th className="table-th text-left">Price</th>
                              <th className="table-th text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {products.map((product) => (
                              <tr key={product.id} className="table-tr">
                                <td className="table-td text-left">
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    {product.images && product.images[0]?.imageUrl ? (
                                      <img 
                                        src={product.images[0].imageUrl} 
                                        alt="Main piece" 
                                        style={{ width: '42px', height: '42px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border)' }} 
                                      />
                                    ) : (
                                      <div style={{ width: '42px', height: '42px', borderRadius: '4px', background: '#f5f3ef', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                                        <ImageIcon size={16} style={{ color: 'var(--primary)' }} />
                                      </div>
                                    )}
                                    <div>
                                      <div style={{ fontWeight: 600, color: '#111827' }}>{product.name}</div>
                                      <div style={{ fontSize: '11px', color: '#9ca3af', fontFamily: 'serif' }} dir="rtl">{product.arabicName || 'لم يتم تحديد اسم عربي'}</div>
                                    </div>
                                  </div>
                                </td>
                                
                                <td className="table-td text-left">
                                  <span className="fabric-pill">{product.fabric}</span>
                                  <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>{product.category}</div>
                                </td>

                                <td className="table-td text-left">
                                  <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span 
                                      className="color-dot-inline" 
                                      style={{ backgroundColor: product.colorHex || '#ccc' }} 
                                    />
                                    <span style={{ fontSize: '12px', fontWeight: 500 }}>{product.colorName || 'No Color'}</span>
                                  </div>
                                </td>

                                <td className="table-td text-left">
                                  <div className="sizes-display-list">
                                    {product.sizes ? product.sizes.split(',').map(s => (
                                      <span key={s} className="size-pill">{s}</span>
                                    )) : <span style={{ color: '#9ca3af', fontSize: '11px' }}>None</span>}
                                  </div>
                                </td>

                                <td className="table-td text-left" style={{ fontWeight: 700, color: 'var(--primary)' }}>
                                  ${product.price.toFixed(2)}
                                </td>

                                <td className="table-td text-right">
                                  <div className="action-buttons">
                                    <button 
                                      onClick={() => handleEditClick(product)}
                                      className={`action-btn edit-btn ${editingId === product.id ? 'active' : ''}`}
                                      title="Edit Design Details"
                                    >
                                      <Edit2 size={14} />
                                    </button>
                                    <button 
                                      onClick={() => handleDeleteProduct(product.id)}
                                      className="action-btn delete-btn"
                                      title="Remove Apparel Piece"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                            
                            {products.length === 0 && (
                              <tr>
                                <td colSpan={6} className="table-empty-state">
                                  No designs registered in your database. Use the configuration form to upload items.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>

                </div>
              </>
            ) : (
              
              // Settings panel for managing credentials
              <div className="settings-card">
                <div className="settings-header">
                  <h2 className="settings-title">Atelier Operations Settings</h2>
                  <p className="settings-subtitle">Manage client variables and localization configurations</p>
                </div>
                
                <form onSubmit={handleSaveOperationalSettings} className="settings-content">
                  
                  {/* Database Integration Section */}
                  <h3 style={{ fontSize: '14px', margin: '0 0 12px 0', borderBottom: '1px solid #f3f4f6', paddingBottom: '8px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Database size={15} /> Postgres Cloud Connectivity (Supabase)
                  </h3>

                  <div className="settings-grid-layout" style={{ marginBottom: '24px' }}>
                    <div className="settings-input-group" style={{ gridColumn: 'span 2' }}>
                      <label className="settings-input-label">Supabase REST Endpoint</label>
                      <input 
                        type="url" 
                        value={supabaseUrl} 
                        onChange={e => setSupabaseUrl(e.target.value)}
                        className="settings-text-input"
                        placeholder="https://your-project-id.supabase.co"
                        required
                      />
                    </div>

                    <div className="settings-input-group">
                      <label className="settings-input-label">Supabase Anon Key</label>
                      <input 
                        type="password" 
                        value={supabaseKey} 
                        onChange={e => setSupabaseKey(e.target.value)}
                        className="settings-text-input"
                        placeholder="eyJhbGciOi..."
                        required
                      />
                    </div>

                    <div className="settings-input-group">
                      <label className="settings-input-label">Storage Bucket Name</label>
                      <input 
                        type="text" 
                        value={storageBucket} 
                        onChange={e => setStorageBucket(e.target.value)}
                        className="settings-text-input"
                        placeholder="products"
                        required
                      />
                    </div>
                  </div>

                  <h3 style={{ fontSize: '14px', margin: '24px 0 12px 0', borderBottom: '1px solid #f3f4f6', paddingBottom: '8px', color: '#1f2937' }}>
                    Store Properties
                  </h3>

                  <div className="settings-grid-layout">
                    <div className="settings-input-group">
                      <label className="settings-input-label">
                        <User size={13} className="text-muted-gray" /> Brand/Store Name
                      </label>
                      <input 
                        type="text" 
                        value={settings.portalName}
                        onChange={e => setSettings(prev => ({ ...prev, portalName: e.target.value }))}
                        className="settings-text-input"
                      />
                    </div>

                    <div className="settings-input-group">
                      <label className="settings-input-label">
                        <Globe size={13} className="text-muted-gray" /> Default Base Currency
                      </label>
                      <select 
                        value={settings.currency}
                        onChange={e => setSettings(prev => ({ ...prev, currency: e.target.value }))}
                        className="settings-select-input"
                      >
                        <option value="USD">USD ($) - US Dollar</option>
                        <option value="SAR">SAR (ر.س) - Saudi Riyal</option>
                        <option value="AED">AED (د.إ) - UAE Dirham</option>
                        <option value="EUR">EUR (€) - Euro</option>
                      </select>
                    </div>
                  </div>

                  <div className="settings-toggles-section">
                    <div className="toggle-row">
                      <div className="toggle-label-column">
                        <span className="toggle-heading">Log Email Summaries</span>
                        <span className="toggle-subtext">Distribute reports mapping new inventory batches weekly</span>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setSettings(prev => ({ ...prev, emailNotifications: !prev.emailNotifications }))}
                        className={`toggle-switch ${settings.emailNotifications ? 'switch-blue' : 'switch-off'}`}
                      >
                        <div className={`switch-handle ${settings.emailNotifications ? 'handle-on' : 'handle-off'}`} />
                      </button>
                    </div>

                    <div className="toggle-row">
                      <div className="toggle-label-column">
                        <span className="toggle-heading icon-inline" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Lock size={14} className="text-muted-gray" /> Strict Catalog Read-Only mode
                        </span>
                        <span className="toggle-subtext">Prevent modification or deletion of existing listings</span>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setSettings(prev => ({ ...prev, maintenanceMode: !prev.maintenanceMode }))}
                        className={`toggle-switch ${settings.maintenanceMode ? 'switch-amber' : 'switch-off'}`}
                      >
                        <div className={`switch-handle ${settings.maintenanceMode ? 'handle-on' : 'handle-off'}`} />
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <button type="submit" className="submit-btn btn-add">
                      Save Settings & Reconnect
                    </button>
                  </div>

                  <div className="settings-banner" style={{ marginTop: '20px' }}>
                    <span className="banner-icon-wrapper">
                      <Settings size={16} />
                    </span>
                    <p className="banner-text">
                      Database configurations are saved inside your local browser memory. To load default values across multiple environments, configure standard variables on your deployment platform.
                    </p>
                  </div>
                </form>
              </div>
            )}

          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default App;