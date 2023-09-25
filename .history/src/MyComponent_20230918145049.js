const MyComponent = ({ label, quantity, unit}) => {
    return(
        <ul>
            <li>{label} - {quantity} {unit}</li>
        </ul>)
}
export default MyComponent;