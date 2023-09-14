import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, InputGroup, InputGroupText } from 'reactstrap';

function CreateModal({ statuses, priorities, createTask }) {
    const [modal, setModal] = useState(false);
    const initialState ={
        name: '',
        description: '',
        status: statuses[0]?.name,
        priority: priorities[0]
    }
    const [newTask, setNewTask] = useState(initialState)


    const okButtonHandler = () => {
        toggle()
        createTask(newTask)
        setNewTask(initialState)
    };

    const toggle = ()  => setModal(!modal)

    return (
        <>
            <Button color="primary" onClick={toggle}>
                Create Task
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create task</ModalHeader>
                <ModalBody>
                    <InputGroup>
                        <InputGroupText>
                            Name
                        </InputGroupText>
                        <Input value={newTask.name}
                            onChange={event => setNewTask({ ...newTask, name: event.target.value }
                            )}
                        />
                    </InputGroup>
                    <br />

                    <InputGroup>
                        <InputGroupText>
                            Description
                        </InputGroupText>
                        <Input value={newTask.description}
                            onChange={(event => setNewTask({ ...newTask, description: event.target.value }))}
                        />
                    </InputGroup>
                    <br />


                    <Label for="unmountOnClose">Status</Label>{' '}
                    <Input
                        type="select"
                        name="unmountOnClose"
                        id="unmountOnClose"
                        value={newTask.status}
                        onChange={event =>
                            setNewTask({ ...newTask, status: event.target.value })
                        }
                    >
                        {statuses.map(el =>
                            <option
                                key={el._id}
                                value={el.name}
                            >
                                {el.name}
                            </option>
                        )}


                    </Input>
                    <Label for="unmountOnClose">Priority</Label>{' '}
                    <Input
                        type="select"
                        name="unmountOnClose"
                        id="unmountOnClose"
                        value={newTask.priority}
                        onChange={event =>
                            setNewTask({ ...newTask, priority: event.target.value })}
                    >
                        {priorities.map((el, i) =>
                            <option
                                key={i}
                                value={el}>
                                {el}
                            </option>
                        )}
                    </Input>


                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={okButtonHandler}
                        disabled={!newTask.name || !newTask.description}
                    >
                        Ok
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default CreateModal;