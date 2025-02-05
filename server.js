import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';

const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json()); // מאפשר קריאת JSON בבקשות

// Endpoint לשמירת נתונים לתוך JSON בלי למחוק את הישנים
app.post('/save-resume', (req, res) => {
  const resumeData = req.body;

  // קריאת הנתונים הקיימים (אם יש)
  fs.readFile('resumeData.json', 'utf8', (err, data) => {
    let existingData = [];

    if (!err && data) {
      try {
        existingData = JSON.parse(data);
      } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
      }
    }

    // מוודא שהנתונים הם מערך
    if (!Array.isArray(existingData)) {
      existingData = [];
    }

    // הוספת הנתונים החדשים
    existingData.push(resumeData);

    // שמירת הנתונים המעודכנים
    fs.writeFile('resumeData.json', JSON.stringify(existingData, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error saving data', error: err });
      }
      res.status(200).json({ message: 'Resume data saved successfully' });
    });
  });
});

// Endpoint לשליפת הנתונים מהקובץ
app.get('/get-resume', (req, res) => {
  fs.readFile('resumeData.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading data', error: err });
    }

    try {
      const parsedData = JSON.parse(data);
      res.status(200).json(parsedData);
    } catch (parseErr) {
      res.status(500).json({ message: 'Error parsing JSON data', error: parseErr });
    }
  });
});

// הפעלת השרת
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
