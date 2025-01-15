import { app, BrowserWindow } from 'electron';

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		frame: false, // Remove the default title bar
	});

	win.loadFile('index.html');
	win.setMenu(null);
};

app.whenReady().then(() => {
	createWindow();
	// Comment out when running on linux
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
