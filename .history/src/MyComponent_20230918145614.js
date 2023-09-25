const MyComponent = ({ label, quantity, unit }) => {
    return(<div>
        <ul>
            <li>{label} - {quantity} {unit}</li>
        </ul>)
}
export default MyComponent;