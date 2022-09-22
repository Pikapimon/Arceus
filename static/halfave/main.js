function MyButton() {
	return (
	  <button onClick={() => alert(true)} className="btn">Click me</button>
	);
  }

function MyApp() {
	return (
	  <div>
		<h1 className="header">Welcome to my app</h1>
		<MyButton />
	  </div>
	);
  }
ReactDOM.createRoot( document.getElementById('component-goes-here')).render(<MyApp />);