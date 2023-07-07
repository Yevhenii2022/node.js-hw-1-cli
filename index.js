const { Command } = require('commander');
const contacts = require('./contacts');
const { red, blue } = require('./helpers/consoleColors');

const program = new Command();

program
	.option(
		'-a, --action <string>',
		'choose action: list, get -i, add -n -e -p, remove -in',
	)
	.option('-i, --id <string>', 'user id')
	.option('-n, --name <string>', 'user name')
	.option('-e, --email <string>', 'user email')
	.option('-p, --phone <string>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case 'list':
			const contactsList = await contacts.listContacts();
			console.table(contactsList);
			break;

		case 'get':
			const contact = await contacts.getContactById(id);
			console.log(contact);
			break;

		case 'add':
			const newContact = await contacts.addContact(name, email, phone);
			console.log(
				newContact,
				`\n${blue} Contact with NAME - "${name}", was successfuly added.`,
			);
			break;

		case 'remove':
			const deleteContact = await contacts.removeContact(id);
			console.log(
				deleteContact,
				`\n${blue} Contact with ID - "${id}", was successfuly deleted.`,
			);
			break;

		default:
			console.warn(`${red} Unknown action type!`);
	}
}

invokeAction(argv);
