import axios from "axios";

export default axios.create({
  baseURL: "https://imfpa.org/wp-json/wc/v3/",
  headers: {
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaW1mcGEub3JnIiwiaWF0IjoxNTk5MDQ1NjkwLCJuYmYiOjE1OTkwNDU2OTAsImV4cCI6MTU5OTY1MDQ5MCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.nnGl7VFstOh1idJ1bE5i1rQ3fHnFNPymTnB9yVW-_D4",
    "Content-type": "application/json",
  },
});
