
import { useEffect, useState } from 'react';
import './App.css';
import MyComponent from './MyComponent';
import LoaderPage from './Loader/LoaderPage';
import Swal from 'sweetalert2';

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

      let nutrients = data.totalNutrients

      if(nutrients === undefined || nutrients === null) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          confirmButtonColor:
          text: 'ingredients entered incorrectly'
        })
        setStateLoader(false)
      }
      else{setNutrientsArray(Object.values(data.totalNutrients))
        setStateLoader(false)
      }
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
  
  return (<div>
{stateLoader && <LoaderPage />}
        <div className='cont'>
          <h1>Nutrition Analysis</h1>
        </div>

        <div className='cont'>
          <h3>Enter the ingredient separated by commas, like <span>"1 cup rice, 10 oz chickpeas"</span>, etc.</h3>
        </div>
      <div className="App">
      <form>
        <input type='text' onChange={handleInput} placeholder='Enter the ingredient separated by commas' />
        <button onClick={changeBody} className='btn'>Show results</button>
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
    </div>);
}

export default App;
