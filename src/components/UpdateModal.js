import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, InputGroup, InputGroupText } from 'reactstrap';

function UpdateModal({ statuses, priorities, task, changeTask }) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [updatedTask, setUpdatedTask] = useState({ ...task });

    const saveButtonHandler = () => {
        changeTask(updatedTask, task._id);
        toggle();
    }

    const cancelButtonHandler = () => {
        setUpdatedTask({...task})
        toggle();
    }

    return (
        <>
            <Button color="primary" onClick={toggle}>
                Update Task
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Update task</ModalHeader>
                <ModalBody>
                    <InputGroup>
                        <InputGroupText>
                            Name
                        </InputGroupText>
                        <Input
                            value={updatedTask.name}
                            onChange={event => setUpdatedTask({ ...updatedTask, name: event.target.value })}
                        />
                    </InputGroup>
                    <br />

                    <InputGroup>
                        <InputGroupText>
                            Description
                        </InputGroupText>
                        <Input
                            value={updatedTask.description}
                            onChange={event => setUpdatedTask({ ...updatedTask, description: event.target.value })}
                        />
                    </InputGroup>
                    <br />


                    <Label for="unmountOnClose">Status</Label>{' '}
                    <Input
                        type="select"
                        name="unmountOnClose"
                        id="unmountOnClose"
                        value={updatedTask.status}
                        onChange={event => setUpdatedTask({ ...updatedTask, status: event.target.value })}
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
                        value={updatedTask.priority}
                        id="unmountOnClose"
                        onChange={event => setUpdatedTask({ ...updatedTask, priority: event.target.value })}
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
                    <Button
                        color="primary"
                        onClick={saveButtonHandler}
                    >
                        Save
                    </Button>{' '}
                    <Button color="secondary" onClick={cancelButtonHandler}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default UpdateModal;