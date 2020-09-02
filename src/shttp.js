import axios from "axios";

export default axios.create({
  baseURL: "https://startupmumbai.org/wp-json/wc/v3/",
  headers: {
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc3RhcnR1cG11bWJhaS5vcmciLCJpYXQiOjE1OTgxOTIyNjcsIm5iZiI6MTU5ODE5MjI2NywiZXhwIjoxNTk4Nzk3MDY3LCJkYXRhIjp7InVzZXIiOnsiaWQiOjN9fX0.sjmg5PNbUclHTGUjKrFlojzvg0DuZMXC-RZGy23wagc",
    "Content-type": "application/json",
  },
});
