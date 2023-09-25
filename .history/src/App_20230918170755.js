
import { useEffect, useState } from 'react';
import './App.css';
import MyComponent from './MyComponent';
import LoaderPage from './Loader/LoaderPage';

function App() {

  const [userText, setUserText] = useState({
    ingr: ["1 apple", "2 banana"]
  })

  const [bodyText, setBodyText] = useState({ingr: ["1 apple", "2 banana"]})
  const [nutrientsArray, setNutrientsArray] = useState([])
  const [caloriesState, setCaloriesState] = useState('')

  const [stateLoader, setStateLoader] = useState(false)

  useEffect(() => {
    const getNutrients = async () => {
      setStateLoader(true)

      const response = await fetch('https://api.edamam.com/api/nutrition-details?app_id=bce19124&app_key=%20d13039e09e0cad1255cc69b09c620945%09', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(bodyText)
      })
      const data = await response.json()
      setCaloriesState(data.calories)
      setNutrientsArray(Object.values(data.totalNutrients))
      setStateLoader(false)
      console.log(response.message)
    }
      
  
    getNutrients()
  }, [bodyText])

  const handleInput = (e) => {
    setUserText({ingr: e.target.value.split(',')})
  }


  const changeBody = (e) => {
    e.preventDefault()
    setBodyText(userText)
  }
  

  return (
    <div className="App">
{stateLoader && <LoaderPage />}
      <form>
        <input type='text' onChange={handleInput} />
        <button onClick={changeBody}>Show results</button>
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
