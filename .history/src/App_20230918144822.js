
import { useEffect, useState } from 'react';
import './App.css';
import MyComponent from './MyComponent';

function App() {

  const [nutrientsArray, setNutrientsArray] = useState([])
  const [caloriesState, setCaloriesState] = 

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

      console.log(Object.values(data.totalNutrients))
      setNutrientsArray(Object.values(data.totalNutrients))
    }
    getNutrients()
  }, [])
  return (
    <div className="App">
      {nutrientsArray.map((elem, index) => (
        <MyComponent 
        key={index}
        label={elem.label}
        quantity={elem.quantity.toFixed()}
        unit={elem.unit}
        calories={elem.quantity} />
      ))}
    </div>
  );
}

export default App;
