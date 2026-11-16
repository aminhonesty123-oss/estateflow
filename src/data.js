export const initialData = {
  properties: [
    { id:'PROP-1001', name:'The Meridian Residences', category:'Apartments', address:'Westlands, Nairobi', city:'Nairobi', owner:'Meridian Holdings', units:24, description:'Modern residential apartments close to business and retail amenities.', amenities:'Parking, Gym, Lift, Backup generator', image:'', createdAt:'2026-01-10' },
    { id:'PROP-1002', name:'Kilimani Heights', category:'Apartments', address:'Kindaruma Road, Kilimani', city:'Nairobi', owner:'Amina Estates', units:18, description:'Contemporary apartments with secure access and shared facilities.', amenities:'Security, Borehole, Parking', image:'', createdAt:'2026-02-04' },
    { id:'PROP-1003', name:'Riverside Business Centre', category:'Commercial', address:'Riverside Drive, Nairobi', city:'Nairobi', owner:'Riverside Ltd', units:12, description:'Flexible commercial offices for growing teams.', amenities:'Reception, Fibre, Generator, Lift', image:'', createdAt:'2026-03-12' }
  ],
  units: [
    { id:'UNIT-001', propertyId:'PROP-1001', number:'A-101', bedrooms:2, bathrooms:2, floor:1, rent:85000, deposit:85000, status:'Occupied', tenantId:'TEN-001' },
    { id:'UNIT-002', propertyId:'PROP-1001', number:'A-102', bedrooms:1, bathrooms:1, floor:1, rent:62000, deposit:62000, status:'Available', tenantId:'' },
    { id:'UNIT-003', propertyId:'PROP-1001', number:'B-204', bedrooms:3, bathrooms:2, floor:2, rent:115000, deposit:115000, status:'Occupied', tenantId:'TEN-002' },
    { id:'UNIT-004', propertyId:'PROP-1002', number:'K-3B', bedrooms:2, bathrooms:2, floor:3, rent:78000, deposit:78000, status:'Occupied', tenantId:'TEN-003' },
    { id:'UNIT-005', propertyId:'PROP-1002', number:'K-4A', bedrooms:1, bathrooms:1, floor:4, rent:55000, deposit:55000, status:'Under Maintenance', tenantId:'' },
    { id:'UNIT-006', propertyId:'PROP-1003', number:'OFF-08', bedrooms:0, bathrooms:1, floor:2, rent:145000, deposit:290000, status:'Reserved', tenantId:'' }
  ],
  tenants: [
    { id:'TEN-001', name:'Grace Wanjiku', email:'grace.w@example.com', phone:'+254 712 345 678', emergency:'Peter Wanjiku · +254 722 100 200', status:'Active', unitId:'UNIT-001', joined:'2025-08-01' },
    { id:'TEN-002', name:'Brian Otieno', email:'b.otieno@example.com', phone:'+254 723 456 789', emergency:'Mary Otieno · +254 733 222 111', status:'Active', unitId:'UNIT-003', joined:'2025-11-15' },
    { id:'TEN-003', name:'Faith Njeri', email:'faith.n@example.com', phone:'+254 701 555 234', emergency:'James Njeri · +254 711 444 333', status:'Active', unitId:'UNIT-004', joined:'2026-02-01' }
  ],
  applications: [
    { id:'APP-001', applicant:'Kevin Mwangi', email:'kevin.m@example.com', phone:'+254 722 800 100', unitId:'UNIT-002', moveIn:'2026-12-01', status:'Pending', submitted:'2026-11-10' }
  ],
  leases: [
    { id:'LEASE-001', tenantId:'TEN-001', unitId:'UNIT-001', start:'2025-08-01', end:'2027-07-31', rent:85000, deposit:85000, status:'Active' },
    { id:'LEASE-002', tenantId:'TEN-002', unitId:'UNIT-003', start:'2025-11-15', end:'2026-12-15', rent:115000, deposit:115000, status:'Expiring Soon' },
    { id:'LEASE-003', tenantId:'TEN-003', unitId:'UNIT-004', start:'2026-02-01', end:'2027-01-31', rent:78000, deposit:78000, status:'Active' }
  ],
  invoices: [
    { id:'INV-2026-101', tenantId:'TEN-001', unitId:'UNIT-001', month:'November 2026', due:'2026-11-05', amount:85000, paid:85000, status:'Paid', method:'Mobile Money', reference:'MPESA-Q7F21' },
    { id:'INV-2026-102', tenantId:'TEN-002', unitId:'UNIT-003', month:'November 2026', due:'2026-11-05', amount:115000, paid:50000, status:'Partial', method:'Bank Transfer', reference:'TRX-8831' },
    { id:'INV-2026-103', tenantId:'TEN-003', unitId:'UNIT-004', month:'November 2026', due:'2026-11-05', amount:78000, paid:0, status:'Overdue', method:'', reference:'' }
  ],
  maintenance: [
    { id:'MNT-001', propertyId:'PROP-1001', unitId:'UNIT-001', tenantId:'TEN-001', title:'Kitchen sink leak', category:'Plumbing', priority:'High', technician:'Peter Kamau', status:'In Progress', cost:6500, created:'2026-11-12' },
    { id:'MNT-002', propertyId:'PROP-1002', unitId:'UNIT-005', tenantId:'', title:'Replace bathroom tiles', category:'Repairs', priority:'Medium', technician:'Unassigned', status:'Pending', cost:18000, created:'2026-11-14' }
  ],
  expenses: [
    { id:'EXP-001', propertyId:'PROP-1001', category:'Security', description:'Monthly security services', amount:22000, date:'2026-11-01', vendor:'SecurePlus' },
    { id:'EXP-002', propertyId:'PROP-1002', category:'Utilities', description:'Common area water and power', amount:14500, date:'2026-11-03', vendor:'Utility provider' },
    { id:'EXP-003', propertyId:'PROP-1001', category:'Maintenance', description:'Lift servicing', amount:12000, date:'2026-11-08', vendor:'Otis Service' }
  ],
  inspections: [
    { id:'INS-001', propertyId:'PROP-1001', unitId:'UNIT-001', date:'2026-11-25', inspector:'Daniel Kimani', condition:'Good', notes:'Routine quarterly inspection', status:'Scheduled' }
  ],
  utilities: [
    { id:'UTL-001', propertyId:'PROP-1001', unitId:'UNIT-001', type:'Water', previous:120, current:134, rate:180, amount:2520, status:'Unpaid', date:'2026-11-01' },
    { id:'UTL-002', propertyId:'PROP-1001', unitId:'UNIT-001', type:'Electricity', previous:860, current:940, rate:28, amount:2240, status:'Paid', date:'2026-11-01' }
  ],
  staff: [
    { id:'STF-001', name:'Daniel Kimani', role:'Property Manager', department:'Operations', email:'daniel@estateflow.demo', phone:'+254 711 222 333', status:'Available', propertyId:'PROP-1001' },
    { id:'STF-002', name:'Peter Kamau', role:'Maintenance Technician', department:'Maintenance', email:'peter@estateflow.demo', phone:'+254 722 333 444', status:'On Task', propertyId:'PROP-1002' }
  ],
  users: [
    { id:'USR-001', name:'Alex Admin', email:'admin@estateflow.demo', password:'admin123', role:'Administrator' },
    { id:'USR-002', name:'Daniel Kimani', email:'manager@estateflow.demo', password:'demo123', role:'Property Manager' },
    { id:'USR-003', name:'Mary Accounts', email:'accounts@estateflow.demo', password:'demo123', role:'Accountant' },
    { id:'USR-004', name:'Peter Kamau', email:'tech@estateflow.demo', password:'demo123', role:'Maintenance Technician' },
    { id:'USR-005', name:'Grace Wanjiku', email:'tenant@estateflow.demo', password:'demo123', role:'Tenant' },
    { id:'USR-006', name:'Amina Owner', email:'owner@estateflow.demo', password:'demo123', role:'Property Owner' }
  ],
  notifications: [
    { id:'NTF-001', title:'Rent payment outstanding', detail:'Brian Otieno has a balance of KSh 65,000.', date:'Today', read:false, type:'warning' },
    { id:'NTF-002', title:'Lease expiring soon', detail:'LEASE-002 ends on 15 December 2026.', date:'Today', read:false, type:'info' },
    { id:'NTF-003', title:'New maintenance request', detail:'Bathroom tile replacement is awaiting approval.', date:'Yesterday', read:true, type:'success' }
  ]
}

export const moduleConfig = {
  properties: { title:'Properties', singular:'Property', icon:'Building2', description:'Manage your portfolio, ownership and property details.', fields:[
    ['name','Property name','text',true],['category','Category','select',true,['Apartments','Houses','Offices','Commercial']],['address','Address','text',true],['city','City','text',true],['owner','Owner / company','text',true],['units','Number of units','number'],['amenities','Amenities','text'],['description','Description','textarea']
  ]},
  units: { title:'Rental units', singular:'Unit', icon:'DoorOpen', description:'Track availability, rental rates and tenant assignments.', fields:[
    ['propertyId','Property','select',true,'properties'],['number','Unit number','text',true],['bedrooms','Bedrooms','number'],['bathrooms','Bathrooms','number'],['floor','Floor','number'],['rent','Monthly rent (KSh)','number',true],['deposit','Security deposit (KSh)','number'],['status','Status','select',true,['Available','Occupied','Reserved','Under Maintenance']]
  ]},
  tenants: { title:'Tenants', singular:'Tenant', icon:'Users', description:'Tenant directory, contact details and rental relationships.', fields:[
    ['name','Full name','text',true],['email','Email','email',true],['phone','Phone number','text',true],['emergency','Emergency contact','text'],['status','Status','select',true,['Active','Former']],['unitId','Rental unit','select',false,'units'],['joined','Move-in date','date']
  ]},
  applications: { title:'Applications', singular:'Application', icon:'ClipboardList', description:'Review prospective tenants and approve suitable applications.', fields:[
    ['applicant','Applicant name','text',true],['email','Email','email',true],['phone','Phone','text',true],['unitId','Requested unit','select',true,'availableUnits'],['moveIn','Preferred move-in','date',true],['status','Status','select',true,['Pending','Approved','Rejected']]
  ]},
  leases: { title:'Leases', singular:'Lease', icon:'FileText', description:'Create and monitor rental agreements and renewal dates.', fields:[
    ['tenantId','Tenant','select',true,'tenants'],['unitId','Unit','select',true,'availableLeaseUnits'],['start','Lease start','date',true],['end','Lease end','date',true],['rent','Monthly rent (KSh)','number',true],['deposit','Security deposit (KSh)','number'],['status','Status','select',true,['Active','Expiring Soon','Expired','Terminated']]
  ]},
  invoices: { title:'Rent collection', singular:'Invoice', icon:'Wallet', description:'Generate invoices, record partial payments and track arrears.', fields:[
    ['tenantId','Tenant','select',true,'tenants'],['unitId','Unit','select',true,'units'],['month','Billing month','text',true],['due','Due date','date',true],['amount','Invoice amount (KSh)','number',true],['paid','Amount paid (KSh)','number'],['method','Payment method','select',false,['Cash','Bank Transfer','Card','Mobile Money']],['reference','Payment reference','text']
  ]},
  maintenance: { title:'Maintenance', singular:'Request', icon:'Wrench', description:'Coordinate repair requests, technicians and service costs.', fields:[
    ['propertyId','Property','select',true,'properties'],['unitId','Unit','select',true,'units'],['title','Issue title','text',true],['category','Category','select',true,['Plumbing','Electrical','Painting','Repairs','Cleaning','Other']],['priority','Priority','select',true,['Low','Medium','High','Urgent']],['technician','Technician','text'],['status','Status','select',true,['Pending','Approved','Assigned','In Progress','Completed']],['cost','Estimated / actual cost (KSh)','number']
  ]},
  expenses: { title:'Expenses', singular:'Expense', icon:'Receipt', description:'Record operating costs and understand property profitability.', fields:[
    ['propertyId','Property','select',true,'properties'],['category','Category','select',true,['Maintenance','Utilities','Security','Cleaning','Insurance','Taxes','Other']],['description','Description','text',true],['amount','Amount (KSh)','number',true],['date','Date','date',true],['vendor','Vendor / payee','text']
  ]},
  inspections: { title:'Inspections', singular:'Inspection', icon:'ClipboardCheck', description:'Schedule property visits and record condition reports.', fields:[
    ['propertyId','Property','select',true,'properties'],['unitId','Unit','select',false,'units'],['date','Inspection date','date',true],['inspector','Inspector','text',true],['condition','Condition','select',true,['Excellent','Good','Fair','Poor']],['notes','Findings / damages','textarea'],['status','Status','select',true,['Scheduled','Completed','Follow-up Required']]
  ]},
  utilities: { title:'Utilities', singular:'Utility reading', icon:'Gauge', description:'Record meter readings, calculate bills and track settlement.', fields:[
    ['propertyId','Property','select',true,'properties'],['unitId','Unit','select',true,'units'],['type','Utility type','select',true,['Water','Electricity']],['previous','Previous reading','number',true],['current','Current reading','number',true],['rate','Rate per unit (KSh)','number',true],['date','Reading date','date',true],['status','Payment status','select',true,['Unpaid','Paid']]
  ]},
  staff: { title:'Staff', singular:'Staff member', icon:'ContactRound', description:'Manage team members, departments and assignments.', fields:[
    ['name','Full name','text',true],['role','Job title','select',true,['Property Manager','Maintenance Technician','Accountant','Security','Cleaner']],['department','Department','text'],['email','Email','email',true],['phone','Phone','text'],['status','Availability','select',true,['Available','On Task','On Leave']],['propertyId','Assigned property','select',false,'properties']
  ]},
  users: { title:'User accounts', singular:'User', icon:'ShieldCheck', description:'Manage demo access and role permissions.', fields:[
    ['name','Full name','text',true],['email','Email','email',true],['password','Password','text',true],['role','Role','select',true,['Administrator','Property Owner','Property Manager','Accountant','Maintenance Technician','Tenant']]
  ]}
}
