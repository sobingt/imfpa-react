import axios from "axios";

export default axios.create({
  baseURL: "https://imfpa.org/wp-json/wc/v3/",
  headers: {
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaW1mcGEub3JnIiwiaWF0IjoxNTk4NzE0NzY5LCJuYmYiOjE1OTg3MTQ3NjksImV4cCI6MTU5OTMxOTU2OSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.cd_s5Hl1xsgl0ZpfTLGCE6yRHCz0SA1MTijr77wsLqQ",
    "Content-type": "application/json",
  },
});
