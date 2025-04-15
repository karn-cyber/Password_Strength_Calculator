import { useState } from 'react';
import './index.css';
import StrengthBarDesign from './strengthbardesign';

function App() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);

  const generatePassword = () => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()-_=+[]{}|;:<>,.?/';
    const all = upper + lower + numbers + symbols;

    let generated = '';
    for (let i = 0; i < 14; i++) {
      generated += all[Math.floor(Math.random() * all.length)];
    }

    setPassword(generated);
    const result = checkStrength(generated);
    setStrength(result);
  };

  const checkStrength = (pwd) => {
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSymbol = /[^A-Za-z0-9]/.test(pwd);
    const length = pwd.length;

    let suggestions = [];
    let completions = [];

    if (!hasUpper) {
      suggestions.push('Add an uppercase letter.');
      completions.push('A');
    }
    if (!hasLower) {
      suggestions.push('Add a lowercase letter.');
      completions.push('a');
    }
    if (!hasNumber) {
      suggestions.push('Add a number.');
      completions.push('7');
    }
    if (!hasSymbol) {
      suggestions.push('Add a special symbol.');
      completions.push('@');
    }
    if (length < 8) {
      suggestions.push('Use at least 8 characters.');
      completions.push('xyz');
    }

    setSuggestion(suggestions.join(' '));
    setAutocompleteOptions(completions);

    if (length === 0) {
      setMessage('');
      setMessageColor('');
      return '';
    }

    if (length < 6) {
      setMessage('Hint: Add more characters, symbols, numbers, and uppercase letters.');
      setMessageColor('red');
      return 'weak';
    }

    if ((hasUpper || hasLower) && hasNumber && length >= 6 && !hasSymbol) {
      setMessage('Hint: Add special characters (e.g., @, #, $) for better security.');
      setMessageColor('darkorange');
      return 'medium';
    }

    if (hasUpper && hasLower && hasNumber && hasSymbol && length >= 8 && length < 12) {
      setMessage('Password is good.');
      setMessageColor('orange');
      return 'strong';
    }

    if (hasUpper && hasLower && hasNumber && hasSymbol && length >= 12) {
      setMessage('Excellent and uncrackable!');
      setMessageColor('green');
      return 'verystrong';
    }

    setMessage('Hint: Try adding uppercase, numbers, symbols, and make it longer.');
    setMessageColor('red');
    return 'weak';
  };

  const handleChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    const result = checkStrength(pwd);
    setStrength(result);
  };

  const handleSuggestionClick = (char) => {
    const newPwd = password + char;
    setPassword(newPwd);
    const result = checkStrength(newPwd);
    setStrength(result);
  };

  return (
    <div className="container">
      <div className="Title">
        <h1>Password Strength Calculator</h1>
      </div>
      <div className="form">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            className="input1"
            type="text"
            placeholder="Enter password"
            value={password}
            onChange={handleChange}
          />
          <input className="submit" type="submit" value="Submit" />
        </form>
        <button className="generate-btn" onClick={generatePassword}>
          Generate Strong Password
        </button>
      </div>

      {autocompleteOptions.length > 0 && (
        <div className="autocomplete-box">
          <p>Suggestions:</p>
          {autocompleteOptions.map((char, idx) => (
            <span
              key={idx}
              className="suggestion-chip"
              onClick={() => handleSuggestionClick(char)}
            >
              +{char}
            </span>
          ))}
        </div>
      )}

      <div className="strength">
        <StrengthBarDesign strength={strength} />
      </div>

      {message && (
        <p style={{ color: messageColor, marginTop: '10px', fontWeight: 'bold' }}>
          {message}
        </p>
      )}
      {suggestion && (
        <p style={{ color: '#666', marginTop: '5px', fontStyle: 'italic' }}>
          {suggestion}
        </p>
      )}
    </div>
  );
}

export default App;
