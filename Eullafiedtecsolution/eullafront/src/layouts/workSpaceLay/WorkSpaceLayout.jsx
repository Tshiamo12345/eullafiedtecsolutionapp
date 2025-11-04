import { Outlet } from "react-router-dom";
import SideNavigation from "../SideBarW/SideNavigation";
import './workspacelayout.css';

function WorkSpaceLayout() {
  return (
    <div className="workspace-layout">
        <header className="workspace-header">
          <h1 className="company-name">Eullafied Tech Solutions</h1>
        </header>
        <SideNavigation/>
        <main>
            <Outlet></Outlet>
        </main>
    </div>
  );
}

export default WorkSpaceLayout;