import WorkSpaceNavigation from "../layout/InterWorkSpaceSideBar/WorkSpaceNavigation";
import "./workspacenavigation.css";

function InternWorkSpace() {
  return (
    <div className="workspace-layout-container">
      <div className="workspace-layout-nav">
        <WorkSpaceNavigation />
      </div>
      <div className="workspace-layout-content">
        <div className="main-content">
          <h1 className="welcome-heading">Intern Work Space</h1>
          <p>This is the intern's work space where they can manage their tasks.</p>
        </div>
      </div>
    </div>
  );
}

export default InternWorkSpace;