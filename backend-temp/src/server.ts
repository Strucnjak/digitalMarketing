import express from 'express';
import cors from 'cors';
import contactRouter from './routes/contact';
import serviceInquiryRouter from './routes/serviceInquiry';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({ origin: allowedOrigin }));
app.use(express.json());
app.use('/api/contact', contactRouter);
app.use('/api/service-inquiries', serviceInquiryRouter);

const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
