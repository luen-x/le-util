export class DeviceManager {
	constructor(opts){
		this.getDevice(opts);
	}
	getDevice(opts = {}) {
		const device = this;
		const ua = opts.userAgent || navigator.userAgent;
		const android = ua.match(/(Android);?[\s/]+([\d.]+)?/);
		const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
		const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
		const iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);	
		device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;
	
		// Android
		if (android) {
			device.os = 'android';
			device.osVersion = android[2];
			device.android = true;
			device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
		}
		if (ipad || iphone || ipod) {
			device.os = 'ios';
			device.ios = true;
		}
		// iOS
		if (iphone && !ipod) {
			device.osVersion = iphone[2].replace(/_/g, '.');
			device.iphone = true;
		}
		if (ipad) {
			device.osVersion = ipad[2].replace(/_/g, '.');
			device.ipad = true;
		}
		if (ipod) {
			device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
			device.iphone = true;
		}
		// Webview
		device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);
		// wechat
		device.wechat = /MicroMessenger/i.test(ua);
		device.wechatVersion = (ua.match(/MicroMessenger\/([\d.]+)/i) || [])[1];
		// wechatDevTools
		device.wechatDevTools = /wechatdevtools/.test(ua);
		// pc or touch
		device.touch = (device.android || device.ios) ? true : false;
		// firefox
		device.firefox = ua.toLowerCase().indexOf('firefox') > -1;
		return device;
	}
}
export const  Device  = new DeviceManager();

