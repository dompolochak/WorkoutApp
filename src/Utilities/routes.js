import packageJson from "../../package.json";

const domain = packageJson.isLive ? "https://workoutapp-backend.herokuapp.com": "http://localhost:4000";
console.log(packageJson.isLive);
const ROUTES={
    get_workouts: domain + "/get_workouts",
    post_workouts: domain + "/post_workouts",
    edit_workouts: domain + "/edit_workout",
    delete_workouts: domain + "/delete_workout"
}

export default ROUTES;