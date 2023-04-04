import React, { useState } from "react";

function SprintTab() {
  const [userStories, setUserStories] = useState([]);
  const [storyContent, setStoryContent] = useState("");

  function handleAddUserStory() {
    setUserStories([
      ...userStories,
      { id: userStories.length + 1, content: storyContent }
    ]);
    setStoryContent("");
  }

  function handleDragStart(e, story) {
    e.dataTransfer.setData("text/plain", story.id);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    const storyId = e.dataTransfer.getData("text/plain");
    const newStories = userStories.filter(story => story.id !== parseInt(storyId));
    const storyToAdd = userStories.find(story => story.id === parseInt(storyId));
    newStories.splice(e.target.dataset.index, 0, storyToAdd);
    setUserStories(newStories);
  }

  function handleStoryContentChange(e, id) {
    const newStories = userStories.map(story => {
      if (story.id === id) {
        return { ...story, content: e.target.value };
      } else {
        return story;
      }
    });
    setUserStories(newStories);
  }

  return (
    <div>
      <h1>Sprint Tab</h1>
      <div>
        <label htmlFor="storyContent">Add User Story: </label>
        <input
          type="text"
          id="storyContent"
          value={storyContent}
          onChange={(e) => setStoryContent(e.target.value)}
        />
        <button onClick={handleAddUserStory}>Add</button>
      </div>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {userStories.map((story, index) => (
          <div
            key={story.id}
            draggable
            onDragStart={(e) => handleDragStart(e, story)}
            data-index={index}
          >
            <textarea
              value={story.content}
              onChange={(e) => handleStoryContentChange(e, story.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SprintTab;
