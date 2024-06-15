import { NavLink } from "react-router-dom";
import Profile from "../components/Profile";
import Appointments from "../components/Appointments";
import TestResults from "../components/TestResults";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const UserDashboard = () => {
  return (
    <div>
      <div className="min-h-screen flex">
        <nav className="w-full   flex flex-col p-4">
          <h2 className="text-xl mb-4">User Dashboard</h2>

          <Tabs className="flex items-center gap-10">
            <TabList className="flex flex-col">
              <Tab className="btn btn-primary mb-2">My Profile</Tab>
              <Tab className="btn btn-primary mb-2">
                My Upcoming Appointments
              </Tab>
              <Tab className="btn btn-primary mb-2">Test Results</Tab>
            </TabList>

            <div className="flex-grow">
              <TabPanel>
                <Profile></Profile>
              </TabPanel>
              <TabPanel>
                <Appointments></Appointments>
              </TabPanel>
              <TabPanel>
                <TestResults></TestResults>
              </TabPanel>
            </div>
          </Tabs>
        </nav>
      </div>
    </div>
  );
};

export default UserDashboard;
