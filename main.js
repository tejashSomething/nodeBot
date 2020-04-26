// for the voice recognization. 
const voice = document.querySelector(".voice");
const voice2text = document.querySelector(".voice2text");

// Making the use of windows speechRecognization API. 
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recorder = new SpeechRecognition();

function addHumanText(text) {
  const chatContainer = document.createElement("div");
  chatContainer.classList.add("chat-container");
  
  const chatBox = document.createElement("p");
  chatBox.classList.add("voice2text");
  
  const chatText = document.createTextNode(text);
  chatBox.appendChild(chatText);
  
  chatContainer.appendChild(chatBox);
  return chatContainer;
}

function addBotText(text) {
  const chatContainer1 = document.createElement("div");
  chatContainer1.classList.add("chat-container");
  chatContainer1.classList.add("darker");
  
  const chatBox1 = document.createElement("p");
  chatBox1.classList.add("voice2text");
  
  const chatText1 = document.createTextNode(text);
  chatBox1.appendChild(chatText1);
  chatContainer1.appendChild(chatBox1);
  return chatContainer1;
}

function botVoice(message) {
	const speech = new SpeechSynthesisUtterance();
    speech.text = "Sorry, I did not understand that.";

    if (message.includes('hello')) {
      speech.text = "Hi, how are you doing?";
    }
	
	if (message.includes('how are you')) {
      speech.text = "I am fine, thanks. How are you?";
    }
	if (message.includes('not well')) {
      speech.text = "Sorry to hear that. How can I assist you today?";
    }
	if (message.includes('better')) {
      speech.text = "Nice to hear that. How can I assist you today?";
    }

    if (message.includes('fine')) {
      speech.text = "Nice to hear that. How can I assist you today?";
    }

    if (message.includes('bad')) {
      speech.text = " It will get better, You can tell me in detail if you want to?";
    }
	if (message.includes('pet')) {
      speech.text = " Pet's are a better companion! they can make you feel cheerful";
    }

    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
    var element = document.getElementById("container");
    element.appendChild(addBotText(speech.text));
}

recorder.onstart = () => {
  console.log('Voice activated');
};

recorder.onresult = (event) => {
  const resultIndex = event.resultIndex;
  const transcript = event.results[resultIndex][0].transcript;
  var element = document.getElementById("container");
  element.appendChild(addHumanText(transcript));
  botVoice(transcript);
};

voice.addEventListener('click', () =>{
  recorder.start();
});