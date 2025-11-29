import Express from "express";
import mongoose from "mongoose";
import courseRouter from "./routes/course-route.js";
import categoryRouter from "./routes/category-route.js";
import chapterRouter from "./routes/chapter-route.js";
import StripeCustomerRouter from "./routes/stripeCustomer-route.js";
import studentProgressRoutes from './routes/student-progress-route.js';
import assignmentRoutes from './routes/assignment-route.js';
import submissionRoutes from './routes/submission-route.js';
import workItemRoutes from './routes/work-item-route.js';    
import liveSessionRoutes from './routes/live-session-route.js';
import courseaccessRouter from './routes/course-access-route.js';
import dotenv from "dotenv";

dotenv.config();

const app = Express();

app.use(Express.json());

// Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/api/courses", courseRouter);
app.use("/api/category", categoryRouter);
app.use("/api/chapters", chapterRouter);
app.use("/api/stripeCustomers", StripeCustomerRouter);
app.use('/api/student-progress', studentProgressRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/work-items', workItemRoutes);
app.use('/api/livesessions', liveSessionRoutes);
app.use("/api/access", courseaccessRouter);


mongoose
  .connect(process.env.URL)
  .then(() => {
    app.listen(process.env.PORT, () => console.log("connected"));
  })
  .catch((err) => {
    console.log("mg err", err);
  });
