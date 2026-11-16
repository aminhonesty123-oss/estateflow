import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Routes, Route, Navigate, NavLink, useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Building2, DoorOpen, Users, ClipboardList, FileText, Wallet, Wrench,
  Receipt, ClipboardCheck, Gauge, ContactRound, ShieldCheck, Bell, Search, Plus, Menu,
  X, ChevronDown, LogOut, Moon, Sun, ArrowUpRight, ArrowDownRight, MoreHorizontal,
  Download, CalendarDays, CircleDollarSign, Home, CheckCircle2, Clock3, AlertCircle,
  TrendingUp, Filter, Eye, Pencil, Trash2, CreditCard, FileDown, Settings, UserCircle,
  Check, XCircle, Printer, RefreshCw, Activity, BarChart3, Building, MapPin
} from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, PieChart, Pie, Cell, Legend
} from 'recharts'
import { initialData, moduleConfig } from './data'

const StoreContext = createContext(null)
const money = n => new Intl.NumberFormat('en-KE',{style:'currency',currency:'KES',maximumFractionDigits:0}).format(Number(n)||0)
const today = () => new Date().toISOString().slice(0,10)
const makeId = prefix => `${prefix}-${Date.now().toString().slice(-7)}`
const iconMap = { Building2, DoorOpen, Users, ClipboardList, FileText, Wallet, Wrench, Receipt, ClipboardCheck, Gauge, ContactRound, ShieldCheck }

const roleModules = {
  Administrator: Object.keys(moduleConfig).concat(['reports']),
  'Property Owner':['dashboard','properties','units','tenants','leases','invoices','expenses','inspections','utilities','maintenance','reports'],
  'Property Manager':['dashboard','properties','units','tenants','applications','leases','maintenance','inspections','utilities','reports'],
  Accountant:['dashboard','invoices','expenses','utilities','reports'],
  'Maintenance Technician':['dashboard','maintenance','inspections'],
  Tenant:['dashboard','my-unit','my-payments','maintenance','profile']
}
const navGroups = [
  { label:'WORKSPACE', items:[['dashboard','Overview',LayoutDashboard],['properties','Properties',Building2],['units','Rental units',DoorOpen],['tenants','Tenants',Users],['applications','Applications',ClipboardList],['leases','Leases',FileText]] },
  { label:'OPERATIONS', items:[['invoices','Rent collection',Wallet],['maintenance','Maintenance',Wrench],['expenses','Expenses',Receipt],['inspections','Inspections',ClipboardCheck],['utilities','Utilities',Gauge],['staff','Staff',ContactRound]] },
  { label:'INSIGHTS & ADMIN', items:[['reports','Reports',BarChart3],['users','User accounts',ShieldCheck]] }
]

function AppProvider({children}) {
  const [data,setData] = useState(() => {
    try { return JSON.parse(localStorage.getItem('estateflow-data')) || initialData } catch { return initialData }
  })
  const [user,setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('estateflow-user')) } catch { return null }
  })
  const [dark,setDark] = useState(() => localStorage.getItem('estateflow-theme') === 'dark')
  const [toast,setToast] = useState('')
  useEffect(()=>localStorage.setItem('estateflow-data',JSON.stringify(data)),[data])
  useEffect(()=>{ if(user) localStorage.setItem('estateflow-user',JSON.stringify(user)); else localStorage.removeItem('estateflow-user') },[user])
  useEffect(()=>{ document.documentElement.dataset.theme=dark?'dark':'light'; localStorage.setItem('estateflow-theme',dark?'dark':'light') },[dark])
  const notify = message => { setToast(message); window.setTimeout(()=>setToast(''),3000) }
  const add = (key,item) => setData(d=>({...d,[key]:[item,...(d[key]||[])]}))
  const update = (key,id,patch) => setData(d=>({...d,[key]:d[key].map(x=>x.id===id?{...x,...patch}:x)}))
  const remove = (key,id) => setData(d=>({...d,[key]:d[key].filter(x=>x.id!==id)}))
  const value = {data,setData,user,setUser,dark,setDark,toast,notify,add,update,remove}
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
const useStore = () => useContext(StoreContext)

function Protected({children,allowed}) {
  const {user}=useStore()
  if(!user) return <Navigate to="/login" replace/>
  if(allowed && !allowed.includes(user.role)) return <Navigate to="/dashboard" replace/>
  return children
}

function App() {
  return <AppProvider><Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/*" element={<Protected><Shell/></Protected>}/>
  </Routes></AppProvider>
}

function Login() {
  const {data,setUser,notify}=useStore()
  const [email,setEmail]=useState('admin@estateflow.demo')
  const [password,setPassword]=useState('admin123')
  const [error,setError]=useState('')
  const nav=useNavigate()
  const submit=e=>{e.preventDefault();const found=data.users.find(u=>u.email.toLowerCase()===email.toLowerCase()&&u.password===password);if(!found){setError('Email or password is incorrect. Try one of the demo accounts.');return}setUser(found);notify(`Welcome back, ${found.name.split(' ')[0]}`);nav('/dashboard')}
  const demos=[['Administrator','admin@estateflow.demo','admin123'],['Property Manager','manager@estateflow.demo','demo123'],['Accountant','accounts@estateflow.demo','demo123'],['Technician','tech@estateflow.demo','demo123'],['Tenant','tenant@estateflow.demo','demo123'],['Owner','owner@estateflow.demo','demo123']]
  return <div className="login-page"><div className="login-visual"><div className="brand brand-light"><span className="brand-mark"><Building2 size={21}/></span> estateflow</div><div className="login-hero"><span className="eyebrow">PROPERTY OPERATIONS, SIMPLIFIED</span><h1>Your portfolio.<br/>One clear view.</h1><p>Bring properties, people and performance together in one intelligent workspace.</p><div className="login-stats"><div><strong>54</strong><span>Rental units</span></div><div><strong>96%</strong><span>Occupancy</span></div><div><strong>24/7</strong><span>Visibility</span></div></div></div><div className="visual-foot">ESTATEFLOW MANAGEMENT PLATFORM · 2026</div></div><div className="login-panel"><form className="login-form" onSubmit={submit}><div className="mobile-brand brand"><span className="brand-mark"><Building2 size={20}/></span> estateflow</div><span className="eyebrow">WELCOME BACK</span><h2>Sign in to your account</h2><p className="muted">Enter your credentials to access your workspace.</p><label>Email address<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></label>{error&&<div className="form-error">{error}</div>}<button className="btn btn-primary full">Sign in <ArrowUpRight size={17}/></button><div className="demo-box"><strong>Demo accounts</strong><span>Choose a role to autofill credentials:</span><div className="demo-grid">{demos.map(([role,mail,pw])=><button type="button" key={role} onClick={()=>{setEmail(mail);setPassword(pw);setError('')}}>{role}</button>)}</div></div><p className="login-note">Frontend demonstration · Data is stored in this browser</p></form></div></div>
}

function Shell() {
  const {user,dark,setDark,setUser,data}=useStore()
  const [mobileOpen,setMobileOpen]=useState(false)
  const [search,setSearch]=useState('')
  const [profileOpen,setProfileOpen]=useState(false)
  const nav=useNavigate(),loc=useLocation()
  const allowed=roleModules[user.role]||[]
  const visibleGroups=navGroups.map(g=>({...g,items:g.items.filter(i=>allowed.includes(i[0]))})).filter(g=>g.items.length)
  const title=loc.pathname.split('/')[1]||'dashboard'
  const pageTitle=title==='dashboard'?'Overview':title==='my-unit'?'My rental':title==='my-payments'?'My payments':title==='profile'?'My profile':moduleConfig[title]?.title||'Overview'
  const unread=data.notifications.filter(n=>!n.read).length
  const logout=()=>{setUser(null);nav('/login')}
  return <div className="app-shell"><aside className={`sidebar ${mobileOpen?'sidebar-open':''}`}><div className="sidebar-top"><div className="brand"><span className="brand-mark"><Building2 size={20}/></span> estateflow</div><button className="icon-btn mobile-close" onClick={()=>setMobileOpen(false)}><X/></button></div><div className="workspace-switch"><div className="workspace-avatar">EF</div><div><strong>EstateFlow Group</strong><small>Property workspace</small></div><ChevronDown size={15}/></div><nav className="side-nav">{visibleGroups.map(g=><div className="nav-group" key={g.label}><div className="nav-label">{g.label}</div>{g.items.map(([path,label,Icon])=><NavLink key={path} to={path==='dashboard'?'/dashboard':`/${path}`} onClick={()=>setMobileOpen(false)} className={({isActive})=>`nav-link ${isActive?'active':''}`}><Icon size={18}/><span>{label}</span>{path==='applications'&&data.applications.some(a=>a.status==='Pending')&&<i className="nav-dot"/>}</NavLink>)}</div>)}</nav><div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><Activity size={17}/></div><strong>Need a hand?</strong><p>Explore your workspace and manage operations with ease.</p><button onClick={()=>nav('/reports')}>View reports <ArrowUpRight size={13}/></button></div><div className="user-mini"><div className="avatar">{user.name.split(' ').map(x=>x[0]).slice(0,2).join('')}</div><div className="user-mini-info"><strong>{user.name}</strong><small>{user.role}</small></div><button className="icon-btn" title="Log out" onClick={logout}><LogOut size={17}/></button></div></div></aside>{mobileOpen&&<div className="mobile-scrim" onClick={()=>setMobileOpen(false)}/>}<main className="main-area"><header className="topbar"><div className="top-left"><button className="icon-btn mobile-menu" onClick={()=>setMobileOpen(true)}><Menu/></button><div className="breadcrumb">Workspace <span>/</span> <strong>{pageTitle}</strong></div></div><div className="top-actions"><div className="top-search"><Search size={16}/><input placeholder="Search anything..." value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==='Enter'&&nav('/tenants?search='+encodeURIComponent(search))}/><kbd>⌘ K</kbd></div><button className="icon-btn theme-toggle" onClick={()=>setDark(!dark)} title="Toggle theme">{dark?<Sun size={18}/>:<Moon size={18}/>}</button><button className="icon-btn notification-btn" onClick={()=>nav('/reports')} title="Notifications"><Bell size={18}/>{unread>0&&<i/>}</button><div className="profile-wrap"><button className="profile-trigger" onClick={()=>setProfileOpen(!profileOpen)}><div className="avatar">{user.name.split(' ').map(x=>x[0]).slice(0,2).join('')}</div><span><strong>{user.name}</strong><small>{user.role}</small></span><ChevronDown size={14}/></button>{profileOpen&&<div className="profile-menu"><button onClick={()=>{nav('/profile');setProfileOpen(false)}}><UserCircle size={16}/> My profile</button><button onClick={logout}><LogOut size={16}/> Sign out</button></div>}</div></div></header><div className="page-content"><Routes>
    <Route path="/dashboard" element={<Dashboard/>}/>
    {Object.keys(moduleConfig).map(key=><Route key={key} path={`/${key}`} element={<Protected allowed={roleModules[user.role]||[]}><ModulePage moduleKey={key}/></Protected>}/>)}
    <Route path="/reports" element={<Reports/>}/>
    <Route path="/my-unit" element={<TenantPortal/>}/>
    <Route path="/my-payments" element={<TenantPortal payments/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="*" element={<Navigate to="/dashboard" replace/>}/>
  </Routes></div><footer className="footer"><span>© 2026 EstateFlow</span><span>Property operations made clearer <span className="footer-dot">●</span></span></footer></main></div>
}

function PageHeading({eyebrow,title,description,action}) {return <div className="page-heading"><div><div className="eyebrow">{eyebrow||'PROPERTY OPERATIONS'}</div><h1>{title}</h1><p>{description}</p></div>{action}</div>}
function StatCard({label,value,change,icon:Icon,tone='blue',sub}) {return <div className="stat-card"><div className="stat-top"><span>{label}</span><span className={`stat-icon ${tone}`}><Icon size={18}/></span></div><div className="stat-value">{value}</div><div className="stat-foot">{change&&<span className="trend"><ArrowUpRight size={13}/>{change}</span>}<span>{sub||'Compared to last month'}</span></div></div>}
const chartMonths=[{month:'Jun',income:410000,expenses:126000},{month:'Jul',income:445000,expenses:142000},{month:'Aug',income:468000,expenses:139000},{month:'Sep',income:492000,expenses:151000},{month:'Oct',income:515000,expenses:146000},{month:'Nov',income:538000,expenses:158000}]
function Dashboard() {
  const {data,user}=useStore()
  const occupied=data.units.filter(u=>u.status==='Occupied').length
  const expected=data.leases.filter(l=>l.status==='Active'||l.status==='Expiring Soon').reduce((s,l)=>s+Number(l.rent),0)
  const collected=data.invoices.reduce((s,i)=>s+Number(i.paid||0),0)
  const outstanding=data.invoices.reduce((s,i)=>s+Math.max(0,Number(i.amount)-Number(i.paid)),0)
  const expense=data.expenses.reduce((s,e)=>s+Number(e.amount),0)
  const pending=data.maintenance.filter(m=>m.status!=='Completed').length
  const isTenant=user.role==='Tenant'
  const pie=[{name:'Occupied',value:occupied},{name:'Available',value:data.units.filter(u=>u.status==='Available').length},{name:'Reserved',value:data.units.filter(u=>u.status==='Reserved').length},{name:'Maintenance',value:data.units.filter(u=>u.status==='Under Maintenance').length}]
  const COLORS=['#5278e8','#23b58a','#f4b64b','#ee7b70']
  return <><PageHeading eyebrow="MONDAY, 16 NOVEMBER 2026" title={`Good afternoon, ${user.name.split(' ')[0]} 👋`} description="Here’s what’s happening across your property portfolio today." action={<button className="btn btn-secondary" onClick={()=>window.print()}><Download size={16}/> Export overview</button>}/><div className="stat-grid">
    <StatCard label="Total properties" value={data.properties.length} change="+2.4%" icon={Building2} tone="blue" sub="Across your portfolio"/>
    <StatCard label="Rental units" value={data.units.length} change={`${occupied} occupied`} icon={Home} tone="purple" sub={`${data.units.length-occupied} currently unoccupied`}/>
    <StatCard label="Monthly expected" value={money(expected)} change="+8.2%" icon={CircleDollarSign} tone="green" sub="Active lease value"/>
    <StatCard label="Rent collected" value={money(collected)} change="This month" icon={Wallet} tone="orange" sub={`${money(outstanding)} outstanding`}/>
  </div><div className="dashboard-grid"><section className="panel revenue-panel"><div className="panel-heading"><div><h3>Revenue overview</h3><p>Income and expenses over the last 6 months</p></div><button className="select-pill">Last 6 months <ChevronDown size={14}/></button></div><div className="chart-legend"><span><i className="legend-dot blue-dot"/> Rental income</span><span><i className="legend-dot orange-dot"/> Expenses</span></div><div className="chart-area"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartMonths} margin={{top:10,right:8,left:-18,bottom:0}}><defs><linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5278e8" stopOpacity={.2}/><stop offset="100%" stopColor="#5278e8" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 4" vertical={false} stroke="var(--line)"/><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill:'var(--muted)',fontSize:12}}/><YAxis axisLine={false} tickLine={false} tick={{fill:'var(--muted)',fontSize:11}} tickFormatter={v=>`${v/1000}k`}/><Tooltip formatter={v=>money(v)} contentStyle={{background:'var(--surface)',border:'1px solid var(--line)',borderRadius:12,color:'var(--text)'}}/><Area type="monotone" dataKey="income" stroke="#5278e8" strokeWidth={2.5} fill="url(#incomeFill)"/><Area type="monotone" dataKey="expenses" stroke="#f0a35b" strokeWidth={2} fill="none"/></AreaChart></ResponsiveContainer></div></section><section className="panel occupancy-panel"><div className="panel-heading"><div><h3>Unit occupancy</h3><p>Current portfolio distribution</p></div><button className="more-btn"><MoreHorizontal/></button></div><div className="donut-wrap"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={pie} dataKey="value" nameKey="name" innerRadius={62} outerRadius={83} paddingAngle={4} stroke="none">{pie.map((p,i)=><Cell key={p.name} fill={COLORS[i]}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer><div className="donut-center"><strong>{data.units.length?Math.round(occupied/data.units.length*100):0}%</strong><span>Occupied</span></div></div><div className="occupancy-legend">{pie.map((p,i)=><div key={p.name}><span><i style={{background:COLORS[i]}}/>{p.name}</span><strong>{p.value}</strong></div>)}</div></section><section className="panel collection-panel"><div className="panel-heading"><div><h3>Collection performance</h3><p>Rent status for November 2026</p></div><a href="/invoices">View all <ArrowUpRight size={14}/></a></div><div className="collection-total"><strong>{money(collected)}</strong><span>collected so far</span></div><div className="progress-track"><div style={{width:`${expected?Math.min(100,collected/expected*100):0}%`}}/></div><div className="progress-meta"><span>{expected?Math.round(collected/expected*100):0}% of expected rent</span><strong>{money(outstanding)} left</strong></div><div className="collection-breakdown"><div><span className="status-dot paid-dot"/>Paid invoices <strong>{data.invoices.filter(i=>i.status==='Paid').length}</strong></div><div><span className="status-dot partial-dot"/>Partially paid <strong>{data.invoices.filter(i=>i.status==='Partial').length}</strong></div><div><span className="status-dot overdue-dot"/>Overdue <strong>{data.invoices.filter(i=>i.status==='Overdue').length}</strong></div></div></section><section className="panel attention-panel"><div className="panel-heading"><div><h3>Needs your attention</h3><p>Items that may need a follow-up</p></div><span className="count-badge">{pending+data.applications.filter(a=>a.status==='Pending').length}</span></div><div className="attention-list">{data.maintenance.filter(m=>m.status!=='Completed').slice(0,2).map(m=><div className="attention-item" key={m.id}><div className="attention-icon warning-bg"><Wrench size={16}/></div><div><strong>{m.title}</strong><span>{m.id} · {m.priority} priority</span></div><StatusBadge status={m.status}/></div>)}{data.applications.filter(a=>a.status==='Pending').slice(0,2).map(a=><div className="attention-item" key={a.id}><div className="attention-icon purple-bg"><ClipboardList size={16}/></div><div><strong>New application</strong><span>{a.applicant} · {a.id}</span></div><StatusBadge status={a.status}/></div>)}{pending===0&&data.applications.every(a=>a.status!=='Pending')&&<EmptyState text="You’re all caught up."/>}</div></section></div><div className="bottom-grid"><section className="panel table-panel"><div className="panel-heading"><div><h3>Recent rent activity</h3><p>Latest invoices and payment updates</p></div><a href="/invoices">See all activity <ArrowUpRight size={14}/></a></div><InvoiceTable compact/></section><section className="panel property-performance"><div className="panel-heading"><div><h3>Property snapshot</h3><p>Portfolio at a glance</p></div><a href="/properties">All properties <ArrowUpRight size={14}/></a></div>{data.properties.slice(0,4).map(p=>{const units=data.units.filter(u=>u.propertyId===p.id);const occ=units.filter(u=>u.status==='Occupied').length;return <div className="property-row" key={p.id}><div className="property-thumb"><Building size={19}/></div><div className="property-row-main"><strong>{p.name}</strong><span><MapPin size={12}/>{p.address}</span><div className="mini-progress"><i style={{width:`${units.length?occ/units.length*100:0}%`}}/></div></div><div className="property-row-end"><strong>{units.length?Math.round(occ/units.length*100):0}%</strong><small>occupied</small></div></div>})}</section></div></>
}

function StatusBadge({status}) {
  const s=(status||'').toLowerCase().replaceAll(' ','-')
  return <span className={`status-badge status-${s}`}>{status||'—'}</span>
}
function EmptyState({text='No records found.'}) {return <div className="empty-state"><div className="empty-icon"><Search size={20}/></div><strong>{text}</strong><span>Try adjusting your search or add a new record.</span></div>}
function InvoiceTable({compact=false,rows}) {
  const {data}=useStore()
  const list=rows||data.invoices
  return <div className="table-scroll"><table><thead><tr><th>INVOICE</th><th>TENANT</th><th>DUE DATE</th><th>AMOUNT</th><th>STATUS</th></tr></thead><tbody>{list.slice(0,compact?5:100).map(i=>{const t=data.tenants.find(x=>x.id===i.tenantId);return <tr key={i.id}><td><strong className="table-primary">{i.id}</strong><small>{i.month}</small></td><td>{t?.name||'—'}</td><td>{i.due}</td><td><strong>{money(i.amount)}</strong><small>Paid {money(i.paid)}</small></td><td><StatusBadge status={i.status}/></td></tr>})}</tbody></table>{list.length===0&&<EmptyState text="No invoices yet."/>}</div>
}

function ModulePage({moduleKey}) {
  const {data,add,update,remove,notify,user}=useStore()
  const config=moduleConfig[moduleKey]
  const [query,setQuery]=useState('')
  const [filter,setFilter]=useState('All')
  const [modal,setModal]=useState(false)
  const [editing,setEditing]=useState(null)
  const [view,setView]=useState(null)
  const [page,setPage]=useState(1)
  const [sort,setSort]=useState('newest')
  const [confirm,setConfirm]=useState(null)
  const [payment,setPayment]=useState(null)
  const isReadOnly=user.role==='Tenant'
  const rows=data[moduleKey]||[]
  const statusOptions=[...new Set(rows.map(r=>r.status).filter(Boolean))]
  const filtered=useMemo(()=>rows.filter(r=>Object.values(r).join(' ').toLowerCase().includes(query.toLowerCase())&&(filter==='All'||r.status===filter)),[rows,query,filter])
  const sorted=[...filtered].sort((a,b)=>sort==='newest'?String(b.id).localeCompare(String(a.id)):sort==='name'?String(a.name||a.title||a.applicant||a.id).localeCompare(String(b.name||b.title||b.applicant||b.id)):Number(b.amount||b.rent||0)-Number(a.amount||a.rent||0))
  const pageSize=8, pages=Math.max(1,Math.ceil(sorted.length/pageSize)), shown=sorted.slice((page-1)*pageSize,page*pageSize)
  const openNew=()=>{setEditing(null);setModal(true)}
  const save=(form)=> {
    if(moduleKey==='units' && form.status==='Occupied' && !form.tenantId) form.status='Available'
    if(moduleKey==='units' && rows.some(x=>x.propertyId===form.propertyId&&x.number?.toLowerCase()===form.number?.toLowerCase()&&x.id!==editing?.id)){notify('That unit number already exists for this property.');return}
    if(moduleKey==='leases'){
      if(new Date(form.end)<=new Date(form.start)){notify('Lease end date must be after its start date.');return}
      const clash=data.leases.some(l=>l.unitId===form.unitId&&l.status!=='Terminated'&&l.status!=='Expired'&&l.id!==editing?.id&&new Date(form.start)<=new Date(l.end)&&new Date(form.end)>=new Date(l.start))
      if(clash){notify('This unit already has an overlapping lease.');return}
      const unit=data.units.find(u=>u.id===form.unitId)
      if(unit&&unit.status==='Occupied'&&!editing){notify('This unit is already occupied. Choose an available unit.');return}
    }
    if(moduleKey==='invoices' && Number(form.paid)>Number(form.amount)){notify('Payment cannot exceed the invoice amount.');return}
    if(moduleKey==='utilities'){if(Number(form.current)<Number(form.previous)){notify('Current meter reading cannot be lower than previous reading.');return}form.amount=(Number(form.current)-Number(form.previous))*Number(form.rate)}
    const id=editing?.id||makeId(({properties:'PROP',units:'UNIT',tenants:'TEN',applications:'APP',leases:'LEASE',invoices:'INV',maintenance:'MNT',expenses:'EXP',inspections:'INS',utilities:'UTL',staff:'STF',users:'USR'})[moduleKey]||'REC')
    if(moduleKey==='properties'&&!editing)form.createdAt=today()
    if(moduleKey==='units'&&!editing&&!form.number)form.number=`U-${rows.length+1}`
    if(moduleKey==='invoices')form.status=Number(form.paid)>=Number(form.amount)?'Paid':Number(form.paid)>0?'Partial':new Date(form.due)<new Date(today())?'Overdue':'Unpaid'
    if(moduleKey==='utilities'&&!form.amount)form.amount=0
    if(editing) update(moduleKey,id,form); else add(moduleKey,{...form,id})
    if(moduleKey==='leases'&&form.status==='Active'){
      update('units',form.unitId,{status:'Occupied',tenantId:form.tenantId})
      update('tenants',form.tenantId,{unitId:form.unitId,status:'Active'})
    }
    if(moduleKey==='leases'&&form.status==='Terminated'){
      update('units',form.unitId,{status:'Available',tenantId:''})
      update('tenants',form.tenantId,{unitId:'',status:'Former'})
    }
    if(moduleKey==='applications'&&form.status==='Approved'){
      const appUnit=data.units.find(u=>u.id===form.unitId)
      if(appUnit?.status!=='Available'){notify('The selected unit is no longer available.');return}
      const tenantId=makeId('TEN')
      add('tenants',{id:tenantId,name:form.applicant,email:form.email,phone:form.phone,emergency:'',status:'Active',unitId:form.unitId,joined:form.moveIn})
      add('leases',{id:makeId('LEASE'),tenantId,unitId:form.unitId,start:form.moveIn,end:`${Number(form.moveIn.slice(0,4))+1}${form.moveIn.slice(4)}`,rent:appUnit.rent,deposit:appUnit.deposit,status:'Active'})
      update('units',form.unitId,{status:'Occupied',tenantId})
      notify('Application approved. Tenant and one-year lease created.')
    } else notify(editing?`${config.singular} updated successfully.`:`${config.singular} added successfully.`)
    setModal(false);setEditing(null)
  }
  const deleteRow=()=>{if(!confirm)return;const item=confirm;remove(moduleKey,item.id);if(moduleKey==='leases'){update('units',item.unitId,{status:'Available',tenantId:''});update('tenants',item.tenantId,{unitId:'',status:'Former'})}setConfirm(null);notify('Record deleted.')}
  const actionStatus=(row,status)=>{update(moduleKey,row.id,{status});if(moduleKey==='maintenance'&&status==='Completed'){update('units',row.unitId,{status:'Available'})}if(moduleKey==='leases'&&status==='Terminated'){update('units',row.unitId,{status:'Available',tenantId:''});update('tenants',row.tenantId,{unitId:'',status:'Former'})}notify(`Status changed to ${status}.`)}
  const quickPay=(row)=>{setPayment(row)}
  const propertyName=id=>data.properties.find(p=>p.id===id)?.name||'—'
  const tenantName=id=>data.tenants.find(t=>t.id===id)?.name||'—'
  const unitName=id=>data.units.find(u=>u.id===id)?.number||'—'
  const displayValue=(key,val)=>key==='propertyId'?propertyName(val):key==='tenantId'?tenantName(val):key==='unitId'?unitName(val):key==='amount'||key==='rent'||key==='deposit'||key==='paid'||key==='cost'?money(val):val||'—'
  const columns=({properties:['name','category','address','owner','units'],units:['number','propertyId','bedrooms','rent','status'],tenants:['name','email','phone','unitId','status'],applications:['applicant','unitId','moveIn','submitted','status'],leases:['tenantId','unitId','start','end','rent','status'],invoices:['id','tenantId','due','amount','paid','status'],maintenance:['title','propertyId','category','priority','technician','status'],expenses:['description','propertyId','category','amount','date'],inspections:['propertyId','unitId','date','inspector','condition','status'],utilities:['unitId','type','previous','current','amount','status'],staff:['name','role','department','propertyId','status'],users:['name','email','role']})[moduleKey]
  const labelFor=k=>({name:'Property / name',propertyId:'Property',tenantId:'Tenant',unitId:'Unit',number:'Unit no.',category:'Category',address:'Location',owner:'Owner',units:'Units',bedrooms:'Beds',rent:'Monthly rent',status:'Status',applicant:'Applicant',moveIn:'Move-in',submitted:'Submitted',start:'Start',end:'End',due:'Due date',amount:'Amount',paid:'Paid',title:'Issue',priority:'Priority',technician:'Technician',description:'Description',date:'Date',inspector:'Inspector',condition:'Condition',type:'Utility',previous:'Previous',current:'Current',role:'Role',department:'Department',email:'Email',phone:'Phone'})[k]||k
  const actionAllowed=!isReadOnly
  return <><PageHeading title={config.title} description={config.description} action={actionAllowed&&<button className="btn btn-primary" onClick={openNew}><Plus size={17}/> Add {config.singular}</button>}/><div className="module-summary"><div><span className="summary-icon"><Building2 size={18}/></span><div><strong>{rows.length}</strong><small>Total records</small></div></div><div><span className="summary-icon green"><CheckCircle2 size={18}/></span><div><strong>{rows.filter(r=>['Active','Available','Paid','Completed','Approved'].includes(r.status)).length}</strong><small>In good standing</small></div></div><div><span className="summary-icon orange"><Clock3 size={18}/></span><div><strong>{rows.filter(r=>['Pending','Overdue','Expiring Soon','In Progress','Unpaid'].includes(r.status)).length}</strong><small>Needs attention</small></div></div></div><section className="panel data-panel"><div className="data-toolbar"><div className="toolbar-search"><Search size={16}/><input value={query} onChange={e=>{setQuery(e.target.value);setPage(1)}} placeholder={`Search ${config.title.toLowerCase()}...`}/></div><div className="toolbar-controls"><div className="filter-select"><Filter size={15}/><select value={filter} onChange={e=>{setFilter(e.target.value);setPage(1)}}><option>All</option>{statusOptions.map(s=><option key={s}>{s}</option>)}</select></div><select className="sort-select" value={sort} onChange={e=>setSort(e.target.value)}><option value="newest">Newest first</option><option value="name">Name A–Z</option><option value="amount">Amount high-low</option></select><button className="icon-btn" title="Export CSV" onClick={()=>exportCSV(moduleKey,filtered)}><Download size={17}/></button></div></div><div className="table-scroll"><table className="records-table"><thead><tr>{columns.map(k=><th key={k}>{labelFor(k).toUpperCase()}</th>)}<th className="actions-head">ACTIONS</th></tr></thead><tbody>{shown.map(row=><tr key={row.id}>{columns.map(k=><td key={k}>{k==='status'||k==='priority'||k==='condition'?<StatusBadge status={row[k]}/>:<span className={['name','title','id'].includes(k)?'table-primary':''}>{displayValue(k,row[k])}</span>}</td>)}<td><div className="row-actions"><button title="View details" onClick={()=>setView(row)}><Eye size={15}/></button>{actionAllowed&&<><button title="Edit" onClick={()=>{setEditing(row);setModal(true)}}><Pencil size={15}/></button><button title="Delete" onClick={()=>setConfirm(row)}><Trash2 size={15}/></button>{moduleKey==='invoices'&&<button title="Record payment" onClick={()=>quickPay(row)}><CreditCard size={15}/></button>}{moduleKey==='applications'&&row.status==='Pending'&&<button title="Approve" onClick={()=>{const unit=data.units.find(u=>u.id===row.unitId);if(!unit||unit.status!=='Available'){notify('The requested unit is no longer available.');return}const tenantId=makeId('TEN');update('applications',row.id,{status:'Approved'});add('tenants',{id:tenantId,name:row.applicant,email:row.email,phone:row.phone,emergency:'',status:'Active',unitId:row.unitId,joined:row.moveIn});add('leases',{id:makeId('LEASE'),tenantId,unitId:row.unitId,start:row.moveIn,end:`${Number(row.moveIn.slice(0,4))+1}${row.moveIn.slice(4)}`,rent:unit.rent,deposit:unit.deposit,status:'Active'});update('units',row.unitId,{status:'Occupied',tenantId});notify('Application approved. Tenant and one-year lease created.')}}><Check size={15}/></button>}</>}</div></td></tr>)}</tbody></table>{shown.length===0&&<EmptyState text={`No ${config.title.toLowerCase()} found.`}/>}</div><div className="table-footer"><span>Showing <strong>{sorted.length?((page-1)*pageSize+1):0}–{Math.min(page*pageSize,sorted.length)}</strong> of <strong>{sorted.length}</strong> records</span><div className="pagination"><button disabled={page===1} onClick={()=>setPage(p=>p-1)}>Previous</button><span>{page} / {pages}</span><button disabled={page===pages} onClick={()=>setPage(p=>p+1)}>Next</button></div></div></section>
    {modal&&<RecordModal config={config} moduleKey={moduleKey} initial={editing} data={data} onClose={()=>setModal(false)} onSave={save}/>}
    {view&&<DetailModal row={view} moduleKey={moduleKey} data={data} onClose={()=>setView(null)} onPrint={()=>window.print()}/>}
    {confirm&&<ConfirmModal title={`Delete ${config.singular.toLowerCase()}?`} text="This action cannot be undone. Related records may need manual review." onCancel={()=>setConfirm(null)} onConfirm={deleteRow}/>}
    {payment&&<PaymentModal invoice={payment} data={data} onClose={()=>setPayment(null)}/>}
  </>
}

function RecordModal({config,moduleKey,initial,data,onClose,onSave}) {
  const [form,setForm]=useState(()=>initial?{...initial}:{})
  const [errors,setErrors]=useState({})
  const set=(k,v)=>setForm(f=>({...f,[k]:v}))
  const optionsFor=(source)=>{
    if(source==='properties')return data.properties.map(x=>[x.id,x.name])
    if(source==='units')return data.units.map(x=>[x.id,`${x.number} · ${x.status}`])
    if(source==='availableUnits')return data.units.filter(x=>x.status==='Available').map(x=>[x.id,`${x.number} · ${x.rent.toLocaleString()} KSh`])
    if(source==='availableLeaseUnits')return data.units.filter(x=>x.status==='Available'||x.id===initial?.unitId).map(x=>[x.id,x.number])
    if(source==='tenants')return data.tenants.map(x=>[x.id,x.name])
    return []
  }
  const validate=()=>{const e={};config.fields.forEach(([key,label,type,required])=>{if(required&&(form[key]===undefined||form[key]===''))e[key]=`${label} is required`;if(type==='email'&&form[key]&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form[key]))e[key]='Enter a valid email';if(type==='number'&&form[key]!==undefined&&Number(form[key])<0)e[key]='Enter a positive value'});setErrors(e);return Object.keys(e).length===0}
  const submit=e=>{e.preventDefault();if(validate())onSave(form)}
  return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><div className="modal modal-wide"><div className="modal-header"><div><span className="eyebrow">{initial?'UPDATE RECORD':'NEW RECORD'}</span><h2>{initial?'Edit':'Add'} {config.singular}</h2></div><button className="icon-btn" onClick={onClose}><X/></button></div><form onSubmit={submit}><div className="form-grid">{config.fields.map(([key,label,type,required,opts])=><label className={type==='textarea'?'span-2':''} key={key}>{label}{required&&<i>*</i>}{type==='select'?<select value={form[key]??''} onChange={e=>set(key,e.target.value)}><option value="">Select {label.toLowerCase()}</option>{(Array.isArray(opts)?opts:optionsFor(opts)).map(o=><option key={Array.isArray(o)?o[0]:o} value={Array.isArray(o)?o[0]:o}>{Array.isArray(o)?o[1]:o}</option>)}</select>:type==='textarea'?<textarea rows="3" value={form[key]??''} onChange={e=>set(key,e.target.value)}/>:<input type={type} min={type==='number'?0:undefined} value={form[key]??''} onChange={e=>set(key,type==='number'?e.target.value:e.target.value)}/ >}{errors[key]&&<small className="field-error">{errors[key]}</small>}</label>)}</div><div className="modal-actions"><button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button><button className="btn btn-primary"><Check size={16}/>{initial?'Save changes':`Create ${config.singular}`}</button></div></form></div></div>
}

function DetailModal({row,moduleKey,data,onClose,onPrint}) {
  const config=moduleConfig[moduleKey]
  const human=k=>k.replace(/([A-Z])/g,' $1').replace(/^./,s=>s.toUpperCase())
  const value=(k,v)=>k==='propertyId'?data.properties.find(x=>x.id===v)?.name||v:k==='tenantId'?data.tenants.find(x=>x.id===v)?.name||v:k==='unitId'?data.units.find(x=>x.id===v)?.number||v:['rent','deposit','amount','paid','cost'].includes(k)?money(v):v
  return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><div className="modal"><div className="modal-header"><div><span className="eyebrow">RECORD DETAILS</span><h2>{row.name||row.title||row.applicant||row.id}</h2></div><button className="icon-btn" onClick={onClose}><X/></button></div><div className="detail-grid">{Object.entries(row).filter(([k])=>k!=='password').map(([k,v])=><div key={k}><span>{human(k)}</span><strong>{k==='status'?<StatusBadge status={v}/>:value(k,v)||'—'}</strong></div>)}</div><div className="modal-actions"><button className="btn btn-secondary" onClick={onPrint}><Printer size={16}/> Print</button><button className="btn btn-primary" onClick={onClose}>Done</button></div></div></div>
}
function ConfirmModal({title,text,onCancel,onConfirm}) {return <div className="modal-backdrop"><div className="modal confirm-modal"><div className="confirm-icon"><Trash2/></div><h2>{title}</h2><p>{text}</p><div className="modal-actions"><button className="btn btn-secondary" onClick={onCancel}>Cancel</button><button className="btn btn-danger" onClick={onConfirm}>Delete record</button></div></div></div>}
function PaymentModal({invoice,data,onClose}) {
  const {update,notify}=useStore()
  const [amount,setAmount]=useState('')
  const [method,setMethod]=useState('Mobile Money')
  const [reference,setReference]=useState('')
  const tenant=data.tenants.find(t=>t.id===invoice.tenantId)
  const balance=Number(invoice.amount)-Number(invoice.paid||0)
  const submit=e=>{e.preventDefault();const n=Number(amount);if(!n||n<1||n>balance){notify(`Enter a payment between KSh 1 and ${money(balance)}.`);return}const paid=Number(invoice.paid||0)+n;update('invoices',invoice.id,{paid,status:paid>=invoice.amount?'Paid':'Partial',method,reference:reference||`PAY-${Date.now().toString().slice(-6)}`});notify('Payment recorded and invoice balance updated.');onClose()}
  return <div className="modal-backdrop"><div className="modal"><div className="modal-header"><div><span className="eyebrow">RENT COLLECTION</span><h2>Record payment</h2></div><button className="icon-btn" onClick={onClose}><X/></button></div><div className="payment-context"><strong>{tenant?.name||'Tenant'}</strong><span>{invoice.id} · {invoice.month}</span><div><small>Outstanding balance</small><b>{money(balance)}</b></div></div><form onSubmit={submit}><label>Payment amount (KSh)<input type="number" min="1" max={balance} value={amount} onChange={e=>setAmount(e.target.value)} required/></label><label>Payment method<select value={method} onChange={e=>setMethod(e.target.value)}><option>Mobile Money</option><option>Bank Transfer</option><option>Cash</option><option>Card</option></select></label><label>Payment reference<input value={reference} onChange={e=>setReference(e.target.value)} placeholder="e.g. MPESA code"/></label><div className="modal-actions"><button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button><button className="btn btn-primary"><CreditCard size={16}/> Save payment</button></div></form></div></div>
}

function Reports() {
  const {data,notify}=useStore()
  const income=data.invoices.reduce((s,x)=>s+Number(x.paid||0),0), expenses=data.expenses.reduce((s,x)=>s+Number(x.amount||0),0)
  const occupancy=data.units.length?Math.round(data.units.filter(u=>u.status==='Occupied').length/data.units.length*100):0
  const expenseGroups=Object.entries(data.expenses.reduce((a,e)=>({...a,[e.category]:(a[e.category]||0)+Number(e.amount)}),{})).map(([name,value])=>({name,value}))
  const exportAll=()=>{const rows=[['Report','Value'],['Properties',data.properties.length],['Rental units',data.units.length],['Occupancy',`${occupancy}%`],['Rent collected',income],['Outstanding rent',data.invoices.reduce((s,x)=>s+Math.max(0,x.amount-x.paid),0)],['Expenses',expenses],['Net cash flow',income-expenses]];downloadCSV('estateflow-financial-summary.csv',rows)}
  return <><PageHeading title="Reports & analytics" description="A consolidated view of portfolio performance and financial health." action={<button className="btn btn-primary" onClick={exportAll}><Download size={16}/> Export summary</button>}/><div className="stat-grid"><StatCard label="Occupancy rate" value={`${occupancy}%`} icon={Home} tone="blue" sub="Occupied rental units"/><StatCard label="Rent collected" value={money(income)} icon={Wallet} tone="green" sub="Recorded invoice payments"/><StatCard label="Operating expenses" value={money(expenses)} icon={Receipt} tone="orange" sub="Recorded property expenses"/><StatCard label="Net cash flow" value={money(income-expenses)} icon={TrendingUp} tone="purple" sub="Collected rent less expenses"/></div><div className="reports-grid"><section className="panel"><div className="panel-heading"><div><h3>Expense distribution</h3><p>Recorded operating expenses by category</p></div></div><div className="report-chart"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={expenseGroups} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>{expenseGroups.map((e,i)=><Cell key={e.name} fill={['#5278e8','#23b58a','#f0a35b','#9274d8','#e87979','#49a6b9'][i%6]}/>)}</Pie><Tooltip formatter={v=>money(v)}/><Legend/></PieChart></ResponsiveContainer></div></section><section className="panel"><div className="panel-heading"><div><h3>Portfolio performance</h3><p>Live figures calculated from your records</p></div></div><div className="report-metrics">{[['Properties',data.properties.length],['Rental units',data.units.length],['Active tenants',data.tenants.filter(t=>t.status==='Active').length],['Active leases',data.leases.filter(l=>l.status==='Active').length],['Outstanding invoices',data.invoices.filter(i=>i.status==='Overdue'||i.status==='Partial').length],['Open maintenance',data.maintenance.filter(m=>m.status!=='Completed').length]].map(([l,v])=><div key={l}><span>{l}</span><strong>{v}</strong></div>)}</div></section></div><section className="panel report-list"><div className="panel-heading"><div><h3>Available reports</h3><p>Export a CSV snapshot of key operational data.</p></div></div><div className="report-links">{[['Property register','properties'],['Tenant register','tenants'],['Rent collection','invoices'],['Expense ledger','expenses'],['Maintenance log','maintenance'],['Utility register','utilities']].map(([label,key])=><div key={key}><div className="report-file"><FileDown size={18}/></div><div><strong>{label}</strong><span>{data[key].length} records available</span></div><button className="btn btn-secondary btn-small" onClick={()=>exportCSV(key,data[key])}><Download size={14}/> CSV</button></div>)}</div></section></>
}
function TenantPortal({payments=false}) {
  const {data,user,notify}=useStore()
  const tenant=data.tenants.find(t=>t.email===user.email)||data.tenants[0]
  const unit=data.units.find(u=>u.id===tenant?.unitId)
  const property=data.properties.find(p=>p.id===unit?.propertyId)
  const invoices=data.invoices.filter(i=>i.tenantId===tenant?.id)
  return <><PageHeading title={payments?'My payments':'My rental'} description="Your tenancy information and account activity."/><div className="tenant-welcome panel"><div className="tenant-welcome-icon"><Home size={26}/></div><div><span className="eyebrow">TENANT PORTAL</span><h2>Welcome, {tenant?.name||user.name}</h2><p>{property?.name||'Your rental home'} · Unit {unit?.number||'Not assigned'}</p></div><StatusBadge status={tenant?.status||'Active'}/></div>{payments?<section className="panel table-panel"><div className="panel-heading"><div><h3>Payment history</h3><p>Your rent invoices and payment status</p></div></div><InvoiceTable rows={invoices}/></section>:<div className="tenant-grid"><section className="panel"><h3>Rental details</h3><div className="detail-grid">{[['Property',property?.name],['Unit',unit?.number],['Monthly rent',money(unit?.rent)],['Security deposit',money(unit?.deposit)],['Address',property?.address],['Move-in date',tenant?.joined]].map(([a,b])=><div key={a}><span>{a}</span><strong>{b||'—'}</strong></div>)}</div></section><section className="panel"><h3>Account summary</h3><div className="tenant-balance"><span>Outstanding rent</span><strong>{money(invoices.reduce((s,i)=>s+Math.max(0,i.amount-i.paid),0))}</strong><small>Across {invoices.length} invoices</small></div><button className="btn btn-primary full" onClick={()=>window.location.href='/my-payments'}>View payment history <ArrowUpRight size={16}/></button></section></div>}</>
}
function Profile() {
  const {user,setUser,notify}=useStore()
  const [name,setName]=useState(user.name),[password,setPassword]=useState(user.password)
  const save=e=>{e.preventDefault();setUser({...user,name,password});notify('Profile updated successfully.')}
  return <><PageHeading title="My profile" description="Manage your account details and sign-in credentials."/><section className="panel profile-panel"><div className="profile-large"><div className="avatar avatar-large">{user.name.split(' ').map(x=>x[0]).slice(0,2).join('')}</div><div><h3>{user.name}</h3><p>{user.role} · {user.email}</p></div></div><form onSubmit={save} className="profile-form"><label>Full name<input value={name} onChange={e=>setName(e.target.value)} required/></label><label>Email address<input value={user.email} disabled/></label><label>New password<input value={password} onChange={e=>setPassword(e.target.value)} required minLength="6"/></label><button className="btn btn-primary">Save profile</button></form></section></>
}

function exportCSV(key,rows) {
  if(!rows.length)return
  const headers=[...new Set(rows.flatMap(r=>Object.keys(r).filter(k=>k!=='password')))]
  const csv=[headers.join(','),...rows.map(r=>headers.map(h=>`"${String(r[h]??'').replaceAll('"','""')}"`).join(','))].join('\n')
  downloadCSV(`estateflow-${key}.csv`,csv)
}
function downloadCSV(filename,content) {
  const blob=new Blob([Array.isArray(content)?content.map(r=>r.join(',')).join('\n'):content],{type:'text/csv;charset=utf-8;'})
  const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url)
}

export default App
