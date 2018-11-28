const API_PATH = 'http://anet-api-timesheet.agiratech.com'

const SERVICE_URL = {
  getTimesheet: API_PATH + '/timesheets/',
  getActivities: API_PATH +`/activities`,
  getProjects: API_PATH +`/projects`,
};

export const header ={
  "Content-Type": "application/json",
  "access-token": "w40Njas4ATMDkDmY3X52pw",
  "client": "i11TGqskiLOaxXgeDC-rRg",
  "expiry": 1544532343,
  "uid": "sankar@agiratech.com",
}
export default SERVICE_URL;