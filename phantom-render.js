var webPage = require('webpage');
var page = webPage.create();
var system = require('system'),
  address;

if (system.args.length < 3) {
  console.log('You need to add the report to render');
  phantom.exit();
}

address = system.args[1];
output = system.args[2];

//page.viewportSize = { width: 1920, height: 1080 };
page.paperSize = {
  format: 'A4',
  orientation: 'portrait',
  margin: '0cm'
};

page.onLoadFinished = function() {
  	console.log("page load finished");
	page.render('pdf/'+ output , {format: 'pdf', quality: '100'});
	phantom.exit();
};

page.open(address, function start(status) {
	console.log('The default user agent is ' + page.settings.userAgent);
	console.log(status);
	if (status !== 'success') {
	  console.log('FAIL to load the address');
	} else {
	  t = Date.now() - t;
	  console.log('Loading ' + system.args[1]);
	  console.log('Loading time ' + t + ' msec');
	}
});