const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;


app.use(express.json());


app.get('/hospitals', (req, res) => {
  fs.readFile('hospital_data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error reading data' });
    }

    try {
      const hospitals = JSON.parse(data).hospitals;
      res.json(hospitals);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error parsing data' });
    }
  });
});


app.post('/hospitals', (req, res) => {
  const newHospital = req.body; 

  fs.readFile('hospital_data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error reading data' });
    }

    try {
      const jsonData = JSON.parse(data);
      jsonData.hospitals.push(newHospital);

     
      fs.writeFile('hospital_data.json', JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error writing data' });
        }

        res.status(201).json({ message: 'Hospital added successfully' });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error parsing data' });
    }
  });
});


app.put('/hospitals/:id', (req, res) => {
  const hospitalId = req.params.id;
  const updatedHospital = req.body; 

  fs.readFile('hospital_data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error reading data' });
    }

    try {
      const jsonData = JSON.parse(data);
      const hospitals = jsonData.hospitals;

      
      const hospitalIndex = hospitals.findIndex((hospital) => hospital.id === hospitalId);

      if (hospitalIndex === -1) {
        return res.status(404).json({ error: 'Hospital not found' });
      }

    
      hospitals[hospitalIndex] = { ...hospitals[hospitalIndex], ...updatedHospital };

      
      fs.writeFile('hospital_data.json', JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error writing data' });
        }

        res.json({ message: 'Hospital updated successfully' });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error parsing data' });
    }
  });
});


app.delete('/hospitals/:id', (req, res) => {
  const hospitalId = req.params.id;

  fs.readFile('hospital_data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error reading data' });
    }

    try {
      const jsonData = JSON.parse(data);
      const hospitals = jsonData.hospitals;

      
      const hospitalIndex = hospitals.findIndex((hospital) => hospital.id === hospitalId);

      if (hospitalIndex === -1) {
        return res.status(404).json({ error: 'Hospital not found' });
      }

      
      

      
      fs.writeFile('hospital_data.json', JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error writing data' });
        }

        res.json({ message: 'Hospital deleted successfully' });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error parsing data' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
