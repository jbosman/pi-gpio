const { GPIO } = require('onoff');
const LED = new GPIO(4,'out');
let interval;

interval = setInterval(function(){
	let value = (LED.readSync() + 1) % 2;

	LED.write(value, function(){
		console.log("Changed LED state to: " + value);
	});
}, 2000);

process.on('SIGINT', function(){
	clearInterval(interval);
	LED.writeSync(0);
	LED.unexport();
	console.log('Bye, bye!');
	process.exit();
});


