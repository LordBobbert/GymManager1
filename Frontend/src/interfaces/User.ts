// src/interfaces/User.ts

// Base User interface
export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'trainer' | 'client';
  }
  
 

// Client extends User
export interface Client extends User {
    phone_number: string;
    training_status: 'active' | 'inactive' | 'on_vacation';
    emergency_contact_name: string;
    emergency_contact_phone: string;
}

// Trainer extends User
export interface Trainer extends User {
    phone_number: string;
    status: 'employee_part_time' | 'employee_full_time' | 'subcontractor_part_time' | 'subcontractor_full_time' | 'inactive';
    monthly_rent_rate?: number;
    rent_per_session?: number;
}
