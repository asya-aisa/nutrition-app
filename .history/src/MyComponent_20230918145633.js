const MyComponent = ({ label, quantity, unit }) => {
    return(<div>
        <h3>totalNutrients</h3>
        <ul>
            <li>{label} - {quantity} {unit}</li>
        </ul></div>)
}
export default MyComponent;