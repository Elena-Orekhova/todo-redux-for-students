import { React, useRef, useState } from 'react';
import './todo-field.css';
import { useDispatch } from 'react-redux';
import { deleteTodo, toggleTodoStatus } from '../../../action/todoActions';

const TodoField = ({ text, id, status }) => {
    const [disabled, setDisabled] = useState(false);
    const [fieldValue, setFieldValue] = useState(text);
    const inputRef = useRef(null);

    const dispatch = useDispatch();

    const handleDeleteTodo = () => {
        dispatch(deleteTodo(id));
    };

    const handleToggleStatus = () => {
        dispatch(toggleTodoStatus(id));
    };

    const showInput = () => {
        setDisabled((prev) => !prev);
        setTimeout(() => {
            inputRef.current.focus();
        }, 100);
    };

    const changeField = (e) => {
        setFieldValue(e.target.value);
    };

    const keyDownField = (e) => {
        if (e.key === 'Enter') {
            inputRef.current.blur();
        }
    };

    return (
        <div className="fieldWraper">
            {disabled ? (
                <input
                    value={fieldValue}
                    className="toDoField"
                    onBlur={() => setDisabled((prev) => !prev)}
                    onChange={changeField}
                    onKeyDown={keyDownField}
                    ref={inputRef}
                />
            ) : (
                <span
                    className={`toDoPharagraph ${
                        status ? 'toDoPharagraphDone' : 'totoDoPharagraphActive'
                    }`}
                    onClick={showInput}
                >
                    {fieldValue}
                </span>
            )}
            <button className="delBtn" onClick={handleDeleteTodo}>
                🗑️
            </button>
            <button className="complitedBtn" onClick={handleToggleStatus}>✔️</button>
        </div>
    );
};

export default TodoField;
