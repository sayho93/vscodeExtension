import * as path from 'path'
import { readFileSync } from 'fs'
import * as vscode from 'vscode'
import NetUtil from './api/NetUtil'

export function activate(context: vscode.ExtensionContext) {
	let currentPanel: vscode.WebviewPanel | undefined = undefined

	context.subscriptions.push(
		vscode.commands.registerCommand('vscodeext.helloWorld', () => {
			vscode.window.showInformationMessage('Plugin Activated')
		}),
		vscode.commands.registerCommand('vscodeext.runJava', async () => {
			const input = await vscode.window.showInputBox();
			vscode.window.showInformationMessage('Running Java...')
			const editor = vscode.window.activeTextEditor
			const text = editor?.document.getText()
			console.log(text)

			NetUtil.compile(text, 'java', input)
				.then(retData => {
					if(retData.returnCode !== 1) vscode.window.showErrorMessage(retData.returnMessage)
					else{
						console.log(retData.data)
						vscode.window.showInformationMessage(retData.data, {modal: true})
						vscode.window.showInformationMessage(retData.data)
					}
				})
				.catch(err => console.error(err))
		}),
		vscode.commands.registerCommand('vscodeext.runCpp', async () => {
			const input = await vscode.window.showInputBox();
			vscode.window.showInformationMessage('Running C++...')
			const editor = vscode.window.activeTextEditor
			const text = editor?.document.getText()
			console.log(text)

			NetUtil.compile(text, 'cpp', input)
				.then(retData => {
					if(retData.returnCode !== 1) vscode.window.showErrorMessage(retData.returnMessage)
					else{
						console.log(retData.data)
						vscode.window.showInformationMessage(retData.data, {modal: true})
						vscode.window.showInformationMessage(retData.data)
					}
				})
				.catch(err => console.error(err))
		}),
		vscode.commands.registerCommand('vscodeext.runPython', async () => {
			const input = await vscode.window.showInputBox();
			vscode.window.showInformationMessage('Running Python...')
			const editor = vscode.window.activeTextEditor
			const text = editor?.document.getText()
			console.log(text)
	
			NetUtil.compile(text, 'python', input)
				.then(retData => {
					if(retData.returnCode != 1) vscode.window.showErrorMessage(retData.returnMessage)
					else{
						console.log(retData.data)
						vscode.window.showInformationMessage(retData.data, {modal: true})
						vscode.window.showInformationMessage(retData.data)
					}
				})
				.catch(err => console.error(err))
		}),
		vscode.commands.registerCommand('vscodeext.recommendation', () => {
			const columnToShowIn = vscode.window.activeTextEditor
				? vscode.window.activeTextEditor.viewColumn
				: vscode.ViewColumn.One

			if (currentPanel) currentPanel.reveal(columnToShowIn)
			else{
				currentPanel = vscode.window.createWebviewPanel(
					`TEST`,
					`문제은행`,
					vscode.ViewColumn.One,
					{
						enableScripts: true
					}
				)
			}

			const filePath = vscode.Uri.file(path.join(context.extensionPath, 'src', 'views', 'index.html'))
			currentPanel.webview.html = readFileSync(filePath.fsPath, 'utf-8')

			currentPanel.webview.onDidReceiveMessage(
				async (message) => {
				  switch (message.command) {
					case 'alert':
						console.log(message.text)
					  	vscode.window.showInformationMessage(message.text, {modal: true})
					  	break
					case 'error':
						console.log(message.text)
						vscode.window.showErrorMessage(message.text, {modal: true})
						break
					case 'getCategory':
						try{
							await vscode.commands.executeCommand('vscodeext.categoryList')
						} catch(err){console.log(err)}
						break
					case 'getProblem':
						try{
							await vscode.commands.executeCommand('vscodeext.problemList', message.id)
						} catch(err){console.log(err)}
						break
					case 'judge':
						try{
							const ret = await NetUtil.judge(message.code, message.type, message.problemId)
							vscode.window.showInformationMessage(ret, {modal:true})
						} catch(err){
							vscode.window.showErrorMessage(err, {modal: true})
						}
						break
					default: break
				  }
				},
				undefined,
				context.subscriptions
			 )

			currentPanel.onDidDispose(() => {currentPanel = currentPanel},null,context.subscriptions)
		}),
		vscode.commands.registerCommand('vscodeext.categoryList', async() => {
			if(!currentPanel) return

			const categoryList = await NetUtil.getCategory().catch(err => console.log(err))
			currentPanel.webview.postMessage({ 
				command: 'categoryList',
				data: categoryList.data 
			})
		}),
		vscode.commands.registerCommand('vscodeext.problemList', async (id) => {
			if(!currentPanel) return

			const problemList = await NetUtil.getProblem(id).catch(err => console.log(err))
			currentPanel.webview.postMessage({
				command: 'problemList',
				data: problemList.data
			})
		}),
	)
}

export function deactivate() {}
