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

const user = {
name: 'Hedy Lamarr',
imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
imageSize: 90,
};

function Profile() {
return (
	<>
	<h1>{user.name}</h1>
	<img
		className="avatar"
		src={user.imageUrl}
		alt={'Photo of ' + user.name}
		style={{
		width: user.imageSize,
		height: user.imageSize
		}}
	/>
	</>
);
}

//ReactDOM.createRoot( document.getElementById('component-goes-here')).render(<Profile />);

//MyCode
const imageUrlArr = [
						{id: 1, imageUrl: "https://i.imgur.com/yXOvdOSs.jpg", hrefUrl: "http://www.bilibili.com"}, 
						{id: 2, imageUrl: "https://i.imgur.com/yXOvdOSs.jpg", hrefUrl: "http://www.bilibili.com"},
						{id: 3, imageUrl: "https://i.imgur.com/yXOvdOSs.jpg", hrefUrl: "http://www.bilibili.com"}
					];

function IconButton({imgUrl, hrefUrl}) {
	function onClick() {
		window.open(hrefUrl);
	}
	return (
		<button className="IconButton" onClick={onClick}>
			<img src={imgUrl} className="IconButtonImg"></img>
		</button>
	)
}

function IconButtonSet({iconWithUrl}) {
	const buttonList = iconWithUrl.map(ele => <IconButton key={ele.id} imgUrl={ele.imageUrl} hrefUrl={ele.hrefUrl}/>)
	return <div className="IconButtonSet">
		{buttonList}
	</div>
}

//ReactDOM.createRoot( document.getElementById('buttonSet')).render(<IconButtonSet iconWithUrl={imageUrlArr}/>);

function Nav({menuItemArray, iconWithUrlArray}) {
	return (
		<div className="row Nav">
			<div className="text-md-left col-lg-6 col-md-12 col-sm-12 col-xs-l2 text-center">
					<NavMenu menuItemArray={menuItemArray} />
			</div>
			<div className="col-lg-4 offset-lg-2 col-md-12 offset-md-0 col-xs-12 offset-xs-0 text-center">
				<IconButtonSet iconWithUrl={iconWithUrlArray}/>
			</div>
			<div id="navBaseLine">
			</div>
		</div>
	)
}

function NavMenu({menuItemArray}) {
	const menuItemArr = menuItemArray.map(ele => <NavMenuItem key={ele.id} text={ele.text} navUrl={ele.navUrl}/>)
	return (
		<div className="NavMenu text-lg-start text-sm-center">
			{menuItemArr}
		</div>
	)
}
function NavMenuItem({text,navUrl}) {
	return (
		<span className="MenuItem">
			<a href={navUrl}><span>{text}</span></a>
		</span>
	)
}
const menuItemArr = [
	{id:"about", text:"ABOUT", navUrl:"#section1"},
	{id:"misson", text:"MISSON", navUrl:"#section2"},
	{id:"socialMedia", text:"SOCIAL MEDIA", navUrl:"#section6"}
];
ReactDOM.createRoot( document.getElementById('nav'))
	.render(<Nav menuItemArray={menuItemArr} iconWithUrlArray={imageUrlArr} />);

function Dot({color,size}) {
	return (
		<div className="Dot" style={{backgroundColor: color, width: size,height: size }}>
		</div>
	)
}
function DotsArray({dotsNum, direction, color, size="3px"}) {
	var arr = [];
	for(var i = 0; i < dotsNum; i++){
		arr.push(i); 
	}
	if (direction == 0) {
		var dotsArray = arr.map(x => <Dot key={x} color={color} size={size}/>)
		return (
			<div className="DotsArrayHorizon">
				{dotsArray}
			</div>
		)
	}else if(direction == 1){
		var dotsArray = arr.map(x => <Dot style="display: inline" key={x} color={color} size={size}/>)
		return (
			<div className="DotsArrayVertical">
				{dotsArray}
			</div>
		)
	}
	
}
function CoverHeader() {
	return (
		<>
		<div className="CoverHeader flex-column justify-content-center text-center">
			<h1>
				HALF
			</h1>
			<img src="/static/halfave/img/Ave_metallic.png" className="center-block"></img>
			<div>
				<div className="bottomText text-start">1234 Half St</div>
				<div className="bottomText text-start">XYZ</div>
				<div className="bottomText text-end">Metaverse</div>
				<div className="bottomText text-end"></div>
			</div>
		</div>
		
		</>
	)
}
function CoverStartControl() {
	return (
		<div className="CoverStartControl w-100">
			<div></div>
			<div className="text-center"><SlideVector color={"#55ffe9"} /> </div>
			<div></div>
		</div>
	)
}
function SingleLine({color}) {
	return (
		<div className="SingleLine" style={{borderBottomColor: color}}>
		</div>
	)
}
function SlideVector({color}) {
	return (
		<div className="SlideVector" >
			<div className="left">	
				<div style={{backgroundColor: color}}></div>
				<div style={{backgroundColor: color}}></div>
				<div style={{backgroundColor: color}}></div>
			</div>
			<div className="right">
				<div style={{backgroundColor: color}}></div>
				<div style={{backgroundColor: color}}></div>
				<div style={{backgroundColor: color}}></div>
			</div>
		</div>
	)
}
ReactDOM.createRoot( document.getElementById('coverSlideControl'))
	.render(<CoverStartControl />);

ReactDOM.createRoot( document.getElementById('coverHeader'))
	.render(<CoverHeader color={"#55ffe9"} />);

function Header({text}) {
	return (
		<div className="Header">
			<span>
				{text}
			</span>
		</div>
	)
}
function Paragraph({text}) {
	return (
		<div className="Paragraph">
			<span>{text}</span>
		</div>
	)
}
function Bracket() {
	return(
		<div className="Bracket m-auto">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}

function Sec1Center() {
	return (
		<div className="Sec1Center h-100" id="Sec1Center">
			<div className="row h-25">
				<div className="col-1 offset-3 h-100"><div className="row h-100 flex-column justify-content-center"><DotsArray dotsNum={3}  direction={0} color={"#fc70ff"}/></div></div>
				<div className="col-4"><div className="row h-100 flex-column justify-content-center"><Header text={"Who We Are"} /></div></div>
				<div className="col-1 h-100"><div className="row h-100 flex-column justify-content-center"><DotsArray dotsNum={3}  direction={0} color={"#fc70ff"}/></div></div>
			</div>
			<div className="h-75 row w-100">
				<div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
					<Paragraph className="mw-50" text={"Half Ave highlights the unbreakable connection between style and sport to create a wellness based digital future. Here you can play games, compete, innovate, express your style, and connect with new friends as you create the future of sport-style in our metaverse."}/>
				</div>
			</div>
		</div>
	)
}
function Sec5Center() {
	return (
		<div className="Sec1Center h-100" id="Sec1Center">
			<div className="row h-50">
				<div className="col-1 offset-lg-2 offset-md-2 offset-sm-1 offset-xs-0 h-100"><div className="row h-100 flex-column justify-content-center text-center"><DotsArray dotsNum={3}  direction={0} color={"#fc70ff"}/></div></div>
				<div className="col-lg-6 col-md-6 col-sm-8 col-xs-10 text-center"><div className="row h-100 flex-column justify-content-center"><Header text={"FOLLOW US"} /></div></div>
				<div className="col-1 h-100"><div className="row h-100 flex-column justify-content-center text-center"><DotsArray dotsNum={3}  direction={0} color={"#fc70ff"}/></div></div>
			</div>
			<div className="row h-50 text-center">
				<Header text={"AND STAY UP TO DATE"} />
			</div>
			<div className="row">
				<div className="text-center">
				<IconButtonSet iconWithUrl={imageUrlArr} />
				</div>
			</div>
		</div>
	)
}
ReactDOM.createRoot( document.getElementById('sec1Left'))
	.render(<Bracket />);
ReactDOM.createRoot( document.getElementById('sec1Right'))
	.render(<Bracket />);
ReactDOM.createRoot( document.getElementById('sec1Center'))
	.render(<Sec1Center />);
ReactDOM.createRoot( document.getElementById('sec5Center'))
	.render(<Sec5Center />);
ReactDOM.createRoot( document.getElementById('sec2Header'))
	.render(<Header text={"OUR MISSON"} />);
ReactDOM.createRoot( document.getElementById('sec2HeaderDeco'))
	.render(<DotsArray direction={0} dotsNum={1} color={"#fc70ff"} size={"5px"} />);
ReactDOM.createRoot( document.getElementById('sec2Para'))
	.render(<Paragraph text={"Creating an immersive world where fashion and sports-style drive the creation of a wellness based reality."}/>);

function BracketHorizon() {
	return(
		<div className="BracketHorizon w-100">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}
function BottomText({leftText, rightText})
{
	return (
		<div className="row">
			<div className="col-3 bottomText text-start"><Header  text={leftText}/></div>
			<div className="col-3 offset-6 bottomText text-end"><Header  text={rightText}/></div>
		</div>
	)
}
function PicWithBracketBelow({imgUrl, leftText, rightText}) {
	return (
		<div className="PicWithBracketBelow col-12">
			<div className="row"><img src={imgUrl}></img></div>
			<div className="row"><BracketHorizon /></div>
			<BottomText leftText={leftText} rightText={rightText}/>
		 </div>
	)
}
ReactDOM.createRoot( document.getElementById('sec2Pic'))
	.render(<PicWithBracketBelow imgUrl={"/static/halfave/img/sec2pic.jpg"} leftText="THE ENTRANCE" rightText={"X11,Y28,Z90"} />);
ReactDOM.createRoot( document.getElementById('sec3Dots'))
	.render(<DotsArray direction={0} dotsNum={2} color={"#fc70ff"} size={"5px"} />);
ReactDOM.createRoot( document.getElementById('sec3Para'))
	.render(<Paragraph text={"Decentralization provides global access to designers, athletes, fitness influencers, gamers, and anyone else who wants to populate our unique fashion-first, wellness ecosystem."}/>);
ReactDOM.createRoot( document.getElementById('sec3BottomText'))
	.render(<BottomText leftText={"THE BASKETBALL COURT"} rightText={"X11, Y28, Z60"}/>);
ReactDOM.createRoot( document.getElementById('sec4Dots'))
	.render(<DotsArray direction={0} dotsNum={3} color={"#fc70ff"} size={"5px"} />);
ReactDOM.createRoot( document.getElementById('sec4Para'))
	.render(<Paragraph text={"Users will connect, share ideas, and play games to enhance their wellness, always inspired by cutting-edge fashion and design. All intersections between sport and life can be found."}/>);
ReactDOM.createRoot( document.getElementById('sec4Pic'))
	.render(<PicWithBracketBelow imgUrl={"/static/halfave/img/basketballarcade.jpg"} leftText="THE ENTRANCE" rightText={"X11,Y28,Z90"} />);
