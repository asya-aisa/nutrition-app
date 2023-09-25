
import { useEffect } from 'react';
import './App.css';

function App() {

  useEffect(() => {
    const getNutrients = async () => {

      const bodyText = {
        "ingr": [
          "1 tomato", "2 avocado"
        ]
      }
      const response = await fetch('https://api.edamam.com/api/nutrition-details?app_id=bce19124&app_key=%20d13039e09e0cad1255cc69b09c620945%09', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(bodyText)
      })
      const data = await response.json()

      console.log(Object.values(data.totalNutrients.label))
    }
    getNutrients()
  }, [])
  return (
    <div className="App">

    </div>
  );
}

export default App;
