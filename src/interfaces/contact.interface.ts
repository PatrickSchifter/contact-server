export interface Contact{
    id: number;
    name: string;
    email: string;
    phone: string;
    userId: number;
}

export interface ContactCreate{
    name: string;
    email: string;
    phone: string;
    userEmail: string;
}

export interface ContactUpdate{
    id: number;
    name: string;
    email: string;
    phone: string;
}

export interface ContactCreateData{
    name: string;
    email: string;
    phone: string;
    userId: number;
}

export interface ContactRepository{
    create(data: ContactCreateData): Promise<Contact>
    findByEmailOrPhone(email: String, phone: String): Promise<Contact | null>
    findAllContacts(userId: number): Promise<Contact[] | null>
    updateContact(data: ContactUpdate): Promise<Contact>
    deleteContact(id: number): Promise<boolean>
}