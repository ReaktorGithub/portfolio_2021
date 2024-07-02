import React from "react";

export interface ITask {
    id: number;
    text: string;
    priority: Priority;
}

export interface ITaskProps {
    task: ITask;
}

export type Priority = 'none' | 'priority1' | 'priority2' | 'priority3' | 'priority4';

export interface IButtonProps {
    text: string;
    color?: 'red';
}

export interface IInputProps {
    placeholder: string;
    handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

export interface ISelectProps {
    selected: Priority;
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    width?: string;
    height?: string;
}

export interface IStyledSelectProps {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    value: Priority;
    width?: string;
    height?: string;
}

export interface IDoneListProps {
    typeText: string;
    list: ITask[];
    handleClear: (list: ITask[]) => void;
}

export interface ITaskContext {
    addDone: (task: ITask) => void;
    addCancelled: (task: ITask) => void;
    confirmEdit: (task: ITask, temp: string) => void;
    confirmMove: (task: ITask, value: Priority) => void;
}

export interface ITaskListProps {
    list: ITask[];
    type: Priority;
}

export interface IFormProps {
    handleForm: (e: React.FormEvent<HTMLFormElement>, value: string, selected: Priority) => void;
}


