const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');

const searchBox = 'div[title="Caixa de texto de pesquisa"]';
const messageBox = 'div[title="Mensagem"]';
const contacts = readlineSync.question('Digite cada contato separado por vírgulas (Ex.: João,Maria,Carlos):\n');
const contactsArray = contacts.split(',');
const message = readlineSync.question('Digite a mensagem a ser enviada aos contatos:\n');
const confirmation = readlineSync.keyInYN('As informações estão corretas? Digite "y" (Sim) ou "n" (Não). Caso a resposta seja "y", o script será executado em seguida.');

(async () => {
    if (contactsArray.length > 0 && (message !== '' || undefined) && confirmation) {
        const browser = await puppeteer.launch({
            headless: false,
        });
        var page = await browser.newPage();
        await page.goto('https://web.whatsapp.com/');

        for (let i = 0; i < contactsArray.length; i++) {

            // Searching and selecting a contact:
            await page.waitForSelector(searchBox);
            await page.waitForTimeout(3000);
            await page.type(searchBox, contactsArray[i], { delay: 100 });
            await page.keyboard.press('Enter');

            // Sending a message to the selected contact:
            await page.waitForSelector(messageBox);
            await page.waitForTimeout(3000);
            await page.type(messageBox, message, { delay: 100 });
            await page.keyboard.press('Enter');
        }
        await page.waitForTimeout(5000);
        console.log('As mensagens foram enviadas aos contatos com sucesso!');
        await browser.close();

    } else {
        console.log('Não foi possível executar o script, rode novamente.');
    }
})();
