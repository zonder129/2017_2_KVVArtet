import Block from '../block/block';

export const buttons = [
    {
        name: 'First',
        text: 'New Game'
    },
    {
        name: 'Second',
        text: 'Registration'
    },
    {
        name: 'Third',
        text: 'Information'
    }
];

const blockClass = 'button';

export class MainPage extends Block {
    constructor() {
        super('div', ['main-menu'], {});
        this.createChildren();
        //console.log(document.getElementsByClassName(("buttonFirst")));
        return this;
    }

    createChildren() {
            buttons.forEach((button) => {
                this.appendChildBlock(button.name,
                    new Block('a', [blockClass + button.name]).setText(button.text));
            });
        }
 }
export default MainPage;

