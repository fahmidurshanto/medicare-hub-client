import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

import AllUsers from "./AllUsers";

const AdminDashboard = () => {
  return (
    <div>
      <div className="min-h-screen flex">
        <nav className="w-full   flex flex-col p-4">
          <h2 className="text-xl mb-4">Admin Dashboard</h2>

          <Tabs className="flex items-center gap-10">
            <TabList className="flex flex-col">
              <Tab className="btn btn-primary mb-2">My Profile</Tab>

              <Tab className="btn btn-primary mb-2">All Users</Tab>
              <Tab className="btn btn-primary mb-2">Test Results</Tab>
            </TabList>

            <div className="flex-grow">
              <TabPanel>
                <div className="text-4xl">Admin Profile</div>
              </TabPanel>
              <TabPanel>
                <AllUsers></AllUsers>
              </TabPanel>
              <TabPanel>
                <h3 className="text-3xl">Other things</h3>
              </TabPanel>
            </div>
          </Tabs>
        </nav>
      </div>
    </div>
  );
};

export default AdminDashboard;
