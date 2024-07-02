import React from 'react';
import TaskList from './TaskList';

export default {
    component: TaskList,
    title: 'TaskList',
};

const Template = args => <TaskList {...args} />;

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
    {
        id: 3,
        text: 'За сахаром',
        priority: 'priority2',
    },
    {
        id: 4,
        text: 'Выучить сторибук',
        priority: 'priority3',
    },
    {
        id: 5,
        text: 'Посмотреть кино',
        priority: 'priority4',
    },
    {
        id: 6,
        text: 'Покушать',
        priority: 'priority2',
    },
]

export const Default = Template.bind({});
Default.args = {
    list: list,
    type: 'none',
};

export const IU = Template.bind({});
IU.args = {
    list: list,
    type: 'priority1',
};

export const INU = Template.bind({});
INU.args = {
    list: list,
    type: 'priority2',
};

export const UU = Template.bind({});
UU.args = {
    list: list,
    type: 'priority3',
};

export const UNU = Template.bind({});
UNU.args = {
    list: list,
    type: 'priority4',
};
