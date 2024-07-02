import React from 'react';
import Input from './Input';

export default {
    component: Input,
    title: 'Input',
};

const Template = args => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
    placeholder: 'Введите имя',
};

export const Todo = Template.bind({});
Todo.args = {
    placeholder: 'Введите задачу',
    handleInput: (e) => {
        console.log(e.target.value);
    }
};