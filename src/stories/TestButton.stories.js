import React from 'react';
import TestButton from './TestButton';

export default {
    component: TestButton,
    title: 'TestButton',
};

const Template = args => <TestButton {...args} />;

export const Default = Template.bind({});
Default.args = {
    text: 'Я - кнопка',
};

export const Red = Template.bind({});
Red.args = {
    color: 'red',
    text: 'Я - красная кнопка',
};
