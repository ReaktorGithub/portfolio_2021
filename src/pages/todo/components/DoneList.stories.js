import React from 'react';
import DoneList from './DoneList';

export default {
    component: DoneList,
    title: 'DoneList',
};

const Template = args => <DoneList {...args} />;

const list = [
    {
        id: 1,
        text: 'Бегать',
        priority: 'none',
    },
    {
        id: 2,
        text: 'Важная срочная задача',
        priority: 'priority1',
    },
    {
        id: 3,
        text: 'За сахаром',
        priority: 'priority2',
    },
]

export const Done = Template.bind({});
Done.args = {
    typeText: 'Сделано',
    list: list,
};

export const Cancelled = Template.bind({});
Cancelled.args = {
    typeText: 'Отменено',
    list: list,
};

