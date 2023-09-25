
import { useEffect, useState } from 'react';
import './App.css';
import MyComponent from './MyComponent';

function App() {

  const [userText, setUserText] = useState({
    ingr:
  })
  const [nutrientsArray, setNutrientsArray] = useState([])
  const [caloriesState, setCaloriesState] = useState('')

  const arrayTest = {
    ingr: ["1 apple", "2 banana"]
  }

  const textArraytest = JSON.stringify(arrayTest)

  console.log(textArraytest)

  console.log(arrayTest)

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
      setCaloriesState(data.calories)

      console.log(Object.values(data.totalNutrients))
      setNutrientsArray(Object.values(data.totalNutrients))
    }
    getNutrients()
  }, [])

  const handleInput = (e) => {
    
    console.log(e.target.value.split(','))
  }
  return (
    <div className="App">

      <form>
        <input type='text' onChange={handleInput} />
      </form>
      <h3>Calories: {caloriesState}</h3>

      <div>
        <h3>Total Nutrients:</h3>
        {nutrientsArray.map((elem, index) => (
        <MyComponent 
        key={index}
        label={elem.label}
        quantity={elem.quantity.toFixed()}
        unit={elem.unit}/>

        ))}
      </div>

    </div>
  );
}

export default App;
