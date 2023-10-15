const jwt= require('jsonwebtoken')

const decoded = jwt.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmJiMTk3MDg5MTBhMDkxODc0ZGFlZiIsImlhdCI6MTY5NzM5MTk1OH0.Apbsi2rbAaepGluJldz82TTO03qar2yMQfRrU1vsBHk")

console.log(decoded.id)