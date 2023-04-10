import React, { useState } from "react";
import TabNavItem from "./TabNavItem";
import TabContent from "./TabContent";
import ProjectTab from "../AllTabs/ProjectTab";
import SprintTab from "../AllTabs/SprintTab";
import BacklogTab from "../AllTabs/BacklogTab";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className="Tabs">
      <ul className="nav">
        <TabNavItem
          title="Project"
          id="project"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabNavItem
          title="Sprint"
          id="sprint"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabNavItem
          title="Backlog"
          id="backlog"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </ul>
      <div className="outlet">
        <TabContent id="project" activeTab={activeTab}>
          <ProjectTab />
        </TabContent>
        <TabContent id="sprint" activeTab={activeTab}>
          <SprintTab />
        </TabContent>
        <TabContent id="backlog" activeTab={activeTab}>
          <BacklogTab />
        </TabContent>
      </div>
    </div>
  );
};

export default Tabs;
