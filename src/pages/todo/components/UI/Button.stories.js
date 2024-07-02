import React from 'react';
import Button from './Button';

export default {
    component: Button,
    title: 'Button',
};

const Template = args => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
    text: 'Я - кнопка',
};

export const Red = Template.bind({});
Red.args = {
    color: 'red',
    text: 'Я - красная кнопка',
};