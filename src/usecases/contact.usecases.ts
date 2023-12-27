import { Contact, ContactCreate, ContactRepository, ContactUpdate } from "../interfaces/contact.interface";
import { UserRepository } from "../interfaces/user.interface";
import { ContactRepositoryPrisma } from "../repositories/contact.repositories";
import { UserRepositoryPrisma } from "../repositories/user.repositories";

class ContactUseCase{
    private contactRepository: ContactRepository;
    private userRepository: UserRepository;
    constructor(){
        this.contactRepository = new ContactRepositoryPrisma();
        this.userRepository = new UserRepositoryPrisma();
    }

    async create ({name, email, phone, userEmail}: ContactCreate): Promise<Contact>{

        const user = await this.userRepository.findByEmail(userEmail);

        if(!user){
            throw new Error('User not found');
        }

        const verifyIfExistsContact = await this.contactRepository.findByEmailOrPhone(email, phone);

        if(verifyIfExistsContact){
            throw new Error('Contact already exists.');
        }

        const contact = await this.contactRepository.create({
            name, 
            email, 
            phone, 
            userId: user.id
        })
        return contact;
    }

    async findAllContacts (email: string): Promise<Contact[] | null>{
        const user = await this.userRepository.findByEmail(email);
        
        if(!user){
            throw new Error('User not found');
        }
        const result = await this.contactRepository.findAllContacts(user.id);
        
        return result;
    }

    async updateContact ({id, name, email, phone}: ContactUpdate){
        const data = this.contactRepository.updateContact({
            id, 
            name, 
            email, 
            phone
        });
        return data;
    }

    async deleteContact (id:number){
        const data = this.contactRepository.deleteContact(id);
        return true;
    }
}

export {ContactUseCase};