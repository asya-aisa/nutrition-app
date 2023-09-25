const MyComponent = ({ label, quantity, unit }) => {
    return(<div>
        <ul>
            <li>{label} - {quantity} {unit}</li>
        </ul></div>)
}
export default MyComponent;