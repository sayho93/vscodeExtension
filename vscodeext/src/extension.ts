// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import NetUtil from './api/NetUtil';
import Utils from './utils/utils';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscodeext" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vscodeext.helloWorld', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from vscodeExt!');
	});
	context.subscriptions.push(disposable);

	let compileJava = vscode.commands.registerCommand('vscodeext.compileJava', async () => {
		vscode.window.showInformationMessage('Compiling Java...');
		const editor = vscode.window.activeTextEditor
		const text = editor?.document.getText()
		console.log(text)
		// await NetUtil.login("test", "test").then(info => console.log(info))
		NetUtil.test(text, 'java')
			.then(retData => {
				console.log(retData.data)
				vscode.window.showInformationMessage(retData.data);
			})
			.catch(err => console.error(err))
	})
	context.subscriptions.push(compileJava);

	let compileCpp = vscode.commands.registerCommand('vscodeext.compileCpp', async () => {
		vscode.window.showInformationMessage('Compiling C++...');
		const editor = vscode.window.activeTextEditor
		const text = editor?.document.getText()
		console.log(text)

		NetUtil.test(text, 'cpp')
			.then(retData => {
				console.log(retData.data)
				vscode.window.showInformationMessage(retData.data);
			})
			.catch(err => console.error(err))
	})
	context.subscriptions.push(compileCpp);

	let compilePython = vscode.commands.registerCommand('vscodeext.compilePython', () => {
		vscode.window.showInformationMessage('Compiling Python...');
		const editor = vscode.window.activeTextEditor
		const text = editor?.document.getText()
		console.log(text)

		NetUtil.test(text, 'python')
			.then(retData => {
				console.log(retData.data)
				vscode.window.showInformationMessage(retData.data);
			})
			.catch(err => console.error(err))
	})
}

// this method is called when your extension is deactivated
export function deactivate() {}
