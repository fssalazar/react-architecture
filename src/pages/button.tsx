/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'

export default function TodoList() {
    const [toDoList, setToDoList] = useState<any[]>([])
    const [label, setLabel] = useState('')
    return (
        <>
            <input
                type="text"
                name="addToList"
                value={label}
                onChange={(e: any) => {
                    if (e) {
                        setLabel(e.target.value)
                    }
                }}
            />
            <button
                type="button"
                onClick={() => {
                    setToDoList([{ label, hasCompleted: false }])
                    setLabel('')
                }}
            >
                Add
            </button>
            <h1>{`${
                toDoList.filter((t) => t.hasCompleted === true).length
            } remaining out of ${toDoList.length} tasks`}</h1>
            <ul>
                {toDoList.map((item, index) => {
                    return (
                        <li
                            className={item.hasCompleted ? 'is-done' : ''}
                            style={
                                item.hasCompleted
                                    ? { textDecoration: 'line-through' }
                                    : {}
                            }
                            onClick={() => {
                                setToDoList((state) => {
                                    state[index].hasCompletes = true
                                    return state
                                })
                            }}
                        >
                            {item.label}
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
