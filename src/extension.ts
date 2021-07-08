import * as vscode from 'vscode';
import NetUtil from './api/NetUtil';
import Utils from './utils/utils';


export function activate(context: vscode.ExtensionContext) {
	let currentPanel: vscode.WebviewPanel | undefined = undefined;

	context.subscriptions.push(
		vscode.commands.registerCommand('vscodeext.helloWorld', async () => {
			vscode.window.showInformationMessage('Plugin Activated');
		}),
		vscode.commands.registerCommand('vscodeext.compileJava', async () => {
			vscode.window.showInformationMessage('Compiling Java...');
			const editor = vscode.window.activeTextEditor
			const text = editor?.document.getText()
			console.log(text)

			NetUtil.compile(text, 'java')
				.then(retData => {
					if(retData.returnCode !== 1) vscode.window.showErrorMessage(retData.returnMessage)
					else{
						console.log(retData.data)
						vscode.window.showInformationMessage(retData.data);
					}
				})
				.catch(err => console.error(err))
		}),
		vscode.commands.registerCommand('vscodeext.compileCpp', async () => {
			vscode.window.showInformationMessage('Compiling C++...');
			const editor = vscode.window.activeTextEditor
			const text = editor?.document.getText()
			console.log(text)

			NetUtil.compile(text, 'cpp')
				.then(retData => {
					if(retData.returnCode !== 1) vscode.window.showErrorMessage(retData.returnMessage)
					else{
						console.log(retData.data)
						vscode.window.showInformationMessage(retData.data);
					}
				})
				.catch(err => console.error(err))
		}),
		vscode.commands.registerCommand('vscodeext.compilePython', () => {
			vscode.window.showInformationMessage('Compiling Python...');
			const editor = vscode.window.activeTextEditor
			const text = editor?.document.getText()
			console.log(text)
	
			NetUtil.compile(text, 'python')
				.then(retData => {
					if(retData.returnCode != 1) vscode.window.showErrorMessage(retData.returnMessage);
					else{
						console.log(retData.data)
						vscode.window.showInformationMessage(retData.data);
					}
				})
				.catch(err => console.error(err))
		}),
		vscode.commands.registerCommand('vscodeext.recommendation', () => {
			const columnToShowIn = vscode.window.activeTextEditor
				? vscode.window.activeTextEditor.viewColumn
				: vscode.ViewColumn.One

			if (currentPanel) currentPanel.reveal(columnToShowIn);
			else{
				currentPanel = vscode.window.createWebviewPanel(
					`TEST`,
					`Recommendation`,
					vscode.ViewColumn.One,
					{
						// Enable scripts in the webview
						enableScripts: true
					  }
				)
			}
			currentPanel.webview.html = getWebViewContent()

			currentPanel.webview.onDidReceiveMessage(
				message => {
				  switch (message.command) {
					case 'alert':
						console.log(message.text)
					  	vscode.window.showInformationMessage(message.text);
					  	return;
				  }
				},
				undefined,
				context.subscriptions
			  );

			// Reset when the current panel is closed
			currentPanel.onDidDispose(
				() => {
				  currentPanel = undefined;
				},
				null,
				context.subscriptions
			  );
		}),
	)
}

const getWebViewContent = () => {
	return (`
	<!DOCTYPE html>
<html lang="ko">
	<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

		
		<script src="https://pagecdn.io/lib/ace/1.4.12/ace.min.js" crossorigin="anonymous" integrity="sha256-T5QdmsCQO5z8tBAXMrCZ4f3RX8wVdiA0Fu17FGnU1vU=" ></script>
		<script src="https://pagecdn.io/lib/ace/1.4.12/theme-monokai.min.js" crossorigin="anonymous"  ></script>
		<script src="https://pagecdn.io/lib/ace/1.4.12/mode-python.min.js" crossorigin="anonymous"  ></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/mode-java.min.js" integrity="sha512-cBlD1MiRruu3tqWXrtxq3TrDDGF5NWpUQftHE6kS412z04C/nfl6DPMAJi2UJ70+X3eaCjiUdw7m1SaWPytZ2g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/mode-c_cpp.min.js" integrity="sha512-0OZmNbvdTUAXjS/gE+K7ytccKZGonVz82m6zzAZ5kbByRTC0WlO2BL3BjSvpzn4mCnpr3gFSRmqUVPrzJLVEwg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

        <title>Cat Coding</title>
    </head>

    <script>
        $(() => {
            var editor = ace.edit("editor");
            editor.setTheme("ace/theme/monokai");
            // editor.session.setMode("ace/mode/java");
			editor.session.setMode("ace/mode/c_cpp");
			// editor.session.setMode("ace/mode/python");

			const vscode = acquireVsCodeApi();
			

			$(".jSubmit").on("click", function(){
				const code = editor.getValue()
				console.log(code)
				vscode.postMessage({
					command: 'alert',
					text: code
				})
			})

			
        })
        
    </script>
	<style type="text/css" media="screen">
    	#editor { 
			position: relative;
			width: 100%;
    		height: 400px;
		}
	</style>
    
    <body>
        <ul class="list-group">
            <li class="list-group-item">
                <h3>titletitletitletitletitletitletitle</h3>
                <div id="editor">
#include <stdio.h>

int main() {
    printf(":::::::::::\n");
    return 0;
}

				</div>
				<button class="btn btn-primary jSubmit">Submit</button>
            </li>
            <li class="list-group-item">A second item</li>
            <li class="list-group-item">A third item</li>
            <li class="list-group-item">A fourth item</li>
            <li class="list-group-item">And a fifth one</li>
        </ul>
        <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
    </body>
</html>				
	`)
}

// this method is called when your extension is deactivated
export function deactivate() {}
