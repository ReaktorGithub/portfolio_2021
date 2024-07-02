import Button from "../pages/todo/components/UI/Button";
import {configure, mount, render, shallow} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from "enzyme-to-json";
import Input from "../pages/todo/components/UI/Input";
import TaskList from "../pages/todo/components/TaskList";
import Task from "../pages/todo/components/Task";

configure({ adapter: new Adapter() });

describe('тестирование Todo', function () {

    describe('Тест Todo: Button', () => {

        it('отрисовка Button', () => {
            const comp = mount(<Button/>);
            const wrapper = comp.find('button');
            console.log(wrapper.html());
            expect(wrapper.length).toBe(1);
        })

        // снапшоты

        // способ 1
        it("renders correctly", () => {
            const tree = shallow(<Button />);
            expect(toJson(tree)).toMatchSnapshot();
        });

        // способ 2, без toJson и с render
        const snapshot = (text, color) => {
            const wrapper = render(<Button text={text} color={color} />);
            it(`text = ${text}, color = ${color}`, () => {
                expect(wrapper).toMatchSnapshot();
            });
        }

        snapshot('Я снова кнопка');
        snapshot('Я красная кнопка', 'red');
    });

    describe('Тест Todo: Input', function () {

        it('отрисовка Input', () => {
            const input = mount(<Input/>);
            const wrapper = input.find('input');
            expect(wrapper.length).toBe(1);
            console.log(wrapper.html());
        })

        it('снапшот Input', () => {
            const input = shallow(<Input/>);
            expect(toJson(input)).toMatchSnapshot();
        })

        const props = {
            placeholder: 'Введите пароль',
            handleInput: () => {},
            value: 'пароль',
        }

        it('инпут должен принять пропсы', () => {
            const wrapper = shallow(<Input {...props}/>);
            expect(wrapper.props().placeholder).toEqual('Введите пароль');
            expect(wrapper.props().value).toEqual('пароль');
            console.log(wrapper.html());
        })
    });

    describe('Тест Todo: TaskList', () => {

        const type = 'none';
        const list = [
            {
                id: 1,
                text: 'Бегать',
                priority: 'none',
            },
            {
                id: 2,
                text: 'Позвонить на работу',
                priority: 'priority1',
            },
        ]

        it('снапшот отрисовки списка', () => {
            const wrapper = mount(<TaskList type={type} list={list}/>);
            expect(wrapper).toMatchSnapshot();
            console.log(wrapper.html());
        })

        it("разметка должна содержать p > Бегать", () => {
            const wrapper = mount(<TaskList type={type} list={list} />);
            const value = wrapper.find("p").text();
            console.log(value);
            expect(value).toEqual("Бегать");
        });
    })

    describe('Тест Todo: Task', () => {

        let component;
        beforeEach(() => {
            component = shallow(<Task task={ {
                id: 1,
                text: 'Бегать',
                priority: 'none',
            } }/>);
        })

        it('снапшот Task', () => {
            expect(component).toMatchSnapshot();
        })

        it('рендер Task', () => {
            const wrapper = component.find('.Task');
            expect(wrapper.length).toBe(1);
        })
    })
});

