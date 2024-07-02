import React from 'react';
import Task from './Task';

export default {
    component: Task,
    title: 'Task',
};

const Template = args => <Task {...args} />;

export const Default = Template.bind({});
Default.args = {
task: {
    id: 1,
    text: 'Короткая задача',
    priority: 'none',
}
};

export const Long = Template.bind({});
Long.args = {
    task: {
        id: 2,
        text: 'Рыбатекст используется дизайнерами, проектировщиками и фронтендерами, когда нужно быстро заполнить макеты или прототипы содержимым. Это тестовый контент, который не должен нести никакого смысла, лишь показать наличие самого текста или продемонстрировать типографику в деле.\n' +
            '\n' +
            'C помощью этого онлайн-генератора рыботекста можно пачками плодить как отдельные предложения и заголовки, так и целые абзацы отменнейшего рыбы-текста. А для любителей автоматизации даже реализован API фиштекста.',
        priority: 'priority1',
    }
};

