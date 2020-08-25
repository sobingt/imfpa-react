import axios from "axios";

export default axios.create({
  baseURL: "https://imfpa.org/wp-json/wc/v3/",
  headers: {
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaW1mcGEub3JnIiwiaWF0IjoxNTk4Mjc0NzY3LCJuYmYiOjE1OTgyNzQ3NjcsImV4cCI6MTU5ODg3OTU2NywiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.PzQUI8D4COAh9IQ4sTdZXBF-otwp8ABnWGc_ASj4Ock",
    "Content-type": "application/json",
  },
});
