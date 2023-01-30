import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput ] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}

  const onUserChangedText = (event) => {
      console.log(event.target.value);
      setUserInput(event.target.value);
  };

  const placeHolderValue = "Describe your radiation safety situation here."
  return (
    <div className="root">
      <Head>
        <title>Radiation Safety Assistant</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>RSO_AI</h1>
          </div>
          <div className="header-subtitle">
            <h2>Enter your radiation safety situation details below and the RSO's AI Assistant will help. </h2>
            <h3>Disclaimer: This is a fictional tool developed for BP8107 (W2023). This tool is meant to be for informational purposes only.</h3>
          </div>
        </div>

	  <div className="prompt-container">
	    <textarea 
        placeholder={placeHolderValue}
        className="prompt-box"
        value={userInput || placeHolderValue}
        onChange={onUserChangedText}
        readOnly={false}
      />


<div className="prompt-buttons">
  <a
    className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}
  >
    <div className="generate">
    {isGenerating ? <span class="loader"></span> : <p>AI magic!</p>}
    </div>
  </a>
</div>

      {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
  )}
      </div>
      </div>
      
    </div>
  );
};

export default Home;