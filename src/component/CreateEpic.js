import React, { useState } from 'react';

const CreateEpic = ({ projectId, onCreate }) => {
    const [epicName, setEpicName] = useState('');
    const [epicDescription, setEpicDescription] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onCreate(projectId, { name: epicName, description: epicDescription });
        setEpicName('');
        setEpicDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Epic</h2>
            <label>
                Epic Name:
                <input
                    type="text"
                    value={epicName}
                    onChange={(event) => setEpicName(event.target.value)}
                />
            </label>
            <br />
            <label>
                Epic Description:
                <textarea
                    value={epicDescription}
                    onChange={(event) => setEpicDescription(event.target.value)}
                />
            </label>
            <br />
            <input type="submit" value="Create" />
        </form>
    );
};

export default CreateEpic;
