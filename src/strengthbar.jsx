function StrengthBar(props) {
    let strength = props.strength;
    if (strength < 4) {
        return (
            <div>
                <p>Weak</p>
            </div>
        );
    } else if (strength >= 4 && strength < 8) {
        return (
            <div>
                <p>Medium</p>
            </div>
        );
    } else {
        return (
            <div>
                <p>Strong</p>
            </div>
        );
    }
}
export default StrengthBar;