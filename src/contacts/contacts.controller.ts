import { Controller } from '@nestjs/common';
import { Contact } from './contact.entity';
import { ContactsService } from './contacts.service';
import { Get, Post,Put, Delete, Body, Param } from  '@nestjs/common';

@Controller('contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService){}
  
  @Get()
  index(): Promise<Contact[]> {
    return this.contactsService.findAll();
  }   

  @Post('create')
  async create(@Body() contactData: Contact): Promise<any> {
    return this.contactsService.create(contactData);
  }  

  @Put(':id/update')
  async update(@Param('id') id, @Body() contactData: Contact): Promise<any> {
    contactData.id = Number(id);
    this.contactsService.update(contactData);
    return this.contactsService.find(contactData.id);
  }  

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    this.contactsService.delete(id);
    return {id: Number(id)}
  }  
}
