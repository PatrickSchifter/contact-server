import { prisma } from "../database/prima-client";
import { ContactRepository, Contact, ContactCreateData, ContactUpdate } from "../interfaces/contact.interface";

class ContactRepositoryPrisma implements ContactRepository{
    async create(data: ContactCreateData): Promise<Contact> {
        const result = await prisma.contacts.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                userId: data.userId
            }
        })
        return result;
    }

    async findByEmailOrPhone(email: string, phone: string): Promise<Contact | null>{
        const result = await prisma.contacts.findFirst({
            where:{
                OR: [
                        {email},
                        {phone}
                ]
            }
        });
        return result || null;
    }

    async findAllContacts(userId: number): Promise<Contact[] | null>{
        const result = await prisma.contacts.findMany({
            where:{
                userId
            }
        });
        return result || null;
    };

    async updateContact({id, name, email, phone}: ContactUpdate): Promise<Contact>{
        const result = await prisma.contacts.update({
            where:{
                id
            },
            data:{
                name: name,
                email: email,
                phone: phone
            }
        });
        return result;
    }

    async deleteContact(id:number):Promise <boolean>{
        await prisma.contacts.delete({
            where: {
                id
            }
        });
        return true
    }
}

export {ContactRepositoryPrisma};